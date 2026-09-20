import { ExternalLink } from "lucide-react"

export function BankArchitectureDiagram({ className = "" }: { className?: string }) {
  return (
    <figure className={`architecture-block ${className}`} aria-label="Kafka 기반 송금 시스템 구조도">
      <div className="architecture-frame overflow-hidden rounded-[18px] border border-[#e0e5ea] bg-[#fbfbfa]">
        <img
          src="/diagrams/bank-architecture.svg"
          alt="송금 요청을 TransferLedger와 Outbox에 같은 트랜잭션으로 저장하고, 커밋 이후 Kafka로 발행한 뒤 소비자가 낙관적 락 재시도를 거쳐 계좌와 원장을 반영하는 구조도"
          className="architecture-svg block h-auto w-full"
        />
      </div>

      <div className="architecture-screen-actions mt-3 flex justify-end">
        <a
          href="/diagrams/bank-architecture.svg"
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
