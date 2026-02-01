"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import ModeToggle from "@/components/mode-toggle";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between border-b px-5 h-14 max-w-7xl mx-auto">
      <div className="flex items-center space-x-6">
        <Bug className="h-6 w-6" />
        <NavLinks />
      </div>
      <div className="flex items-center space-x-3">
        <AuthStatus />
        <ModeToggle />
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              link.href === currentPath
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Button>
        <Link href={"/api/auth/signin"}>Sign in</Link>
      </Button>
    );

  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                src={session!.user?.image || ""}
                alt={session!.user?.name || "User"}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                {session!.user?.name?.charAt(0) ||
                  session!.user?.email?.charAt(0) ||
                  "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="px-2 py-1.5 text-sm font-medium">
            {session!.user?.email}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default NavBar;
