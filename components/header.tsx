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
    <header className="sticky top-0 z-50 border-b border-[#e4e7eb] bg-[#fbfbfa]/94 text-[#111318] backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[0.15em] text-[#111318] transition-colors hover:text-[#2563eb]"
        >
          {profile.name}
        </Link>

        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-4 sm:gap-7">
            {navItems.map((item) => (
              <li
                key={item.label}
                className={item.label === "GitHub" ? "block" : "hidden sm:block"}
              >
                <Link
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                  className="text-[13px] font-medium text-[#666d76] underline-offset-4 transition-colors hover:text-[#111318] hover:underline"
                >
                  {item.label}
                  {item.external ? " ↗" : ""}
                </Link>
              </li>
            ))}

            <li className="sm:hidden">
              <Link
                href="/#projects"
                className="text-[13px] text-[#666d76]"
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
