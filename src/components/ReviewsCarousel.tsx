import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type ReviewCarouselItem = {
  id?: string;
  name: string;
  date?: string;
  rating?: number;
  text: string;
};

type ReviewsCarouselProps = {
  reviews: ReviewCarouselItem[];
  ariaLabel?: string;
};

const ReviewsCarousel = ({ reviews, ariaLabel = "Отзывы клиентов" }: ReviewsCarouselProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isRepositioningRef = useRef(false);
  const shouldLoop = reviews.length > 1;
  const reviewCopies = shouldLoop ? [0, 1, 2] : [0];

  useEffect(() => {
    const scroller = scrollerRef.current;
    const middleCopyFirstCard = scroller?.querySelector<HTMLElement>('[data-review-copy="1"]');
    if (!scroller || !middleCopyFirstCard) return;

    const frameId = window.requestAnimationFrame(() => {
      scroller.scrollLeft = middleCopyFirstCard.offsetLeft;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [reviews.length]);

  const resetToCard = (card: HTMLElement) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    isRepositioningRef.current = true;
    scroller.scrollLeft = card.offsetLeft;
    window.requestAnimationFrame(() => {
      isRepositioningRef.current = false;
    });
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller || !shouldLoop || isRepositioningRef.current) return;

    const middleCards = Array.from(scroller.querySelectorAll<HTMLElement>('[data-review-copy="1"]'));
    const middleFirstCard = middleCards[0];
    const middleLastCard = middleCards[middleCards.length - 1];
    const previousCopyLastCard = middleFirstCard?.previousElementSibling as HTMLElement | null;
    const nextCopyFirstCard = middleLastCard?.nextElementSibling as HTMLElement | null;

    if (previousCopyLastCard && scroller.scrollLeft <= previousCopyLastCard.offsetLeft + 2) {
      resetToCard(middleLastCard);
    } else if (nextCopyFirstCard && scroller.scrollLeft >= nextCopyFirstCard.offsetLeft - 2) {
      resetToCard(middleFirstCard);
    }
  };

  const scrollReviews = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-review-card]"));
    const currentCardIndex = cards.reduce((closestIndex, card, index) => {
      const currentDistance = Math.abs(cards[closestIndex].offsetLeft - scroller.scrollLeft);
      const nextDistance = Math.abs(card.offsetLeft - scroller.scrollLeft);
      return nextDistance < currentDistance ? index : closestIndex;
    }, 0);
    const nextCard = cards[currentCardIndex + direction];
    if (!nextCard) return;

    scroller.scrollTo({
      left: nextCard.offsetLeft,
      behavior: "smooth"
    });
  };

  if (reviews.length === 0) return null;

  return (
    <div className="section__content" data-testid="reviews-carousel">
      <div className="relative px-14 sm:px-16">
        <div
          ref={scrollerRef}
          role="region"
          aria-label={ariaLabel}
          onScroll={handleScroll}
          className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviewCopies.flatMap((copyIndex) =>
            reviews.map((review, index) => (
              <Card
                key={`${copyIndex}-${review.id ?? `${review.name}-${index}`}`}
                data-review-card=""
                data-review-copy={copyIndex}
                aria-hidden={shouldLoop && copyIndex !== 1}
                className="flex min-h-[244px] w-[min(86vw,22rem)] shrink-0 snap-start rounded-[10px] border-[#d8bf72] bg-white shadow-[0_8px_20px_rgba(60,52,31,0.08)] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <CardContent className="flex h-full w-full flex-col p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-1 text-accent" aria-label={`Оценка: ${review.rating ?? 5} из 5`}>
                      {Array.from({ length: review.rating ?? 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    {review.date ? <span className="shrink-0 text-small text-muted-foreground">{review.date}</span> : null}
                  </div>
                  <p className="mt-4 text-small leading-relaxed text-muted-foreground">{review.text}</p>
                  <div className="mt-auto border-t border-[#e8ddbf] pt-4">
                    <span className="text-small font-semibold text-foreground">{review.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {shouldLoop ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="reviews-carousel__arrow absolute left-0 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border-[#d8bf72] bg-white text-primary shadow-[0_4px_14px_rgba(60,52,31,0.16)]"
              onClick={() => scrollReviews(-1)}
              aria-label="Предыдущие отзывы"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="reviews-carousel__arrow absolute right-0 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border-[#d8bf72] bg-white text-primary shadow-[0_4px_14px_rgba(60,52,31,0.16)]"
              onClick={() => scrollReviews(1)}
              aria-label="Следующие отзывы"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
