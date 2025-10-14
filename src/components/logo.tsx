import { cn } from "@/lib/utils";
import { Diamond } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Diamond className="h-6 w-6 text-primary" />
      <span className="font-headline text-xl font-bold tracking-tight">
        Premiere
      </span>
    </div>
  );
}
