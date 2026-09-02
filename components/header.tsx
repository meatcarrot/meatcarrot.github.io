import Link from "next/link"
import { Container } from "./primitives"
import { profile } from "@/data/experience"

const navItems = [
  { label: "프로젝트", href: "/#projects" },
  { label: "개발 방식", href: "/#approach" },
  { label: "경험", href: "/#experience" },
  { label: "GitHub", href: profile.github, external: true },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[16px] font-semibold tracking-[0.12em] text-foreground transition-colors hover:text-accent"
        >
          <span
            className="h-2 w-2 rounded-full bg-accent transition-transform duration-200 group-hover:scale-125"
            aria-hidden
          />
          {profile.name}
        </Link>

        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.label} className={item.label === "GitHub" ? "block" : "hidden sm:block"}>
                <Link
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="text-[14px] font-medium text-secondary underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                >
                  {item.label}
                  {item.external ? " ↗" : ""}
                </Link>
              </li>
            ))}
            <li className="sm:hidden">
              <Link
                href="/#projects"
                className="text-[13px] text-secondary transition-colors hover:text-foreground"
              >
                프로젝트
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  )
}
