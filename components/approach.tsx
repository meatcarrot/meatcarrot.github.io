import Link from "next/link"
import { Container } from "./primitives"

const principles = [
  {
    signal: "실패 조건",
    title: "신뢰성",
    body: "실패 이후에도 상태를 추적하고 복구할 수 있는 구조를 설계합니다.",
    reference: { label: "송금 시스템", href: "/projects/bank/" },
  },
  {
    signal: "병목",
    title: "성능",
    body: "비용이 큰 실행 경로를 찾고 더 짧고 명확한 경로로 바꿉니다.",
    reference: { label: "공항 AI 챗봇", href: "/projects/airbot/" },
  },
  {
    signal: "결과",
    title: "검증",
    body: "결과를 그대로 신뢰하지 않고 테스트와 외부 근거로 확인합니다.",
    reference: { label: "검증 프로젝트", href: "/projects/llm-qa/" },
  },
]

export function Approach() {
  return (
    <section
      id="approach"
      className="scroll-mt-16 bg-[#f7f7f4] py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-20">
          <div>
            <h2 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] text-[#111318] sm:text-[34px]">
              문제를 바라보고
              <br />
              해결하는 방식
            </h2>

            <p className="mt-5 max-w-[270px] text-[14px] leading-[1.8] text-[#68707a]">
              기술을 먼저 고르기보다 실패 조건과 검증 방법을 먼저 정의합니다.
            </p>
          </div>

          <div className="border-t border-[#cfd5dc]">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="grid gap-4 border-b border-[#dfe3e8] py-7 sm:grid-cols-[92px_110px_1fr] sm:gap-6 lg:grid-cols-[110px_125px_1fr] lg:py-8"
              >
                <div className="pt-1 text-[11px] font-medium tracking-[0.04em] text-[#8a929c]">
                  {principle.signal}
                </div>

                <h3 className="text-[21px] font-semibold tracking-[-0.025em] text-[#111318]">
                  {principle.title}
                </h3>

                <div>
                  <p className="max-w-[620px] text-[15px] leading-[1.75] text-[#59616b]">
                    {principle.body}
                  </p>

                  <Link
                    href={principle.reference.href}
                    className="mt-3 inline-flex text-[13px] font-semibold text-[#2563eb] underline-offset-4 hover:underline"
                  >
                    {principle.reference.label} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
