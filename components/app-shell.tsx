"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  Bookmark,
  Camera,
  CreditCard,
  LayoutDashboard,
  Menu,
  NotebookText,
  PiggyBank,
  Shapes,
  ShoppingCart,
  Wallet,
  X,
} from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
} from "@/components/ui/sidebar";
import { GridBackground } from "@/components/ui/grid";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

const navLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: <NotebookText className="h-5 w-5" />,
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
    icon: <CreditCard className="h-5 w-5" />,
  },
  { label: "EMIs", href: "/emis", icon: <Wallet className="h-5 w-5" /> },
  {
    label: "Savings",
    href: "/savings",
    icon: <PiggyBank className="h-5 w-5" />,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: <Shapes className="h-5 w-5" />,
  },
  {
    label: "Logs",
    href: "/payment-logs",
    icon: <Bookmark className="h-5 w-5" />,
  },
  {
    label: "Snapshots",
    href: "/snapshots",
    icon: <Camera className="h-5 w-5" />,
  },
  { label: "Archive", href: "/archive", icon: <Archive className="h-5 w-5" /> },
];

function Brand() {
  const { open } = useSidebar();

  return (
    <Link href="/" className="flex min-w-0 items-center gap-2 px-1 py-2">
      <Wallet className="h-5 w-5" />
      <span
        className={cn(
          "text-sm font-semibold text-foreground transition-opacity",
          open ? "opacity-100" : "hidden opacity-0"
        )}
      >
        Finance Tracker
      </span>
    </Link>
  );
}

function DesktopSidebarToggle() {
  const { open, setOpen } = useSidebar();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="hidden md:inline-flex shrink-0"
      onClick={() => setOpen((v) => !v)}
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
    >
      {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
}

function SidebarHeader() {
  const { open } = useSidebar();

  if (!open) {
    return (
      <div className="flex items-center justify-center py-2">
        <DesktopSidebarToggle />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <Brand />
      <DesktopSidebarToggle />
    </div>
  );
}

function SidebarFooter() {
  const { open } = useSidebar();

  return (
    <div className={cn("mt-auto pt-4", open ? "" : "flex justify-center")}>
      <ModeToggle />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <div className="flex h-screen w-full bg-background text-foreground">
          <SidebarBody className="border-r border-border">
            <SidebarHeader />

            <div className="mt-4 flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <SidebarLink
                    key={link.href}
                    link={link}
                    className={cn(
                      "rounded-md px-2 text-muted-foreground hover:text-foreground",
                      isActive && "bg-muted text-foreground"
                    )}
                  />
                );
              })}
            </div>

            <SidebarFooter />
          </SidebarBody>

          <div className="relative flex-1 overflow-auto">
            <GridBackground className="opacity-60" />
            <main className="relative mx-auto max-w-6xl px-6 py-6">
              {children}
            </main>
          </div>
        </div>
      </Sidebar>

      <Toaster />
    </>
  );
}
