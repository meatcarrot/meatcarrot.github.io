import { Container } from "./primitives"
import { profile } from "@/data/experience"

const links = [
  { label: "GitHub", value: "meatcarrot", href: profile.github },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Velog", value: "@ninguis555", href: profile.velog },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-[#f3f5f7] text-[#111318]">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 border-t border-[#dfe3e8] pt-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="text-[18px] font-semibold tracking-[0.14em]">{profile.name}</div>
            <div className="mt-2 text-[13px] text-[#777e87]">Backend Developer</div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group"
              >
                <div className="text-[10px] font-medium text-[#9aa0a8]">{link.label}</div>
                <div className="mt-1 max-w-[210px] truncate text-[13px] text-[#606873] group-hover:text-[#111318]">
                  {link.value}
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
