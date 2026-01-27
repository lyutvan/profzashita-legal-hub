import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { PricingPackage } from "@/data/services";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

interface PricingBlockProps {
  packages: PricingPackage[];
}

const PricingBlock = ({ packages }: PricingBlockProps) => {
  const { openQuickQuestionModal } = useQuickQuestionModal();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <Card 
            key={index}
            className={`relative ${index === 1 ? 'border-accent shadow-lg' : ''}`}
          >
            {index === 1 && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-small font-medium">
                Популярный
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-serif">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
              <div className="pt-4">
                <div className="text-h2-mobile md:text-h2 font-bold text-accent">
                  от {pkg.priceFrom.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-4">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-small">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                  onClick={() => openQuickQuestionModal({ topic: pkg.name })}
                >
                  Получить смету
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted/50 rounded-xl p-6 text-small text-muted-foreground">
        <p className="leading-relaxed">
          <strong>Обратите внимание:</strong> Окончательная стоимость зависит от сложности и объёма работы. 
          Мы рассчитаем точную смету после изучения документов и обсуждения деталей вашей ситуации. 
          Первичная консультация поможет определить объем необходимых услуг.
        </p>
      </div>
    </div>
  );
};

export default PricingBlock;
