import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { checkoutSchema, type CheckoutData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Get parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const price = parseFloat(urlParams.get("price") || "0");
  const numbers = parseInt(urlParams.get("numbers") || "0");

  const form = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      donorCpf: "",
      amount: price.toFixed(2),
      numberOfTickets: numbers,
    },
  });

  const createDonationMutation = useMutation({
    mutationFn: async (data: CheckoutData) => {
      const response = await apiRequest("POST", "/api/donations", data);
      return await response.json();
    },
    onSuccess: (data: { id: string }) => {
      // Redirecionar para página de pagamento PIX
      navigate(`/payment/${data.id}`);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro ao processar",
        description: error instanceof Error ? error.message : "Tente novamente",
      });
      setIsLoading(false);
    },
  });

  const onSubmit = async (data: CheckoutData) => {
    setIsLoading(true);
    createDonationMutation.mutate(data);
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
    return value;
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <img 
            src="https://curaparadudu.com/wp-content/uploads/2025/09/Logo-4.png" 
            alt="Rifa Oficial Logo" 
            className="h-12"
            data-testid="img-logo-checkout"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Finalizar Contribuição
              </h1>
              
              {/* Resumo da Compra */}
              <div className="bg-white border-2 border-[#056ADF] rounded-2xl overflow-hidden shadow-xl mb-6">
                {/* Header do Card */}
                <div className="bg-gradient-to-r from-[#056ADF] to-[#0052b8] text-white px-6 py-4">
                  <p className="text-sm font-semibold uppercase tracking-wide">Resumo da sua contribuição</p>
                </div>
                
                {/* Valor e Números */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="flex items-baseline justify-center gap-3 mb-2">
                    <span className="text-5xl">🎫</span>
                    <div className="text-center">
                      <p className="text-5xl font-black text-[#056ADF]">
                        R$ {price.toFixed(2)}
                      </p>
                      <p className="text-lg text-gray-600 font-semibold mt-1">
                        {numbers} {numbers === 1 ? "número da rifa" : "números da rifa"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Prêmios */}
                <div className="px-6 pb-6">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-5">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-2xl">🎁</span>
                      <h3 className="text-xl font-bold text-gray-800">
                        Você concorre a:
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                        <span className="text-2xl">🚗</span>
                        <p className="text-base font-semibold text-gray-800">
                          Chevrolet Onix 0km <span className="text-[#056ADF]">(R$ 90.000)</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                        <span className="text-2xl">💰</span>
                        <p className="text-base font-semibold text-gray-800">
                          PIX de <span className="text-[#00D12D]">R$ 15.000</span> em dinheiro
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                        <span className="text-2xl">🏆</span>
                        <p className="text-base font-semibold text-gray-800">
                          E muito mais prêmios surpresa!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mensagem Final */}
                <div className="bg-[#00D12D] text-white px-6 py-4 text-center">
                  <p className="text-lg font-bold">
                    ❤️ Ajude o Dudu e concorra aos prêmios!
                  </p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Preencha seus dados
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="donorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Nome Completo *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Digite seu nome completo"
                            className="h-12 text-base"
                            data-testid="input-donor-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="donorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Email *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="seu@email.com"
                            className="h-12 text-base"
                            data-testid="input-donor-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="donorPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Telefone/WhatsApp *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="(11) 99999-9999"
                            className="h-12 text-base"
                            onChange={(e) => {
                              const formatted = formatPhone(e.target.value);
                              field.onChange(formatted);
                            }}
                            data-testid="input-donor-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="donorCpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">CPF *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="000.000.000-00"
                            className="h-12 text-base"
                            onChange={(e) => {
                              const formatted = formatCPF(e.target.value);
                              field.onChange(formatted);
                            }}
                            data-testid="input-donor-cpf"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 my-6">
                    <p className="text-sm text-gray-700 text-center">
                      🔒 <strong>Seus dados estão seguros.</strong> Usamos criptografia para proteger todas as informações.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full btn-green text-xl py-7 font-bold"
                      disabled={isLoading}
                      data-testid="button-submit-checkout"
                    >
                      {isLoading ? "Processando..." : "🚀 Gerar PIX e Continuar"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate("/#pay")}
                className="text-[#056ADF] hover:underline text-lg font-medium"
                data-testid="button-back-to-options"
              >
                ← Voltar para opções de contribuição
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">Políticas de Privacidade</p>
        </div>
      </footer>
    </div>
  );
}
