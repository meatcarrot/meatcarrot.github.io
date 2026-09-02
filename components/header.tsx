import Link from "next/link"
import { Container } from "./primitives"
import { profile } from "@/data/experience"

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "Approach", href: "/#approach" },
  { label: "Experience", href: "/#experience" },
  { label: "GitHub", href: profile.github, external: true },
  { label: "Resume", href: profile.github, external: true },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[13px] font-medium tracking-[0.12em] text-foreground transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.label} className="hidden sm:block">
                <Link
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="text-[14px] text-secondary underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="sm:hidden">
              <Link
                href="/#projects"
                className="text-[14px] text-secondary transition-colors hover:text-foreground"
              >
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
