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

type Challenge = ReturnType<typeof getProjectChallenges>[number]

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
          <p className="mt-2 max-w-[720px] text-[14px] leading-[1.75] text-[#68707a]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function FlowBox({
  children,
  emphasis = false,
}: {
  children: React.ReactNode
  emphasis?: boolean
}) {
  return (
    <div
      className={`border bg-white px-3 py-3 text-center font-mono text-[10px] leading-tight sm:text-[11px] ${
        emphasis
          ? "border-[#2563eb]/55 text-[#1f5fd4]"
          : "border-[#cbd1d8] text-[#59616b]"
      }`}
    >
      {children}
    </div>
  )
}

function Line() {
  return <div className="h-px min-w-5 flex-1 bg-[#cbd1d8]" aria-hidden />
}

function AirBotArchitecture() {
  return (
    <figure className="mt-7" aria-label="인천공항 AI 챗봇 응답 경로">
      <div className="hidden items-center md:flex">
        <FlowBox>QUESTION</FlowBox>
        <Line />
        <FlowBox>EMBEDDING</FlowBox>
        <Line />
        <FlowBox emphasis>SEMANTIC CACHE</FlowBox>
      </div>

      <div className="mt-6 hidden grid-cols-[1fr_64px_1fr] items-start gap-5 md:grid">
        <div className="border-t border-[#cbd1d8] pt-4">
          <div className="font-mono text-[10px] text-[#22834c]">CACHE HIT</div>
          <div className="mt-3">
            <FlowBox emphasis>ANSWER &lt; 1s*</FlowBox>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-[#68707a]">
            의미가 유사한 질문은 기존 답변을 재사용합니다.
          </p>
        </div>

        <div className="flex h-full items-start justify-center">
          <div className="h-10 border-l border-dashed border-[#cbd1d8]" />
        </div>

        <div className="border-t border-[#cbd1d8] pt-4">
          <div className="font-mono text-[10px] text-[#8a9098]">CACHE MISS</div>
          <div className="mt-3">
            <FlowBox>LANGGRAPH / RAG</FlowBox>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-px flex-1 border-t border-dashed border-[#cbd1d8]" />
            <span className="font-mono text-[9px] text-[#7b828c]">ASYNC CACHE STORE</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        <FlowBox>QUESTION</FlowBox>
        <div className="ml-5 h-3 border-l border-[#cbd1d8]" />
        <FlowBox>EMBEDDING</FlowBox>
        <div className="ml-5 h-3 border-l border-[#cbd1d8]" />
        <FlowBox emphasis>SEMANTIC CACHE</FlowBox>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="ml-5 h-3 border-l border-[#cbd1d8]" />
            <FlowBox emphasis>HIT → ANSWER</FlowBox>
          </div>
          <div>
            <div className="ml-5 h-3 border-l border-[#cbd1d8]" />
            <FlowBox>MISS → LANGGRAPH / RAG</FlowBox>
          </div>
        </div>
      </div>

      <figcaption className="mt-6 max-w-[760px] text-[14px] leading-[1.75] text-[#68707a]">
        질문 임베딩으로 Semantic Cache를 먼저 조회하고, 적중 시에는 전체 LangGraph/RAG
        경로를 건너뜁니다. 미적중 질문만 기존 생성 경로를 실행하고 이후 캐시에 저장합니다.
      </figcaption>
    </figure>
  )
}

function WeatherArchitecture() {
  return (
    <figure className="mt-7" aria-label="119 신고량 2-Stage 예측 구조">
      <div className="hidden md:block">
        <div className="mx-auto max-w-[250px]">
          <FlowBox>WEATHER + 119 DATA</FlowBox>
        </div>
        <div className="mx-auto h-5 w-px bg-[#cbd1d8]" />
        <div className="mx-auto max-w-[300px]">
          <FlowBox emphasis>EXTREME-CLIMATE CLASSIFIER</FlowBox>
        </div>

        <div className="mx-auto h-5 w-px bg-[#cbd1d8]" />
        <div className="mx-auto h-px w-1/2 bg-[#cbd1d8]" />
        <div className="mx-auto grid w-1/2 grid-cols-2">
          <div className="h-5 border-l border-[#cbd1d8]" />
          <div className="h-5 border-r border-[#cbd1d8]" />
        </div>

        <div className="mx-auto grid max-w-[620px] grid-cols-2 gap-12">
          <div>
            <div className="font-mono text-[9px] text-[#8a9098]">NORMAL</div>
            <div className="mt-2">
              <FlowBox>NORMAL REGRESSOR</FlowBox>
            </div>
          </div>
          <div>
            <div className="font-mono text-[9px] text-[#2563eb]">EXTREME</div>
            <div className="mt-2">
              <FlowBox emphasis>EXTREME REGRESSOR</FlowBox>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 h-px w-1/2 bg-[#cbd1d8]" />
        <div className="mx-auto h-5 w-px bg-[#cbd1d8]" />
        <div className="mx-auto max-w-[280px]">
          <FlowBox emphasis>REPORT-COUNT PREDICTION</FlowBox>
        </div>
      </div>

      <div className="grid gap-3 md:hidden">
        <FlowBox>WEATHER + 119 DATA</FlowBox>
        <div className="ml-5 h-3 border-l border-[#cbd1d8]" />
        <FlowBox emphasis>EXTREME-CLIMATE CLASSIFIER</FlowBox>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="ml-5 h-3 border-l border-[#cbd1d8]" />
            <FlowBox>NORMAL REGRESSOR</FlowBox>
          </div>
          <div>
            <div className="ml-5 h-3 border-l border-[#cbd1d8]" />
            <FlowBox emphasis>EXTREME REGRESSOR</FlowBox>
          </div>
        </div>
        <div className="mx-auto h-3 border-l border-[#cbd1d8]" />
        <FlowBox emphasis>REPORT-COUNT PREDICTION</FlowBox>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="border-t border-dashed border-[#cbd1d8] pt-3">
          <div className="font-mono text-[10px] text-[#7b828c]">WHY SPLIT?</div>
          <p className="mt-1 text-[13px] leading-relaxed text-[#59616b]">
            평상시와 재난 상황의 신고량 분포가 다르다는 가설을 모델 구조에 반영했습니다.
          </p>
        </div>
        <div className="border-t border-dashed border-[#cbd1d8] pt-3">
          <div className="font-mono text-[10px] text-[#2563eb]">VALIDATION</div>
          <p className="mt-1 text-[13px] leading-relaxed text-[#59616b]">
            데이터 누수 가능성을 제거한 뒤 최종 RMSE 약 0.9 수준을 확인했습니다.
          </p>
        </div>
      </div>
    </figure>
  )
}

function LlmArchitecture() {
  return (
    <figure className="mt-7" aria-label="LLM 생성 코드 실행 기반 검증 루프">
      <div className="hidden items-center md:flex">
        <FlowBox>GENERATED CODE</FlowBox>
        <Line />
        <FlowBox>COMPILE + RUN</FlowBox>
        <Line />
        <FlowBox emphasis>C++ SANITIZER</FlowBox>
        <Line />
        <FlowBox emphasis>FEEDBACK</FlowBox>
        <Line />
        <FlowBox>REVISED CODE</FlowBox>
      </div>

      <div className="mt-5 hidden items-center gap-3 md:flex">
        <span className="font-mono text-[9px] text-[#7b828c]">EXECUTION EVIDENCE</span>
        <div className="h-px flex-1 border-t border-dashed border-[#cbd1d8]" />
        <span className="font-mono text-[9px] text-[#2563eb]">REVIEW LOOP ↺</span>
      </div>

      <div className="grid gap-3 md:hidden">
        {["GENERATED CODE", "COMPILE + RUN", "C++ SANITIZER", "FEEDBACK", "REVISED CODE"].map(
          (label, index) => (
            <div key={label}>
              <FlowBox emphasis={index === 2 || index === 3}>{label}</FlowBox>
              {index < 4 ? <div className="ml-5 h-3 border-l border-[#cbd1d8]" /> : null}
            </div>
          ),
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="border-t border-dashed border-[#cbd1d8] pt-3">
          <div className="font-mono text-[10px] text-[#7b828c]">STATIC CHECK</div>
          <p className="mt-1 text-[13px] leading-relaxed text-[#59616b]">
            정답 유사도만으로는 런타임 오류를 포착하기 어렵습니다.
          </p>
        </div>
        <div className="border-t border-dashed border-[#cbd1d8] pt-3">
          <div className="font-mono text-[10px] text-[#2563eb]">EXECUTION CHECK</div>
          <p className="mt-1 text-[13px] leading-relaxed text-[#59616b]">
            컴파일·실행·Sanitizer 결과를 리뷰 단계의 피드백 근거로 다시 전달합니다.
          </p>
        </div>
      </div>
    </figure>
  )
}

function ProjectArchitecture({ project }: { project: Project }) {
  if (project.slug === "airbot") return <AirBotArchitecture />
  if (project.slug === "weather") return <WeatherArchitecture />
  return <LlmArchitecture />
}

function DecisionStory({
  challenge,
  index,
}: {
  challenge: Challenge
  index: number
}) {
  return (
    <article className="border-t border-[#d7dce2] py-8">
      <div className="grid gap-5">
        <div>
          <h3 className="text-[23px] font-semibold leading-tight tracking-[-0.025em] text-[#111318]">
            {challenge.title}
          </h3>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div>
              <div className="font-mono text-[10px] tracking-[0.08em] text-[#8a9098]">문제</div>
              <p className="mt-2 text-[14px] leading-[1.75] text-[#5f6670]">{challenge.problem}</p>
              {challenge.investigation ? (
                <>
                  <div className="mt-5 font-mono text-[10px] tracking-[0.08em] text-[#8a9098]">
                    CHECKED
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.75] text-[#5f6670]">
                    {challenge.investigation}
                  </p>
                </>
              ) : null}
            </div>

            <div className="border-l border-[#d7dce2] pl-5">
              <div className="font-mono text-[10px] tracking-[0.08em] text-[#2563eb]">선택</div>
              <p className="mt-2 text-[15px] font-medium leading-[1.75] text-[#252b33]">
                {challenge.solution}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 border-t border-[#e2e5e9] pt-5 sm:grid-cols-3">
            {challenge.why ? (
              <div>
                <div className="font-mono text-[9px] tracking-[0.08em] text-[#9aa0a8]">선택 이유</div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#68707a]">{challenge.why}</p>
              </div>
            ) : null}
            {challenge.tradeOff ? (
              <div>
                <div className="font-mono text-[9px] tracking-[0.08em] text-[#9aa0a8]">
                  TRADE-OFF
                </div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#68707a]">
                  {challenge.tradeOff}
                </p>
              </div>
            ) : null}
            {challenge.validation ? (
              <div>
                <div className="font-mono text-[9px] tracking-[0.08em] text-[#2563eb]">
                  VERIFIED
                </div>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#4f5863]">
                  {challenge.validation}
                </p>
              </div>
            ) : null}
          </div>


        </div>
      </div>
    </article>
  )
}

function sectionDescription(slug: string) {
  if (slug === "airbot") {
    return {
      problem: "변하는 공항 정보를 다루면서도 반복 LLM 실행 비용과 응답 지연을 줄이는 것이 핵심 과제였습니다.",
      architecture: "유사 질의는 빠른 경로로 우회하고, 미적중 질문만 기존 LangGraph/RAG 경로를 실행하도록 분리했습니다.",
      decisions: "응답 병목과 상태 저장 역할을 분리해 성능과 구조적 명확성을 함께 개선했습니다.",
    }
  }

  if (slug === "weather") {
    return {
      problem: "평상시와 재난 상황의 데이터 분포 차이, 극단값, 데이터 누수 가능성을 함께 다뤄야 했습니다.",
      architecture: "극단 기후 여부를 먼저 분류한 뒤 상황별 회귀 모델로 분기하는 2-Stage 구조를 사용했습니다.",
      decisions: "모델 성능보다 먼저 분포 차이와 검증 방식의 신뢰성을 확인하는 데 초점을 맞췄습니다.",
    }
  }

  return {
    problem: "정적 정답 비교가 놓치는 런타임 오류를 실제 실행 결과로 검증하고 다시 리뷰에 반영하는 것이 핵심이었습니다.",
    architecture: "생성 코드의 컴파일·실행과 Sanitizer 결과를 피드백 근거로 사용해 반복 검증 루프를 구성했습니다.",
    decisions: "정적 비교에서 실행 기반 검증으로 확장하면서 파이프라인 복잡도와 검증 범위를 함께 다뤘습니다.",
  }
}

export function ProjectCaseStudyDetail({ project }: { project: Project }) {
  const challenges = getProjectChallenges(project)
  const descriptions = sectionDescription(project.slug)

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
                <div className="text-[12px] font-medium text-[#7b828c]">{project.category}</div>
                <h1 className="mt-3 max-w-[880px] text-[40px] font-semibold leading-[1.04] tracking-[-0.045em] text-[#111318] sm:text-[50px] lg:text-[56px]">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-[780px] text-[16px] leading-[1.8] text-[#5f6670]">
                  {project.summary}
                </p>
              </div>

              <div className="lg:col-span-4 lg:border-l lg:border-[#d7dce2] lg:pl-8">
                <div className="text-[27px] font-semibold tracking-[-0.03em] text-[#111318]">
                  {project.outcome}
                </div>
                {project.outcomeNote ? (
                  <div className="mt-1 text-[13px] leading-relaxed text-[#68707a]">
                    {project.outcomeNote}
                  </div>
                ) : null}
                {project.outcomeLabel ? (
                  <div className="mt-1 text-[13px] leading-relaxed text-[#68707a]">
                    {project.outcomeLabel}
                  </div>
                ) : null}

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

        <Container className="py-14">
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
                <SectionTitle number="01" title="핵심 문제" description={descriptions.problem} />

                <p className="mt-7 max-w-[800px] text-[16px] leading-[1.85] text-[#505863]">
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

              <section id="architecture" className="mt-14 scroll-mt-24 border-t border-[#dfe3e8] pt-12">
                <SectionTitle number="02" title="시스템 구조" description={descriptions.architecture} />
                <ProjectFlowDiagram project={project.slug} variant="detail" className="mt-6" />
              </section>

              <section id="decisions" className="mt-14 scroll-mt-24 border-t border-[#dfe3e8] pt-12">
                <SectionTitle
                  number="03"
                  title="트러블슈팅과 의사결정"
                  description={descriptions.decisions}
                />

                <div className="mt-6">
                  {challenges.map((challenge, index) => (
                    <DecisionStory
                      key={challenge.title}
                      challenge={challenge}
                      index={index}
                    />
                  ))}
                </div>
              </section>

              <section id="validation" className="mt-14 scroll-mt-24 border-t border-[#dfe3e8] pt-12">
                <SectionTitle
                  number="04"
                  title="검증과 한계"
                  description="확인한 결과와 아직 일반화하지 않은 범위를 분리해 기록했습니다."
                />

                <div className="mt-7 grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111318]">검증</h3>
                    <ul className="mt-4 space-y-4">
                      {project.validation.map((item) => (
                        <li
                          key={item}
                          className="border-t border-[#dfe3e8] pt-4 text-[14px] leading-[1.75] text-[#5f6670]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111318]">한계</h3>
                    <ul className="mt-4 space-y-4">
                      {project.limitations.map((item) => (
                        <li
                          key={item}
                          className="border-t border-[#dfe3e8] pt-4 text-[14px] leading-[1.75] text-[#5f6670]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="evidence" className="mt-14 scroll-mt-24 border-t border-[#dfe3e8] pt-12">
                <SectionTitle
                  number="05"
                  title="확인 가능한 자료"
                  description="프로젝트 기록과 코드에서 설계 판단 및 검증 근거를 확인할 수 있습니다."
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
