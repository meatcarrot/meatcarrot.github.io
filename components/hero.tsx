import Link from "next/link"
import { Container, Overline } from "./primitives"
import { profile } from "@/data/experience"

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="max-w-[820px]">
          <Overline className="mb-5 block">
            {profile.name} · {profile.role}
          </Overline>
          <h1 className="text-balance text-[40px] font-bold leading-[1.15] tracking-tight sm:text-[52px] lg:text-[60px]">
            기능 구현에서 멈추지 않고,
            <br />
            시스템의 신뢰성을 검증하고 개선합니다.
          </h1>
          <div className="mt-7 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[13px] text-secondary">
            <span>Java / Spring Backend</span>
            <span aria-hidden className="text-border">
              /
            </span>
            <span>AI Service Engineering</span>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="inline-flex h-11 items-center rounded-md bg-foreground px-5 text-[14px] font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
            >
              Explore Projects
            </Link>
            <Link
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center rounded-md border border-border bg-surface px-5 text-[14px] font-medium text-foreground transition-colors duration-200 hover:border-foreground"
            >
              Resume
            </Link>
            <Link
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center rounded-md border border-border bg-surface px-5 text-[14px] font-medium text-foreground transition-colors duration-200 hover:border-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
