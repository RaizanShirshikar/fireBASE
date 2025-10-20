"use client";

import { useState, use, useMemo } from 'react';
import Image from 'next/image';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Recommendations } from '@/components/recommendations';
import type { Variant } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function ProductPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise);
  const product = products.find(p => p.slug === params.slug);
  const { addToCart, cartItems } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(product?.variants?.[0]);
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    notFound();
  }

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants?.find(v => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
      setMainImage(variant.image);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };
  
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={mainImage?.src || product.images[0].src}
                alt={mainImage?.alt || product.images[0].alt}
                data-ai-hint={mainImage?.['data-ai-hint'] || product.images[0]['data-ai-hint']}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={cn(
                    "aspect-square w-full overflow-hidden rounded-md transition-all",
                    mainImage?.src === image.src ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-80"
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    data-ai-hint={image['data-ai-hint']}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="font-headline text-3xl md:text-4xl">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.brand}</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
            </div>

            <p className="font-headline text-3xl text-primary my-6">${displayPrice.toFixed(2)}</p>

            {/* Variant Selector */}
            {product.variants && (
              <div className="space-y-4 mb-6">
                <Label className="font-semibold text-lg">Size</Label>
                <RadioGroup 
                  defaultValue={selectedVariant?.id} 
                  onValueChange={handleVariantChange}
                  className="flex flex-wrap gap-2"
                >
                  {product.variants.map((variant) => (
                    <div key={variant.id}>
                      <RadioGroupItem value={variant.id} id={variant.id} className="sr-only" />
                      <Label
                        htmlFor={variant.id}
                        className={cn(
                          "cursor-pointer rounded-md border px-4 py-2 transition-colors",
                          selectedVariant?.id === variant.id ? "bg-primary text-primary-foreground border-primary" : "hover:bg-accent/10"
                        )}
                      >
                        {variant.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
               <Button size="lg" onClick={handleAddToCart} className="flex-1">
                 Add to Cart
               </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">{product.description}</p>
            
            {/* Accordion for Details */}
            <Accordion type="single" collapsible className="w-full mt-8">
              <AccordionItem value="item-1">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  Free standard shipping on orders over $50. Express shipping available. Returns are accepted within 30 days of purchase.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Materials & Care</AccordionTrigger>
                <AccordionContent>
                  Made from premium, sustainably sourced materials. Please check the garment label for specific care instructions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <Recommendations
        viewHistory={[product.id]}
        cartContents={cartItems.map(item => item.id)}
      />
    </>
  );
}
