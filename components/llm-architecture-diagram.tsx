import { ExternalLink } from "lucide-react"

export function LlmArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <figure className={`architecture-block ${className}`} aria-label="LLM 생성 코드 실행 검증 및 피드백 구조도">
      <div className="architecture-frame overflow-hidden rounded-[18px] border border-[#e0e5ea] bg-[#fbfbfa]">
        <img
          src="/diagrams/llm-architecture.svg"
          alt="자연어 요구사항을 정형화해 C/C++ 코드를 생성하고 컴파일 실행 및 Sanitizer 결과를 코드 리뷰에 전달해 수정 피드백과 재생성으로 이어지며 외부 지표로 평가하는 구조도"
          className="architecture-svg block h-auto w-full"
        />
      </div>

      <div className="architecture-screen-actions mt-3 flex justify-end">
        <a
          href="/diagrams/llm-architecture.svg"
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
