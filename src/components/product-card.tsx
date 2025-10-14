"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasVariants = product.variants && product.variants.length > 0;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasVariants) {
      addToCart(product, 1);
    }
  };

  return (
    <Card className="group overflow-hidden relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block">
        <CardContent className="p-0">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              data-ai-hint={product.images[0]["data-ai-hint"]}
              width={600}
              height={800}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          <div className="p-4 border-t">
            {product.brand && (
              <p className="text-xs text-muted-foreground mb-1">
                {product.brand}
              </p>
            )}
            <h3 className="font-semibold text-base leading-tight truncate">
              {product.name}
            </h3>
            <p className="text-lg font-bold text-primary mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Link>
      {product.tags.includes("top-seller") && (
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-accent text-accent-foreground"
        >
          Top Seller
        </Badge>
      )}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          onClick={handleAddToCart}
          aria-label="Add to cart"
          disabled={hasVariants}
          title={hasVariants ? "Select options" : "Add to cart"}
          className="rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
