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
    if (!donation) return;

    // Always start with 10 minutes (600 seconds)
    const startTime = new Date().getTime();
    const expiryTime = startTime + (10 * 60 * 1000); // 10 minutes

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = expiryTime - now;

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
  }, [donation]);

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
      <div className="bg-background text-foreground min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-center">
            <img 
              src="https://rifeioficial.com/wp-content/uploads/2025/09/Logo-4.png" 
              alt="Rifa Oficial Logo" 
              className="h-12"
              data-testid="img-logo-success"
            />
          </div>
        </header>

        <main className="flex items-center justify-center py-20 bg-white min-h-[80vh]">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 bg-[#00D12D] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Pagamento Confirmado! 🎉
              </h1>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <p className="text-xl text-gray-800 font-semibold mb-3">
                  Obrigado por ajudar o Dudu!
                </p>
                <p className="text-lg text-gray-700">
                  Seu pagamento foi confirmado com sucesso e você já está concorrendo ao prêmio.
                </p>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                ✉️ Você receberá um email com os detalhes da sua contribuição e os números da rifa.
              </p>
            </div>
            <Button onClick={() => navigate("/")} className="btn-green text-xl px-10 py-7 font-bold">
              Voltar para Início
            </Button>
          </div>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">Políticas de Privacidade</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <img 
            src="https://rifeioficial.com/wp-content/uploads/2025/09/Logo-4.png" 
            alt="Rifa Oficial Logo" 
            className="h-12"
            data-testid="img-logo-payment"
          />
        </div>
      </header>

      <main className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Finalize seu Pagamento PIX
              </h1>
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-5 mb-4">
                <p className="text-lg font-bold text-yellow-800">
                  ⏱️ Tempo restante para pagamento: <span className="text-2xl">{timeRemaining}</span>
                </p>
              </div>
              <p className="text-lg text-gray-700">
                📱 Escaneie o QR Code ou copie o código PIX para pagar
              </p>
            </div>

            {/* PIX QR Code */}
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 mb-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Escaneie o QR Code
                </h2>
                <p className="text-gray-600 text-base">
                  Abra o aplicativo do seu banco e escaneie o código abaixo
                </p>
              </div>

              {donation.pixQrCode && (
                <div className="flex justify-center mb-8">
                  <div className="bg-white p-5 rounded-2xl border-4 border-[#056ADF]/20 shadow-lg">
                    <img
                      src={donation.pixQrCode}
                      alt="QR Code PIX"
                      className="w-64 h-64"
                      data-testid="img-pix-qrcode"
                    />
                  </div>
                </div>
              )}

              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Ou copie o código PIX Copia e Cola
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border-2 border-gray-200">
                  <p className="text-sm font-mono break-all text-gray-700" data-testid="text-pix-code">
                    {donation.pixCopyPaste}
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard(donation.pixCopyPaste || "")}
                  className="w-full btn-green text-lg py-6 font-bold"
                  data-testid="button-copy-pix"
                >
                  📋 Copiar Código PIX
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">ℹ️ Informações importantes:</h3>
              <ul className="text-blue-700 space-y-2 text-base">
                <li>• O pagamento é confirmado em até 2 minutos</li>
                <li>• Após a confirmação, você receberá um email com seus números da rifa</li>
                <li>• Esta página atualiza automaticamente quando o pagamento for confirmado</li>
                <li>• Não feche esta página até a confirmação do pagamento</li>
              </ul>
            </div>

            {/* Donation Details */}
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-5 text-center">Detalhes da Contribuição</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Valor:</span>
                  <span className="font-bold text-[#056ADF] text-xl" data-testid="text-amount">
                    R$ {parseFloat(donation.amount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Números da rifa:</span>
                  <span className="font-bold text-lg" data-testid="text-numbers">
                    {donation.numberOfTickets}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Nome:</span>
                  <span className="font-semibold" data-testid="text-donor-name">
                    {donation.donorName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold" data-testid="text-status">
                    {donation.paymentStatus === "pending" ? "⏳ Aguardando pagamento" : donation.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/")}
                className="text-[#056ADF] hover:underline text-lg font-medium"
                data-testid="button-back-home"
              >
                ← Voltar para página inicial
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">Políticas de Privacidade</p>
        </div>
      </footer>
    </div>
  );
}
