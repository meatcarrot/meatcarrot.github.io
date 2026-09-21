import { ExternalLink } from "lucide-react"

export function AirbotArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <figure className={`architecture-block ${className}`} aria-label="인천공항 AI 챗봇 Semantic Cache 및 LangGraph 처리 구조도">
      <div className="architecture-frame overflow-hidden rounded-[18px] border border-[#e0e5ea] bg-[#fbfbfa]">
        <img
          src="/diagrams/airbot-architecture.svg"
          alt="사용자 질문을 임베딩해 Semantic Cache를 먼저 조회하고, 캐시 적중 시 즉시 응답하며 미적중 시 LangGraph와 RAG를 거쳐 응답을 생성한 뒤 비동기로 캐시에 저장하는 구조도"
          className="architecture-svg block h-auto w-full"
        />
      </div>

      <div className="architecture-screen-actions mt-3 flex justify-end">
        <a
          href="/diagrams/airbot-architecture.svg"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#5f6975] underline-offset-4 hover:text-[#2563eb] hover:underline"
        >
          크게 보기
          <ExternalLink size={12} />
        </a>
      </div>
    </figure>
  )
}
