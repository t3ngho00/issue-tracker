"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import ModeToggle from "@/components/mode-toggle";
const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currentPath = usePathname();
  return (
    <nav className="flex items-center justify-between border-b px-5 h-14">
      <div className="flex items-center space-x-6">
        <Bug className="h-6 w-6" />
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
      </div>
      <ModeToggle />
    </nav>
  );
};

export default NavBar;
