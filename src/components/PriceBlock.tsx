import { Card, CardContent } from "./ui/card";
import { DollarSign } from "lucide-react";

interface PriceBlockProps {
  priceFrom?: number;
  priceNote?: string;
  className?: string;
}

/**
 * Компонент для отображения блока "Цена" на странице услуги
 * Если цена не указана - показывается "по запросу"
 */
const PriceBlock = ({ priceFrom, priceNote, className = "" }: PriceBlockProps) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('ru-RU');
  };

  return (
    <div className={className}>
      <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
        Цена
      </h2>
      
      <Card className="border-[#C9A227]/20 bg-gradient-to-br from-background to-muted/20">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-[#C9A227]/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-[#C9A227]" />
            </div>
            <div className="flex-1">
              {priceFrom ? (
                <>
                  <div className="text-3xl font-bold mb-2">
                    от {formatPrice(priceFrom)} ₽
                  </div>
                  {priceNote && (
                    <p className="text-sm text-muted-foreground">
                      {priceNote}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold mb-2">
                    По договоренности
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Стоимость определяется индивидуально после анализа вашей ситуации
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceBlock;
