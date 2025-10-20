"use client";

import { useState, useMemo, use } from 'react';
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Star } from 'lucide-react';

export default function CategoryPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise);
  const category = categories.find(c => c.slug === params.slug);
  const categoryProducts = useMemo(() => products.filter(p => params.slug === 'all' || p.category === params.slug), [params.slug]);

  const allBrands = useMemo(() => Array.from(new Set(categoryProducts.map(p => p.brand))), [categoryProducts]);
  const maxPrice = useMemo(() => Math.max(...categoryProducts.map(p => p.price), 100), [categoryProducts]);

  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      const isInPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const isBrandSelected = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const hasSelectedRating = product.rating >= selectedRating;
      return isInPriceRange && isBrandSelected && hasSelectedRating;
    });
  }, [categoryProducts, priceRange, selectedBrands, selectedRating]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl">{category?.name || "All Products"}</h1>
        <p className="text-muted-foreground mt-2">Browse our curated collection.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price Filter */}
              <div>
                <Label className="font-semibold">Price Range</Label>
                <div className="mt-2">
                  <Slider
                    min={0}
                    max={maxPrice}
                    step={10}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value)}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <Label className="font-semibold">Brands</Label>
                <div className="mt-2 space-y-2">
                  {allBrands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={brand} onCheckedChange={() => handleBrandChange(brand)} />
                      <Label htmlFor={brand}>{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <Label className="font-semibold">Rating</Label>
                <RadioGroup onValueChange={(value) => setSelectedRating(parseInt(value))} className="mt-2">
                  {[4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center space-x-2">
                       <RadioGroupItem value={rating.toString()} id={`r${rating}`} />
                      <Label htmlFor={`r${rating}`} className="flex items-center">
                        {Array(5).fill(0).map((_, i) => (
                           <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`} />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">& up</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
               <div className="sm:col-span-2 xl:col-span-3 text-center py-16">
                 <h3 className="text-xl font-semibold">No products found</h3>
                 <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
               </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
