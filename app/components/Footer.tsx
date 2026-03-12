import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/", label: "blog" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/davidbrownm/",
    label: "LinkedIn",
    icon: "/images/linkedin.svg",
  },
  {
    href: "https://github.com/brownmd",
    label: "GitHub",
    icon: "/images/github.svg",
  },
  {
    href: "https://medium.com/@david_m_brown",
    label: "Medium",
    icon: "/images/medium.svg",
  },
  {
    href: "mailto:david_m_brown@hotmail.com?subject=Contact%20from%20the%20blog",
    label: "Email",
    icon: "/images/email.svg",
  },
];

export function Footer() {
  return (
    <footer className="mt-16 mb-8 md:px-0 pl-4">
      <div className="border-t border-[var(--separator)] pt-6">
        <nav
          className="flex items-center gap-3"
          aria-label="Footer navigation"
        >
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.svg"
              alt="Site logo"
              width={20}
              height={20}
              className="mr-1 opacity-60 hover:opacity-100 transition-opacity duration-200"
            />
          </Link>
          <span className="text-[var(--fg-subtle)]" aria-hidden="true">
            /
          </span>
          {footerLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-3">
              <Link
                href={link.href}
                className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="text-[var(--fg-subtle)]" aria-hidden="true">
                  /
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-4">
          <p className="text-[var(--fg)] text-sm font-medium">David Brown</p>
          <p className="text-[var(--fg-subtle)] text-xs">The Talent Operator</p>
        </div>

        <div className="mt-3 flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="opacity-40 hover:opacity-100 transition-opacity duration-200"
            >
              <Image
                src={social.icon}
                alt={social.label}
                width={18}
                height={18}
                className="dark-icon"
              />
            </a>
          ))}
        </div>

        <p className="mt-4 text-[var(--fg-faint)] text-xs">
          {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
