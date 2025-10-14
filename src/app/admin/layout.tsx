import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Box,
  ShoppingBag,
  Users,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// In a real app, you'd use usePathname to determine the active link
// For this example, we'll hardcode the dashboard as active.
// const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
//   const pathname = usePathname();
//   const isActive = pathname === href;
//   return <SidebarMenuButton asChild isActive={isActive}><Link href={href}>{children}</Link></SidebarMenuButton>;
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <Logo />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="/admin">
                      <LayoutDashboard />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/products">
                      <Box />
                      Products
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/orders">
                      <ShoppingBag />
                      Orders
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/customers">
                      <Users />
                      Customers
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/">
                      <LogOut />
                      Back to site
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-6 sticky top-0 z-40">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1">
                <h1 className="font-headline text-2xl">Dashboard</h1>
              </div>
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </header>
            <main className="flex-1 p-4 sm:p-6 bg-muted/40">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
