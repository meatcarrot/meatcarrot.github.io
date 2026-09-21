import { ProjectFlowDiagram } from "./project-flow-diagram"

const printDiagram: Record<string, { src: string; alt: string }> = {
  bank: {
    src: "/diagrams/home-bank.svg",
    alt: "송금 요청이 원장과 Outbox를 거쳐 Kafka와 멱등 소비자로 전달되는 간단 구조도",
  },
  airbot: {
    src: "/diagrams/home-airbot.svg",
    alt: "질문을 Semantic Cache에서 조회하고 적중 시 즉시 응답, 미적중 시 LangGraph와 RAG로 처리하는 간단 구조도",
  },
  weather: {
    src: "/diagrams/home-weather.svg",
    alt: "기상 및 119 데이터를 극단 상황으로 분류한 뒤 평상시와 재난시 회귀로 분기하는 간단 구조도",
  },
  "llm-qa": {
    src: "/diagrams/home-llm.svg",
    alt: "코드 생성 후 실행 오류를 분석하고 리뷰 피드백을 거쳐 코드를 개선하는 간단 구조도",
  },
}

export function ProjectOverviewDiagram({
  project,
  variant,
}: {
  project: string
  variant: "home" | "compact"
}) {
  const printable = printDiagram[project]

  return (
    <>
      <div className="project-diagram-screen">
        <ProjectFlowDiagram project={project} variant={variant} />
      </div>
      {printable ? (
        <img
          src={printable.src}
          alt={printable.alt}
          className="project-diagram-print"
        />
      ) : null}
    </>
  )
}
