import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const footerLinks = {
  shop: [
    { title: "Women", href: "/category/womens-fashion" },
    { title: "Men", href: "/category/mens-fashion" },
    { title: "Accessories", href: "/category/accessories" },
    { title: "Footwear", href: "/category/footwear" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Press", href: "/press" },
  ],
  support: [
    { title: "Contact Us", href: "/contact" },
    { title: "FAQ", href: "/faq" },
    { title: "Shipping & Returns", href: "/shipping" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-4 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-muted-foreground">
              Discover curated fashion and accessories for the modern aesthetic.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold text-foreground">
                Subscribe to our newsletter
              </h4>
              <p className="text-sm text-muted-foreground">
                Get the latest updates and special offers.
              </p>
              <form className="mt-4 flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button type="submit" variant="secondary">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-4 lg:col-span-3">
            <div>
              <h4 className="font-semibold text-foreground">Shop</h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Support</h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PremiereCommerce. All rights
            reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
