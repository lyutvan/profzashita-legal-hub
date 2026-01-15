import { Card, CardContent } from "./ui/card";
import { DollarSign } from "lucide-react";

interface PriceBlockProps {
  priceFrom?: number;
  priceNote?: string;
  fallbackTitle?: string;
  fallbackNote?: string;
  className?: string;
}

/**
 * Компонент для отображения блока "Цена" на странице услуги
 * Если цена не указана - показывается fallback-значение
 */
const PriceBlock = ({
  priceFrom,
  priceNote,
  fallbackTitle = "По договоренности",
  fallbackNote = "Стоимость определяется индивидуально после анализа вашей ситуации",
  className = ""
}: PriceBlockProps) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('ru-RU');
  };

  return (
    <div className={className}>
      <h2 className="font-serif font-bold mb-6">
        Цена
      </h2>
      
      <Card className="border-accent/20 bg-gradient-to-br from-background to-muted/20">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-accent/10 rounded-xl">
              <DollarSign className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              {priceFrom ? (
                <>
                  <div className="text-h3 font-bold mb-2">
                    от {formatPrice(priceFrom)} ₽
                  </div>
                  {priceNote && (
                    <p className="text-small text-muted-foreground">
                      {priceNote}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="text-h3 font-bold mb-2">
                    {fallbackTitle}
                  </div>
                  <p className="text-small text-muted-foreground">
                    {fallbackNote}
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
