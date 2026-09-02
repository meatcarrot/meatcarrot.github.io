import { Container } from "./primitives"
import { experience } from "@/data/experience"

export function ExperienceTimeline() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-border bg-background py-16 sm:py-20">
      <Container>
        <div className="grid gap-9 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div>
            <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-foreground sm:text-[34px]">
              경험
            </h2>
            <p className="mt-3 max-w-[240px] text-[14px] leading-[1.7] text-secondary">
              학습과 프로젝트를 통해 시스템 설계와 검증의 범위를 넓혀왔습니다.
            </p>
          </div>

          <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {experience.map((item, index) => (
              <li
                key={`${item.year}-${item.title}`}
                className={`relative border-t border-border pt-5 lg:px-5 ${
                  index === 0 ? "lg:pl-0" : ""
                }`}
              >
                <span
                  className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-[#2563eb] lg:left-5"
                  aria-hidden
                />
                <div className="font-mono text-[12px] text-accent">{item.year}</div>
                <div className="mt-3 text-[15px] font-semibold leading-snug text-foreground">
                  {item.title}
                </div>
                <div className="mt-2 text-[13px] leading-[1.6] text-secondary">{item.detail}</div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
