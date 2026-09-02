import { Container, SectionHeading } from "./primitives"
import { experience } from "@/data/experience"

export function ExperienceTimeline() {
  return (
    <section className="border-t border-border py-24 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading id="experience" overline="Experience" title="Experience & Timeline" />
        <ul className="mt-12 border-t border-border">
          {experience.map((item) => (
            <li
              key={`${item.year}-${item.title}`}
              className="grid grid-cols-[64px_1fr] items-baseline gap-4 border-b border-border py-6 sm:grid-cols-[120px_1fr] sm:gap-8"
            >
              <span className="font-mono text-[14px] text-muted">{item.year}</span>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="text-[17px] font-medium tracking-tight text-foreground sm:text-[18px]">
                  {item.title}
                </span>
                <span className="text-[14px] text-secondary sm:text-right">{item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
