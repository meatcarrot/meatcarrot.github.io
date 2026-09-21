import { ExternalLink } from "lucide-react"

export function WeatherArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <figure className={`architecture-block ${className}`} aria-label="날씨 빅데이터 기반 119 신고량 예측 2-Stage 모델 구조도">
      <div className="architecture-frame overflow-hidden rounded-[18px] border border-[#e0e5ea] bg-[#fbfbfa]">
        <img
          src="/diagrams/weather-architecture.svg"
          alt="119 신고, 기상 관측 및 특보, 사고다발지역 데이터를 통합해 특징을 생성하고 극단 상황을 분류한 뒤 평상시와 재난시 회귀 모델로 분기해 119 신고량을 예측하는 구조도"
          className="architecture-svg block h-auto w-full"
        />
      </div>

      <div className="architecture-screen-actions mt-3 flex justify-end">
        <a
          href="/diagrams/weather-architecture.svg"
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
