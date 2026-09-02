import Link from "next/link"
import { ShieldCheck, Gauge, BadgeCheck, ArrowRight } from "lucide-react"
import { Container } from "./primitives"

const concepts = [
  {
    number: "01",
    title: "신뢰성",
    body: "실패 이후에도 상태를 추적하고 복구할 수 있는 구조를 설계합니다.",
    references: [{ label: "송금 시스템", href: "/projects/bank/" }],
    icon: ShieldCheck,
    tone: "bg-[#20344c] text-[#8fb9e7]",
  },
  {
    number: "02",
    title: "성능",
    body: "비용이 큰 실행 경로를 찾고 더 짧고 명확한 경로로 바꿉니다.",
    references: [{ label: "공항 AI 챗봇", href: "/projects/airbot/" }],
    icon: Gauge,
    tone: "bg-[#1f3e31] text-[#74c795]",
  },
  {
    number: "03",
    title: "검증",
    body: "결과를 그대로 신뢰하지 않고 테스트와 외부 근거로 검증합니다.",
    references: [
      { label: "날씨 예측", href: "/projects/weather/" },
      { label: "LLM 코드 검증", href: "/projects/llm-qa/" },
    ],
    icon: BadgeCheck,
    tone: "bg-[#332d49] text-[#b6a1ef]",
  },
]

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 bg-[#15171b] py-14 text-white sm:py-16">
      <Container>
        <div className="grid gap-9 lg:grid-cols-[260px_1fr]">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8fb9e7]">
              개발 방식
            </div>
            <h2 className="mt-3 text-[30px] leading-[1.08] tracking-[-0.03em] text-white">
              문제를 바라보고
              <br />
              해결하는 방식
            </h2>
          </div>

          <div className="grid gap-0 md:grid-cols-3">
            {concepts.map((concept, index) => {
              const Icon = concept.icon

              return (
                <div
                  key={concept.number}
                  className={`px-0 py-4 md:px-6 md:py-0 ${
                    index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${concept.tone}`}>
                    <Icon size={19} strokeWidth={1.8} />
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#8fb9e7]">{concept.number}</span>
                    <h3 className="text-[16px] font-semibold text-white">{concept.title}</h3>
                  </div>

                  <p className="mt-3 text-[13px] leading-[1.7] text-white/65">{concept.body}</p>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {concept.references.map((reference) => (
                      <Link
                        key={reference.href}
                        href={reference.href}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.03em] text-[#8fb9e7] hover:text-white"
                      >
                        {reference.label} <ArrowRight size={12} />
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
