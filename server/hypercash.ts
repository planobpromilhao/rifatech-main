interface HyperCashPixCharge {
  value: number;
  correlationID: string;
  comment?: string;
}

interface HyperCashPixResponse {
  status: string;
  brcode: string;
  qrcode: string;
  transactionId: string;
  expiresAt: string;
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

  async createPixCharge(amount: number, donationId: string, donorName: string): Promise<HyperCashPixResponse> {
    if (!this.apiKey) {
      throw new Error("HyperCash API key not configured");
    }

    const charge: HyperCashPixCharge = {
      value: amount,
      correlationID: donationId,
      comment: `Doação para Dudu - ${donorName}`,
    };

    try {
      const response = await fetch(`${this.baseUrl}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(charge),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HyperCash API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
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
          "Authorization": `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HyperCash API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        status: data.status,
        paid: data.status === "approved" || data.status === "paid",
      };
    } catch (error) {
      console.error("Error checking payment status:", error);
      throw error;
    }
  }
}

export const hyperCashService = new HyperCashService();
