import { FakeLoadingBar } from "@/components/fake-loading-bar";
import { VideoPlayer } from "@/components/video-player";
import { ProgressBar } from "@/components/progress-bar";
import { PricingCards } from "@/components/pricing-cards";

export default function Home() {
  const scrollToPayment = () => {
    const paySection = document.getElementById('pay');
    if (paySection) {
      paySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-background text-foreground">
      <FakeLoadingBar />
      
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <img 
            src="https://rifeioficial.com/wp-content/uploads/2025/09/Logo-4.png" 
            alt="Rifa Oficial Logo" 
            className="h-12"
            data-testid="img-logo"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-black relative">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-white text-2xl md:text-4xl font-bold mb-4" data-testid="text-hero-title">
              TEMOS MENOS DE 1 MÊS
            </h1>
          </div>
          <VideoPlayer />
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-white">
        
        {/* Urgent Message Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl artegra-font leading-tight mb-6" data-testid="text-urgent-title">
                <span className="text-black"><span style={{color: '#056ADF'}}>ACONTECEU UM IMPREVISTO!</span> E AGORA O DUDU TEM MENOS DE 30 DIAS PARA CONSEGUIR BATER A NOVA META.</span>
                <br />
                <span className="text-[#056ADF]">GANHE AGORA UM ONIX OU 100 MIL E AINDA AJUDE A SALVAR A VIDA DE DUDU.</span>
              </h2>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                O Dudu conseguiu o dinheiro do remédio, <strong>porém foi avisado</strong> de última hora que vai precisar arcar com os custos hospitalares, que custam por volta de 6 milhões. <strong>Temos até o dia 20 de outubro para conseguirmos esses valores.</strong>
              </p>
            </div>

            <img 
              src="https://rifeioficial.com/wp-content/uploads/2025/09/Ft-1.png" 
              alt="Foto do Dudu" 
              className="mx-auto rounded-xl shadow-lg max-w-md w-full"
              data-testid="img-dudu-photo"
            />
            
            <div className="mt-8">
              <button 
                onClick={scrollToPayment}
                className="inline-block btn-green px-8 py-4 rounded-lg text-xl font-bold transition-all"
                data-testid="button-save-dudu-hero"
              >
                POR FAVOR SALVE O DUDU!
              </button>
            </div>
          </div>
        </section>

        {/* Campaign Description */}
        <section className="py-12 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="md:text-4xl font-bold text-gray-800 mb-6 text-[26px]">
                💛 Rifa Solidária: Com <span className="text-[#000000] font-extrabold">apenas R$1,00 (UM REAL)</span> você pode salvar o Dudu e ainda concorrer a <span className="text-secondary">um Onix 0KM</span> ou <span className="text-secondary">R$ 100.000,00</span> 💛
              </h2>
              
              <div className="bg-red-100 border border-red-300 rounded-lg p-6 mb-8">
                <p className="text-lg font-bold text-red-700">
                  🚨 Essa é a nossa última chance de <strong>CURAR O DUDU</strong> e você ainda pode ganhar um Ônix 0KM ou 100 mil reais no Pix. 🚨
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 text-lg leading-relaxed">
                <p>💙 Pra quem ainda não nos conhece, o Dudu tem 3 anos e luta contra a SPG50, uma doença rara, genética e degenerativa, que tira um pouquinho da sua vida todos os dias, podendo tirar todos os movimentos do seu corpo aos 10 anos de idade o levando a morte.</p>
                
                <p>🇧🇷 Há alguns meses, o Brasil se uniu e nos ajudou a arrecadar os 18 milhões de reais que precisávamos para comprar o único remédio no mundo que pode salvá-lo.</p>
                
                <p>😭 Mas agora, quando pensamos que toda essa turbulência tinha acabado, nos disseram que precisaremos custear os gastos hospitalares também, o que custa aproximadamente 6 milhões de reais, e o pior: só temos até o dia 20 de outubro deste ano para arrecadar esse valor.</p>
                
                <p>🙌🏼 Ouvindo às nossas orações, Deus nos mandou um anjo, que nos doou o carro para fazermos mais uma ação e salvarmos o Dudu.</p>
                
                <p className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 font-bold text-lg">
                  🚨 E agora contamos com você. Você pode salvar a vida do nosso filho concorrendo a UM ÔNIX 0KM OU 100 MIL REAIS NO PIX. 🚨
                </p>
                
                <p>Cada bilhete da rifa custa apenas 10 reais. Compre o máximo de bilhetes que conseguir e, por favor, não solte a mão do Dudu. 🙏🏼</p>
              </div>

              <div className="text-center mt-8">
                <button 
                  onClick={scrollToPayment}
                  className="inline-block btn-green px-8 py-4 rounded-lg text-xl font-bold transition-all"
                  data-testid="button-save-dudu-description"
                >
                  POR FAVOR SALVE O DUDU!
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ProgressBar />

              {/* Urgency Messages */}
              <div className="space-y-8 mb-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-bold text-red-700 mb-4">Nosso prazo é curto!</h3>
                  <p className="text-lg text-gray-700">
                    <strong>Se ela não conseguir o valor total para o tratamento até o dia 20 de outubro,</strong> infelizmente, o futuro do Dudu estará comprometido. Com a sua ajuda, ele pode ainda ter esperança de crescer e viver como uma criança normal.
                  </p>
                </div>

                <div className="text-center">
                  <button 
                    onClick={scrollToPayment}
                    className="inline-block btn-green px-8 py-4 rounded-lg text-xl font-bold transition-all"
                    data-testid="button-save-dudu-urgency"
                  >
                    POR FAVOR SALVE O DUDU!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingCards />

        {/* Additional sections continue with exact content from original */}
        
        {/* Media Coverage */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                O caso do Dudu já se tornou assunto no Brasil inteiro.
              </h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="https://rifeioficial.com/wp-content/uploads/2025/09/Ft-2.png" 
                  alt="Cobertura da mídia" 
                  className="w-full h-48 object-cover"
                  data-testid="img-media-coverage-1"
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="https://rifeioficial.com/wp-content/uploads/2025/09/08-img-1.jpg" 
                  alt="Cobertura da mídia" 
                  className="w-full h-48 object-cover"
                  data-testid="img-media-coverage-2"
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="https://rifeioficial.com/wp-content/uploads/2025/09/05-img-1.jpg" 
                  alt="Cobertura da mídia" 
                  className="w-full h-48 object-cover"
                  data-testid="img-media-coverage-3"
                />
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="https://rifeioficial.com/wp-content/uploads/2025/09/04-img-1.jpg" 
                  alt="Cobertura da mídia" 
                  className="w-full h-48 object-cover"
                  data-testid="img-media-coverage-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Personal Message */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 italic mb-8">
                "Eu só queria poder viver uma vida normal ao lado da minha família. Poder falar, andar e brincar. Crescer e me desenvolver. Ir para a escola e aproveitar a minha infância sem estar numa cadeira de rodas ou acamado."
              </blockquote>
              
              <div className="text-center">
                <button 
                  onClick={scrollToPayment}
                  className="inline-block btn-green px-8 py-4 rounded-lg text-xl font-bold transition-all"
                  data-testid="button-help-helena"
                >
                  POR FAVOR AJUDE A HELENA!
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                Site 100% seguro e verificado!
              </h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center mb-6">
                  <i className="fas fa-shield-alt text-accent text-6xl"></i>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">🔒 Transparência e Segurança em Primeiro Lugar</h3>
                
                <div className="space-y-4 text-lg text-gray-700 mb-8">
                  <p>Sabemos que algumas plataformas podem exibir avisos automáticos de segurança em transações online. Queremos tranquilizar você: esta rifa é 100% oficial, legítima e faz parte da campanha solidária Cura para Dudu.</p>
                  
                  <p>📌 O valor arrecadado é destinado integralmente ao tratamento do Dudu, e contamos com a colaboração de todos para alcançar essa meta tão importante.</p>
                  
                  <p className="font-bold">O sorteio será realizado pela Loteria Federal, garantindo assim 100% de transparência com o resultado.</p>
                </div>

                <button 
                  onClick={scrollToPayment}
                  className="inline-block btn-green px-8 py-4 rounded-lg text-xl font-bold transition-all"
                  data-testid="button-save-dudu-trust"
                >
                  POR FAVOR SALVE O DUDU!
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
                Ainda tem alguma dúvida?
              </h2>
              
              <div className="space-y-6">
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">O meu pagamento é seguro?</h3>
                  <p className="text-gray-700">Sim, seu pagamento é feito diretamente na Rifa do Dudu.</p>
                </div>
                
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Quando será realizado o sorteio?</h3>
                  <p className="text-gray-700">O sorteio será realizado em 20/10/2025 ou até que todos os bilhetes sejam vendidos.</p>
                </div>
                
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Como será utilizado o dinheiro arrecadado?</h3>
                  <p className="text-gray-700">Todo o valor arrecadado será para o tratamento do Dudu. O tratamento demora e o valor será usado para a medicação, despesas hospitalares, hospedagens e deslocamentos.</p>
                </div>
              </div>

              <div className="text-center mt-12">
                <button 
                  onClick={scrollToPayment}
                  className="inline-block btn-green px-8 py-4 rounded-lg text-xl font-bold transition-all"
                  data-testid="button-help-helena-faq"
                >
                  POR FAVOR AJUDE A HELENA!
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">Políticas de Privacidade</p>
        </div>
      </footer>
    </div>
  );
}
