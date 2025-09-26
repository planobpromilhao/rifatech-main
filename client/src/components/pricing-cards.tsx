interface PricingOption {
  price: number;
  numbers: number;
  pricePerNumber: number;
  isPopular?: boolean;
  link: string;
}

export function PricingCards() {
  const pricingOptions: PricingOption[] = [
    {
      price: 30,
      numbers: 3,
      pricePerNumber: 10.00,
      link: "https://checkout.rifeioficial.com/meABG9znD4g6Ea2?sub1=68d6ebc661c87&utm_source=organic"
    },
    {
      price: 38,
      numbers: 4,
      pricePerNumber: 9.50,
      link: "https://checkout.rifeioficial.com/NDr8gmkndJZBmjd?sub1=68d6ebc661c87&utm_source=organic"
    },
    {
      price: 45,
      numbers: 5,
      pricePerNumber: 9.00,
      link: "https://checkout.rifeioficial.com/65XDZBVJQeZVJwL?sub1=68d6ebc661c87&utm_source=organic"
    },
    {
      price: 75,
      numbers: 10,
      pricePerNumber: 7.50,
      isPopular: true,
      link: "https://checkout.rifeioficial.com/n1NLgwjMxOGMxE7?sub1=68d6ebc661c87&utm_source=organic"
    },
    {
      price: 100,
      numbers: 20,
      pricePerNumber: 5.00,
      link: "https://checkout.rifeioficial.com/N1nVZplboWZlM6B?sub1=68d6ebc661c87&utm_source=organic"
    }
  ];

  const additionalOptions: PricingOption[] = [
    {
      price: 135,
      numbers: 30,
      pricePerNumber: 4.50,
      link: "https://checkout.rifeioficial.com/kYL6gej4Xp3rKM0?sub1=68d6ebc661c87&utm_source=organic"
    },
    {
      price: 200,
      numbers: 50,
      pricePerNumber: 4.00,
      link: "https://checkout.rifeioficial.com/xQBPZv59XL3mVqy?sub1=68d6ebc661c87&utm_source=organic"
    },
    {
      price: 300,
      numbers: 100,
      pricePerNumber: 3.00,
      link: "https://checkout.rifeioficial.com/DPXw3XMENMZzmpq?sub1=68d6ebc661c87&utm_source=organic"
    },
    {
      price: 500,
      numbers: 250,
      pricePerNumber: 2.00,
      link: "https://checkout.rifeioficial.com/eApQgz1MzVGEb76?sub1=68d6ebc661c87&utm_source=organic"
    },
    {
      price: 1000,
      numbers: 1000,
      pricePerNumber: 1.00,
      link: "https://checkout.rifeioficial.com/mwK436O1l4ZQ8bx?sub1=68d6ebc661c87&utm_source=organic"
    }
  ];

  const PricingCard = ({ option, isLarge = false }: { option: PricingOption, isLarge?: boolean }) => {
    const cardClasses = option.isPopular 
      ? "bg-white rounded-xl shadow-xl p-6 text-center border-4 border-secondary relative transform scale-105"
      : option.price === 1000
      ? "bg-white rounded-xl shadow-lg p-6 text-center border-2 border-accent hover:border-accent transition-all"
      : "bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent hover:border-primary transition-all";

    const buttonClasses = "block btn-green px-4 py-3 rounded-lg font-bold transition-all";

    return (
      <div className={cardClasses}>
        {option.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold">
            MAIS VENDIDO!
          </div>
        )}
        <div className={`${isLarge ? 'text-2xl' : 'text-3xl'} font-bold ${option.price === 1000 ? 'text-accent' : 'text-primary'} mb-2`}>
          R$ {option.price}
        </div>
        <div className={`${isLarge ? 'text-lg' : 'text-lg'} font-semibold mb-2`}>
          {option.numbers} números
        </div>
        <div className={`${isLarge ? 'text-sm' : 'text-sm'} text-gray-600 mb-4`}>
          R$ {option.pricePerNumber.toFixed(2)} por número
        </div>
        <a 
          href={option.link}
          className={isLarge ? buttonClasses.replace('py-3', 'py-2').replace('text-xl', 'text-sm') : buttonClasses}
          data-testid={`button-purchase-${option.price}`}
        >
          Ajudar agora
        </a>
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

        {/* Main pricing options */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {pricingOptions.map((option) => (
            <PricingCard key={option.price} option={option} />
          ))}
        </div>

        {/* Additional pricing tiers */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {additionalOptions.map((option) => (
            <PricingCard key={option.price} option={option} isLarge />
          ))}
        </div>
      </div>
    </section>
  );
}
