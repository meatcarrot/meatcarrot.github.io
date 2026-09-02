import { Container, SectionHeading } from "./primitives"

const concepts = [
  {
    title: "Reliability",
    body: "실패 이후에도 상태를 추적하고 복구할 수 있는 구조를 설계합니다.",
    reference: "Transfer System",
  },
  {
    title: "Performance",
    body: "비용이 큰 실행 경로를 찾고 더 짧고 명확한 경로로 바꿉니다.",
    reference: "Airport AI Chatbot",
  },
  {
    title: "Verification",
    body: "시스템이나 모델의 결과를 그대로 신뢰하지 않고 테스트와 외부 근거로 검증합니다.",
    reference: "Weather / LLM QA",
  },
]

export function Approach() {
  return (
    <section className="border-t border-border py-24 sm:py-28 lg:py-32">
      <Container>
        <SectionHeading id="approach" overline="Approach" title="HOW I APPROACH ENGINEERING" />
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-3">
          {concepts.map((c) => (
            <div key={c.title}>
              <h3 className="text-[20px] font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-secondary">{c.body}</p>
              <div className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                {c.reference}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
