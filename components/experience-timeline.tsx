import { Container } from "./primitives"
import { experience } from "@/data/experience"

export function ExperienceTimeline() {
  return (
    <section id="experience" className="scroll-mt-24 py-12 sm:py-14">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
              경험
            </div>
          </div>

          <ul className="border-t border-border">
            {experience.map((item) => (
              <li
                key={`${item.year}-${item.title}`}
                className="grid grid-cols-[70px_1fr] gap-4 border-b border-border py-4 sm:grid-cols-[90px_1fr_auto] sm:items-center"
              >
                <span className="font-mono text-[11px] text-muted">{item.year}</span>
                <span className="text-[14px] font-semibold text-foreground">{item.title}</span>
                <span className="col-start-2 text-[12px] text-secondary sm:col-auto sm:text-right">
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
