import { Container } from "./primitives"
import { experience } from "@/data/experience"

export function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 border-t border-[#dfe3e8] bg-[#f7f9fc] py-12 sm:py-16">
      <Container>
        <h2 id="experience-heading" className="text-[14px] font-semibold tracking-[0.12em] text-[#2563eb]">EXPERIENCE</h2>
        <ol className="relative mt-10 before:absolute before:bottom-8 before:left-8 before:top-8 before:w-px before:bg-[#ccd8e8] md:before:left-1/2">
          {[...experience].reverse().map((item, index) => (
            <li key={`${item.year}-${item.month}-${item.title}`} className="relative grid grid-cols-[64px_minmax(0,1fr)] items-start gap-5 pb-10 last:pb-0 md:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] md:gap-8">
              <div className="relative z-10 col-start-1 row-start-1 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-[#a8c8f5] bg-white text-[#2563eb] md:col-start-2 md:h-20 md:w-20">
                <span className="text-[16px] font-semibold md:text-[18px]">{item.year}</span>
                <span className="text-[13px] font-medium">{item.month}월</span>
              </div>
              <div className={`relative col-start-2 row-start-1 pt-1 md:pt-2 ${index % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-3"}`}>
                <span aria-hidden="true" className={`absolute top-8 hidden h-px w-8 bg-[#ccd8e8] md:block md:top-10 ${index % 2 === 0 ? "-right-8" : "-left-8"}`} />
                <h3 className="text-[20px] font-semibold leading-snug tracking-[-0.025em] text-[#111318] sm:text-[23px]">{item.title}</h3>
                <p className="mt-2 text-[14px] font-medium text-[#68707a]">{item.period}</p>
                <div className="mt-3 space-y-1 text-[15px] leading-[1.8] text-[#59616b]">
                  {item.details.map((detail) => <p key={detail}>{detail}</p>)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
