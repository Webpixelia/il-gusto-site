import Image from "next/image"

// Interface pour définir les props acceptées par le composant
interface DeliveryButtonsProps {
  uberEatsStyle?: {
    bg?: string;
    textColor?: string;
    borderColor?: string;
    hoverBg?: string;
  };
}

export default function DeliveryButtons({ 
  uberEatsStyle = {
    bg: "bg-black", 
    textColor: "text-white", 
    borderColor: "", 
    hoverBg: "hover:bg-gray-800"
  }
}: DeliveryButtonsProps) {
  
  // Construction de la classe pour le bouton UberEats
  const uberEatsButtonClass = `btn-delivery w-full ${uberEatsStyle.bg} ${uberEatsStyle.textColor} ${uberEatsStyle.borderColor} ${uberEatsStyle.hoverBg} focus:outline-none`;
  
  return (
    <div className="flex flex-col gap-4 w-full">
      <a
        href="https://www.ubereats.com"
        target="_blank"
        rel="noopener noreferrer"
        className={uberEatsButtonClass}
      >
        <Image
          src="/images/ubereats-logo.svg?height=24&width=24&text=UE"
          alt="Uber Eats"
          width={24}
          height={24}
          className="mr-2"
        />
        Uber Eats
      </a>
      <a
        href="https://www.deliveroo.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-delivery w-full bg-[#00ccbc] text-white hover:bg-[#00b3a4] focus:outline-none"
      >
        <Image
          src="/images/deliveroo-logo.svg?height=24&width=24&text=D"
          alt="Deliveroo"
          width={24}
          height={24}
          className="mr-2"
        />
        Deliveroo
      </a>
    </div>
  );
}