import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Donation } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [, params] = useRoute("/payment/:id");
  const [, navigate] = useLocation();
  const [timeRemaining, setTimeRemaining] = useState("");

  const { data: donation, isLoading } = useQuery<Donation>({
    queryKey: ["/api/donations", params?.id],
    enabled: !!params?.id,
    refetchInterval: 5000, // Poll every 5 seconds for payment status
  });

  useEffect(() => {
    if (!donation?.pixExpiresAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expires = new Date(donation.pixExpiresAt!).getTime();
      const diff = expires - now;

      if (diff <= 0) {
        setTimeRemaining("Expirado");
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [donation?.pixExpiresAt]);

  useEffect(() => {
    if (donation?.paymentStatus === "approved") {
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [donation?.paymentStatus, navigate]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Código PIX copiado!");
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Doação não encontrada</h1>
          <Button onClick={() => navigate("/")} className="btn-green">
            Voltar para início
          </Button>
        </div>
      </div>
    );
  }

  if (donation.paymentStatus === "approved") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Pagamento Confirmado! 🎉
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Obrigado por ajudar o Dudu! Seu pagamento foi confirmado com sucesso.
            </p>
            <p className="text-lg text-gray-600">
              Você receberá um email com os detalhes da sua contribuição e os números da rifa.
            </p>
          </div>
          <Button onClick={() => navigate("/")} className="btn-green text-xl px-8 py-6">
            Voltar para início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pagamento via PIX
            </h1>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
              <p className="font-bold text-yellow-800">
                ⏱️ Tempo restante: {timeRemaining}
              </p>
            </div>
          </div>

          {/* PIX QR Code */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Escaneie o QR Code
              </h2>
              <p className="text-gray-600">
                Use o aplicativo do seu banco para escanear
              </p>
            </div>

            {donation.pixQrCode && (
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <img
                    src={donation.pixQrCode}
                    alt="QR Code PIX"
                    className="w-64 h-64"
                    data-testid="img-pix-qrcode"
                  />
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Ou copie o código PIX
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-mono break-all text-gray-700" data-testid="text-pix-code">
                  {donation.pixCopyPaste}
                </p>
              </div>
              <Button
                onClick={() => copyToClipboard(donation.pixCopyPaste || "")}
                className="w-full btn-green"
                data-testid="button-copy-pix"
              >
                Copiar Código PIX
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-blue-800 mb-2">ℹ️ Informações importantes:</h3>
            <ul className="text-blue-700 space-y-2">
              <li>• O pagamento é confirmado em até 2 minutos</li>
              <li>• Após a confirmação, você receberá um email com seus números da rifa</li>
              <li>• Esta página atualiza automaticamente quando o pagamento for confirmado</li>
            </ul>
          </div>

          {/* Donation Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Detalhes da Contribuição</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Valor:</span>
                <span className="font-bold text-primary" data-testid="text-amount">
                  R$ {parseFloat(donation.amount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Números da rifa:</span>
                <span className="font-bold" data-testid="text-numbers">
                  {donation.numberOfTickets}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nome:</span>
                <span className="font-semibold" data-testid="text-donor-name">
                  {donation.donorName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold" data-testid="text-status">
                  {donation.paymentStatus === "pending" ? "Aguardando pagamento" : donation.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
