import { Container, Overline } from "./primitives"
import { profile } from "@/data/experience"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-subtle/50">
      <Container className="py-20 sm:py-24">
        <Overline className="mb-5 block">Contact</Overline>
        <h2 className="max-w-[640px] text-balance text-[28px] font-bold leading-tight tracking-tight sm:text-[32px]">
          신뢰성과 검증을 중심으로 백엔드를 설계하는 개발자를 찾고 계신가요?
        </h2>
        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <dl className="flex flex-col gap-3 sm:flex-row sm:gap-10">
            <div className="flex items-baseline gap-3">
              <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">Email</dt>
              <dd>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[15px] text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">GitHub</dt>
              <dd>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[15px] text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  github.com/meatcarrot
                </a>
              </dd>
            </div>
          </dl>
          <p className="font-mono text-[12px] text-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </Container>
    </footer>
  )
}
