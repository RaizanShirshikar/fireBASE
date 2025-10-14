import { getPersonalizedRecommendations } from "@/ai/flows/personalized-product-recommendations";
import { products } from "@/lib/data";
import { ProductCard } from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type RecommendationsProps = {
  viewHistory: string[];
  cartContents: string[];
};

export async function Recommendations({ viewHistory, cartContents }: RecommendationsProps) {
  if (viewHistory.length === 0 && cartContents.length === 0) {
    return null;
  }
  
  let recommendedProductIds: string[] = [];
  try {
    const result = await getPersonalizedRecommendations({
      viewHistory,
      cartContents,
    });
    recommendedProductIds = result.productRecommendations;
  } catch (error) {
    console.error("Error getting AI recommendations:", error);
    // Fallback to a generic list of featured products
    recommendedProductIds = products.filter(p => p.tags.includes('featured')).map(p => p.id).slice(0, 5);
  }

  const recommendedProducts = products.filter((product) =>
    recommendedProductIds.includes(product.id)
  );
  
  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-left">
          <h2 className="font-headline text-3xl md:text-4xl">
            You Might Also Like
          </h2>
          <p className="text-muted-foreground mt-2">
            Based on your activity
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendedProducts.map((product) => (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
