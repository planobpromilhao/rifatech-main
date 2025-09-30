interface HyperCashCreateTransactionRequest {
  amount: number;
  currency?: string;
  paymentMethod: "PIX";
  customer: {
    name: string;
    email: string;
    phone?: string;
    document: {
      type: "CPF";
      number: string;
    };
  };
  items: Array<{
    title: string;
    unitPrice: number;
    quantity: number;
    tangible: boolean;
  }>;
  pix: {
    expiresInDays: number;
  };
  postbackUrl?: string;
  metadata?: string;
  ip?: string;
}

interface HyperCashPixResponse {
  data: {
    id: string;
    amount: number;
    status: string;
    pix: {
      qrcode: string | null;
      url: string | null;
      expirationDate: string | null;
    };
  };
}

export class HyperCashService {
  private apiKey: string;
  private baseUrl = "https://api.hypercashbrasil.com.br/api/user";

  constructor() {
    this.apiKey = process.env.HYPERCASH_API_KEY || "";
    
    if (!this.apiKey) {
      console.warn("⚠️ HYPERCASH_API_KEY not configured. PIX payments will not work.");
    }
  }

  private getAuthHeader(): string {
    const credentials = `x:${this.apiKey}`;
    return `Basic ${Buffer.from(credentials).toString("base64")}`;
  }

  async createPixCharge(
    amount: number, 
    donationId: string, 
    donorName: string,
    donorEmail: string,
    donorPhone: string,
    donorCpf: string
  ): Promise<HyperCashPixResponse> {
    if (!this.apiKey) {
      throw new Error("HyperCash API key not configured");
    }

    const amountInCents = Math.round(amount * 100);
    
    // Remove formatting from CPF and phone (keep only numbers)
    const cleanCpf = donorCpf.replace(/\D/g, '');
    const cleanPhone = donorPhone.replace(/\D/g, '');

    const payload: HyperCashCreateTransactionRequest = {
      amount: amountInCents,
      currency: "BRL",
      paymentMethod: "PIX",
      customer: {
        name: donorName,
        email: donorEmail,
        phone: cleanPhone,
        document: {
          type: "CPF",
          number: cleanCpf,
        },
      },
      items: [
        {
          title: "Doação para Dudu - Rifa Solidária",
          unitPrice: amountInCents,
          quantity: 1,
          tangible: false,
        },
      ],
      pix: {
        expiresInDays: 1,
      },
      metadata: JSON.stringify({ donationId }),
    };

    try {
      const response = await fetch(`${this.baseUrl}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.getAuthHeader(),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HyperCash API error: ${response.status} - ${errorData}`);
      }

      const data: HyperCashPixResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating PIX charge:", error);
      throw error;
    }
  }

  async checkPaymentStatus(transactionId: string): Promise<{ status: string; paid: boolean }> {
    if (!this.apiKey) {
      throw new Error("HyperCash API key not configured");
    }

    try {
      const response = await fetch(`${this.baseUrl}/transactions/${transactionId}`, {
        method: "GET",
        headers: {
          "Authorization": this.getAuthHeader(),
        },
      });

      if (!response.ok) {
        throw new Error(`HyperCash API error: ${response.status}`);
      }

      const data: HyperCashPixResponse = await response.json();
      return {
        status: data.data.status,
        paid: data.data.status === "PAID" || data.data.status === "paid",
      };
    } catch (error) {
      console.error("Error checking payment status:", error);
      throw error;
    }
  }
}

export const hyperCashService = new HyperCashService();
