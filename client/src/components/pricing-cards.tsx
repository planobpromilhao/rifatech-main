import { useLocation } from "wouter";

interface PricingOption {
  price: number;
  numbers: number;
  pricePerNumber: number;
  isPopular?: boolean;
}

export function PricingCards() {
  const [, navigate] = useLocation();
  
  const pricingOptions: PricingOption[] = [
    {
      price: 30,
      numbers: 3,
      pricePerNumber: 10.00,
    },
    {
      price: 38,
      numbers: 4,
      pricePerNumber: 9.50,
    },
    {
      price: 45,
      numbers: 5,
      pricePerNumber: 9.00,
    },
    {
      price: 75,
      numbers: 10,
      pricePerNumber: 7.50,
      isPopular: true,
    },
    {
      price: 100,
      numbers: 20,
      pricePerNumber: 5.00,
    }
  ];

  const additionalOptions: PricingOption[] = [
    {
      price: 135,
      numbers: 30,
      pricePerNumber: 4.50,
    },
    {
      price: 200,
      numbers: 50,
      pricePerNumber: 4.00,
    },
    {
      price: 300,
      numbers: 100,
      pricePerNumber: 3.00,
    },
    {
      price: 500,
      numbers: 250,
      pricePerNumber: 2.00,
    },
    {
      price: 1000,
      numbers: 1000,
      pricePerNumber: 1.00,
    }
  ];

  const PricingCard = ({ option, isLarge = false }: { option: PricingOption, isLarge?: boolean }) => {
    const cardClasses = option.isPopular 
      ? "bg-white rounded-xl shadow-xl p-6 text-center border-4 border-secondary relative"
      : option.price === 1000
      ? "bg-white rounded-xl shadow-lg p-6 text-center border-2 border-accent hover:border-accent transition-all"
      : "bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent hover:border-primary transition-all";

    const buttonClasses = "block btn-green px-4 py-3 rounded-lg font-bold transition-all text-[15px]";

    return (
      <div className={`${cardClasses} flex flex-col`}>
        {option.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-0.5 rounded-full text-xs font-bold">
            MAIS VENDIDO!
          </div>
        )}
        <div className={`${isLarge ? 'text-2xl' : 'text-3xl'} font-bold ${option.price === 1000 ? 'text-accent' : 'text-primary'} mb-2`}>
          R$ {option.price}
        </div>
        <div className={`${isLarge ? 'text-lg' : 'text-lg'} font-semibold mb-2`}>
          {option.numbers} números
        </div>
        <div className={`${isLarge ? 'text-sm' : 'text-sm'} text-gray-600 mb-4 flex-grow`}>
          R$ {option.pricePerNumber.toFixed(2)} por número
        </div>
        <button 
          onClick={() => navigate(`/checkout?price=${option.price}&numbers=${option.numbers}`)}
          className={isLarge ? buttonClasses.replace('py-3', 'py-2').replace('text-xl', 'text-sm') : buttonClasses}
          data-testid={`button-purchase-${option.price}`}
        >
          Ajudar agora
        </button>
      </div>
    );
  };

  return (
    <section id="pay" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Com quantos números você deseja contribuir para <span className="text-primary">Salvar a Vida do Dudu</span>?
          </h2>
        </div>

        {/* Todas as opções em duas fileiras */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pricingOptions.map((option) => (
            <PricingCard key={option.price} option={option} />
          ))}
          {additionalOptions.map((option) => (
            <PricingCard key={option.price} option={option} />
          ))}
        </div>
      </div>
    </section>
  );
}
