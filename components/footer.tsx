import { BookOpen, Code2, Mail } from "lucide-react"
import { Container } from "./primitives"
import { profile } from "@/data/experience"

const links = [
  { label: "GitHub", value: "github.com/meatcarrot", href: profile.github, icon: Code2 },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Velog", value: "velog.io/@ninguis555", href: profile.velog, icon: BookOpen },
]

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-subtle/55">
      <Container className="py-9">
        <div className="grid gap-5 sm:grid-cols-[120px_1fr_1fr_1fr] sm:items-center">
          <div className="text-[12px] font-semibold uppercase tracking-[0.13em] text-accent">
            연락처
          </div>

          {links.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group flex min-w-0 items-center gap-3"
              >
                <Icon size={17} strokeWidth={1.8} className="shrink-0 text-muted group-hover:text-accent" />
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-muted">{link.label}</div>
                  <div className="truncate text-[14px] font-medium text-foreground group-hover:text-accent">
                    {link.value}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </Container>
    </footer>
  )
}
