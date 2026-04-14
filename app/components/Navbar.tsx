"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "../utils/cn";
import { usePathname } from "next/navigation";
import React from "react";
import { resume } from "@/blog.config";
import { useTheme } from "./ThemeProvider";

const navItems: Record<string, { name: string }> = {
  "/": { name: "blog" },
  "/projects": { name: "projects" },
  "/about": { name: "about" },
  [resume.link]: { name: "resume" },
};

interface NavItemProps {
  path: string;
  name: string;
  pathname: string;
}

const NavItem = ({ path, name, pathname }: NavItemProps) => {
  const isResume = path === resume.link;

  if (isResume) {
    return (
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        key={path}
        aria-label="View resume"
      >
        <span
          className={cn(
            "text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200",
            pathname === path ? "text-[var(--fg)]" : ""
          )}
        >
          {name}
        </span>
      </a>
    );
  }

  return (
    <Link href={path} key={path}>
      <span
        className={cn(
          "text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200",
          pathname === path ? "text-[var(--fg)]" : ""
        )}
      >
        {name}
      </span>
    </Link>
  );
};

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const paths = Object.keys(navItems).filter(
    (path) => resume.show || path !== resume.link
  );

  return (
    <header className="mb-6 md:px-0 pl-4">
      <nav className="flex items-center gap-3" aria-label="Main navigation">
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Site logo"
            width={28}
            height={28}
            className="mr-1"
            priority
          />
        </Link>
        <span className="text-[var(--fg-subtle)]" aria-hidden="true">/</span>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <NavItem
              path={path}
              name={navItems[path].name}
              pathname={pathname}
            />
            {index < paths.length - 1 && (
              <span className="text-[var(--fg-subtle)]" aria-hidden="true">
                /
              </span>
            )}
          </React.Fragment>
        ))}

        {/* Theme toggle — upper right */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="ml-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          <Image
            src={theme === "dark" ? "/images/sun.svg" : "/images/moon.svg"}
            alt={theme === "dark" ? "Light mode" : "Dark mode"}
            width={20}
            height={20}
            className="dark-icon"
          />
        </button>
      </nav>
    </header>
  );
}
