"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "../utils/cn";
import { usePathname } from "next/navigation";
import React from "react";
import { resume } from "@/blog.config";

const navItems = {
  "/": { name: "home" },
  "/projects": { name: "projects" },
  "/about": { name: "about" },
  "/resume.pdf": { name: "resume" },
} as const;

interface NavItemProps {
  path: string;
  name: string;
  pathname: string;
}

const NavItem = ({ path, name, pathname }: NavItemProps) => {
  const isResume = path === "/resume.pdf";

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
            "text-gray-400 hover:text-white transition-colors duration-200",
            pathname === path ? "text-white" : ""
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
          "text-gray-400 hover:text-white transition-colors duration-200",
          pathname === path ? "text-white" : ""
        )}
      >
        {name}
      </span>
    </Link>
  );
};

export function Navbar() {
  const pathname = usePathname();
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
        <span className="text-gray-700" aria-hidden="true">/</span>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <NavItem
              path={path}
              name={navItems[path as keyof typeof navItems].name}
              pathname={pathname}
            />
            {index < paths.length - 1 && (
              <span className="text-gray-700" aria-hidden="true">
                /
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </header>
  );
}
