import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container } from "@/components/primitives"
import { EvidenceLink } from "@/components/blocks"
import { getProjectChallenges } from "@/components/challenge-block"
import type { Project } from "@/data/projects"
import { ProjectFlowDiagram } from "./project-flow-diagram"

const nav = [
  { href: "#problem", label: "핵심 문제" },
  { href: "#architecture", label: "시스템 구조" },
  { href: "#decisions", label: "트러블슈팅" },
  { href: "#validation", label: "검증과 한계" },
  { href: "#evidence", label: "확인 가능한 자료" },
]

function SectionTitle({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description?: string
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[36px_1fr]">
      <div className="pt-1 font-mono text-[11px] text-[#2563eb]">{number}</div>
      <div>
        <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[#111318] sm:text-[32px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-[700px] text-[14px] leading-[1.75] text-[#68707a]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function BankArchitecture() {
  return (
    <figure className="mt-7" aria-label="Kafka 송금 시스템 구조">
      <div className="hidden items-center md:flex">
        <div className="border border-[#cbd1d8] bg-white px-4 py-3 font-mono text-[11px] text-[#59616b]">
          REQUEST
        </div>
        <div className="h-px min-w-8 flex-1 bg-[#cbd1d8]" />
        <div className="border border-[#2563eb]/55 bg-white px-4 py-3 text-center font-mono text-[11px] text-[#1f5fd4]">
          TRANSFER LEDGER
          <br />
          + OUTBOX
        </div>
        <div className="h-px min-w-8 flex-1 bg-[#cbd1d8]" />
        <div className="border border-[#cbd1d8] bg-white px-4 py-3 font-mono text-[11px] text-[#59616b]">
          KAFKA
        </div>
        <div className="h-px min-w-8 flex-1 bg-[#cbd1d8]" />
        <div className="border border-[#2563eb]/55 bg-white px-4 py-3 text-center font-mono text-[11px] text-[#1f5fd4]">
          IDEMPOTENT
          <br />
          CONSUMER
        </div>
        <div className="h-px min-w-8 flex-1 bg-[#cbd1d8]" />
        <div className="border border-[#cbd1d8] bg-white px-4 py-3 text-center font-mono text-[11px] text-[#59616b]">
          ACCOUNT
          <br />
          LEDGER
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        {["REQUEST", "TRANSFER LEDGER + OUTBOX", "KAFKA", "IDEMPOTENT CONSUMER", "ACCOUNT LEDGER"].map(
          (label, index) => (
            <div key={label}>
              <div
                className={`border bg-white px-4 py-3 font-mono text-[11px] ${
                  index === 1 || index === 3
                    ? "border-[#2563eb]/55 text-[#1f5fd4]"
                    : "border-[#cbd1d8] text-[#59616b]"
                }`}
              >
                {label}
              </div>
              {index < 4 ? <div className="ml-5 h-4 border-l border-[#cbd1d8]" /> : null}
            </div>
          ),
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="border-t border-dashed border-[#cbd1d8] pt-3">
          <div className="font-mono text-[10px] tracking-[0.07em] text-[#7b828c]">
            PUBLISH FAILURE
          </div>
          <div className="mt-1 text-[13px] leading-relaxed text-[#59616b]">
            Outbox의 미발행 상태를 남기고 재발행합니다.
          </div>
        </div>
        <div className="border-t border-dashed border-[#cbd1d8] pt-3">
          <div className="font-mono text-[10px] tracking-[0.07em] text-[#2563eb]">
            DUPLICATE DELIVERY
          </div>
          <div className="mt-1 text-[13px] leading-relaxed text-[#59616b]">
            서비스 검증과 DB 제약을 함께 사용해 멱등성을 확보합니다.
          </div>
        </div>
      </div>

      <figcaption className="mt-6 max-w-[780px] text-[14px] leading-[1.75] text-[#68707a]">
        송금 요청과 Outbox를 동일한 DB 트랜잭션에 기록하고, Kafka 발행 실패는 상태로 남겨
        이후 재처리할 수 있게 했습니다. 소비 단계에서는 중복 반영을 DB 제약까지 포함해
        방어합니다.
      </figcaption>
    </figure>
  )
}

function DecisionStory({
  index,
  title,
  problem,
  investigation,
  solution,
  why,
  tradeOff,
  validation,
  evidence,
}: {
  index: number
  title: string
  problem: string
  investigation?: string
  solution: string
  why?: string
  tradeOff?: string
  validation?: string
  evidence?: string
}) {
  return (
    <article className="border-t border-[#d7dce2] py-8">
      <div className="grid gap-5">
        <div>
          <h3 className="text-[23px] font-semibold leading-tight tracking-[-0.025em] text-[#111318]">
            {title}
          </h3>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div>
              <div className="font-mono text-[10px] tracking-[0.08em] text-[#8a9098]">문제</div>
              <p className="mt-2 text-[14px] leading-[1.75] text-[#5f6670]">{problem}</p>
              {investigation ? (
                <>
                  <div className="mt-5 font-mono text-[10px] tracking-[0.08em] text-[#8a9098]">
                    CHECKED
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.75] text-[#5f6670]">
                    {investigation}
                  </p>
                </>
              ) : null}
            </div>

            <div className="border-l border-[#d7dce2] pl-5">
              <div className="font-mono text-[10px] tracking-[0.08em] text-[#2563eb]">선택</div>
              <p className="mt-2 text-[15px] font-medium leading-[1.75] text-[#252b33]">{solution}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 border-t border-[#e2e5e9] pt-5 sm:grid-cols-3">
            {why ? (
              <div>
                <div className="font-mono text-[9px] tracking-[0.08em] text-[#9aa0a8]">선택 이유</div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#68707a]">{why}</p>
              </div>
            ) : null}
            {tradeOff ? (
              <div>
                <div className="font-mono text-[9px] tracking-[0.08em] text-[#9aa0a8]">
                  TRADE-OFF
                </div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#68707a]">{tradeOff}</p>
              </div>
            ) : null}
            {validation ? (
              <div>
                <div className="font-mono text-[9px] tracking-[0.08em] text-[#2563eb]">
                  VERIFIED
                </div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#4f5863]">{validation}</p>
              </div>
            ) : null}
          </div>


        </div>
      </div>
    </article>
  )
}

export function BankProjectDetail({ project }: { project: Project }) {
  const challenges = getProjectChallenges(project)

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="border-b border-[#dfe3e8] bg-[#fbfbfa]">
          <Container className="py-12 sm:py-16">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#68707a] underline-offset-4 hover:text-[#111318] hover:underline"
            >
              <ArrowLeft size={14} strokeWidth={1.8} />
              프로젝트로 돌아가기
            </Link>

            <div className="mt-9 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-8">
                <div className="text-[12px] font-medium text-[#7b828c]">백엔드 · 신뢰성</div>
                <h1 className="mt-3 max-w-[850px] text-[40px] font-semibold leading-[1.04] tracking-[-0.045em] text-[#111318] sm:text-[50px] lg:text-[56px]">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-[760px] text-[16px] leading-[1.8] text-[#5f6670]">
                  {project.summary}
                </p>
              </div>

              <div className="lg:col-span-4 lg:border-l lg:border-[#d7dce2] lg:pl-8">
                <div className="text-[27px] font-semibold tracking-[-0.03em] text-[#111318]">
                  {project.outcome}
                </div>
                <div className="mt-1 text-[13px] leading-relaxed text-[#68707a]">
                  {project.outcomeNote}
                </div>

                <dl className="mt-7 grid gap-4 text-[13px]">
                  <div>
                    <dt className="font-mono text-[9px] tracking-[0.09em] text-[#9aa0a8]">역할</dt>
                    <dd className="mt-1 text-[#434b55]">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] tracking-[0.09em] text-[#9aa0a8]">기간</dt>
                    <dd className="mt-1 text-[#434b55]">{project.period}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] tracking-[0.09em] text-[#9aa0a8]">팀</dt>
                    <dd className="mt-1 text-[#434b55]">{project.team}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-9 grid gap-7 border-t border-[#dfe3e8] pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="font-mono text-[9px] tracking-[0.09em] text-[#9aa0a8]">담당 영역</div>
                <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {project.myRole.map((item) => (
                    <li key={item} className="text-[14px] leading-[1.65] text-[#5f6670]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] text-[#7b828c] lg:justify-end">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                {project.repository ? (
                  <a
                    href={project.repository.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563eb] underline-offset-4 hover:underline lg:float-right"
                  >
                    GitHub <ExternalLink size={12} />
                  </a>
                ) : null}
              </div>
            </div>
          </Container>
        </section>

        <Container className="py-14 sm:py-18">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <aside className="hidden lg:col-span-3 lg:block">
              <nav className="sticky top-24 border-t border-[#d7dce2] pt-5" aria-label="페이지 내 이동">
                <div className="font-mono text-[10px] tracking-[0.1em] text-[#9aa0a8]">
                  CASE STUDY
                </div>
                <ul className="mt-4 space-y-2">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-[13px] text-[#68707a] underline-offset-4 hover:text-[#111318] hover:underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="lg:col-span-9">
              <section id="problem" className="scroll-mt-24">
                <SectionTitle
                  number="01"
                  title="핵심 문제"
                  description="단순 잔액 변경보다 DB와 메시지 브로커 사이의 상태 불일치와 재처리 가능성을 더 중요한 문제로 보았습니다."
                />

                <p className="mt-7 max-w-[780px] text-[16px] leading-[1.85] text-[#505863]">
                  {project.overview}
                </p>

                <div className="mt-7 divide-y divide-[#dfe3e8] border-y border-[#dfe3e8]">
                  {project.problem.slice(0, 3).map((item) => (
                    <div key={item} className="py-4">
                      <p className="max-w-[800px] text-[14px] leading-[1.75] text-[#5f6670]">{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="architecture" className="scroll-mt-24 border-t border-[#dfe3e8] pt-12 mt-14">
                <SectionTitle
                  number="02"
                  title="시스템 구조"
                  description="상태를 먼저 DB에 기록하고, 메시지 전달 실패는 복구 가능한 상태로 남기도록 구조를 나눴습니다."
                />
                <ProjectFlowDiagram project="bank" variant="detail" className="mt-6" />
              </section>

              <section id="decisions" className="scroll-mt-24 border-t border-[#dfe3e8] pt-12 mt-14">
                <SectionTitle
                  number="03"
                  title="트러블슈팅과 의사결정"
                  description="문제를 확인하고 해결책을 선택한 뒤, 선택 이유와 트레이드오프, 검증 결과까지 한 흐름으로 정리했습니다."
                />

                <div className="mt-6">
                  {challenges.map((challenge, index) => (
                    <DecisionStory
                      key={challenge.title}
                      index={index}
                      title={challenge.title}
                      problem={challenge.problem}
                      investigation={challenge.investigation}
                      solution={challenge.solution}
                      why={challenge.why}
                      tradeOff={challenge.tradeOff}
                      validation={challenge.validation}
                      evidence={challenge.evidence}
                    />
                  ))}
                </div>
              </section>

              <section id="validation" className="scroll-mt-24 border-t border-[#dfe3e8] pt-12 mt-14">
                <SectionTitle
                  number="04"
                  title="검증과 한계"
                  description="검증한 범위와 아직 검증하지 못한 범위를 분리해 기록했습니다."
                />

                <div className="mt-7 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111318]">검증</h3>
                    <ul className="mt-4 space-y-4">
                      {project.validation.map((item) => (
                        <li key={item} className="border-t border-[#dfe3e8] pt-4 text-[14px] leading-[1.75] text-[#5f6670]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111318]">한계</h3>
                    <ul className="mt-4 space-y-4">
                      {project.limitations.map((item) => (
                        <li key={item} className="border-t border-[#dfe3e8] pt-4 text-[14px] leading-[1.75] text-[#5f6670]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="evidence" className="scroll-mt-24 border-t border-[#dfe3e8] pt-12 mt-14">
                <SectionTitle
                  number="05"
                  title="확인 가능한 자료"
                  description="코드와 테스트 파일에서 설계 판단과 검증 근거를 확인할 수 있습니다."
                />

                <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                  {project.evidence.map((item, index) => (
                    <EvidenceLink key={`${item.label}-${index}`} item={item} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
