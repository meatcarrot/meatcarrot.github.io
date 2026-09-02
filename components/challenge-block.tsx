import {
  AlertCircle,
  Search,
  Wrench,
  CheckCircle2,
  Scale,
  FileCode2,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Project } from "@/data/projects"

type Challenge = {
  title: string
  problem: string
  investigation?: string
  solution: string
  why?: string
  tradeOff?: string
  validation?: string
  evidence?: string
}

export function getProjectChallenges(project: Project): Challenge[] {
  if (project.slug === "bank") {
    const [outbox, concurrency, idempotency] = project.decisions
    const kafkaFailure = project.troubleshooting[0]

    return [
      {
        title: "DB–Kafka 정합성과 장애 복구",
        problem: outbox.context,
        investigation: kafkaFailure.investigation,
        solution: `${outbox.decision} ${kafkaFailure.change}`,
        why: outbox.why,
        tradeOff: outbox.tradeOff,
        validation: kafkaFailure.validation,
        evidence: outbox.evidence,
      },
      {
        title: "동시 송금 충돌",
        problem: concurrency.context,
        solution: concurrency.decision,
        why: concurrency.why,
        tradeOff: concurrency.tradeOff,
        validation: project.validation[0],
        evidence: concurrency.evidence,
      },
      {
        title: "중복 소비와 멱등성",
        problem: idempotency.context,
        solution: idempotency.decision,
        why: idempotency.why,
        tradeOff: idempotency.tradeOff,
      },
    ]
  }

  if (project.slug === "airbot") {
    const [cache, stateSeparation] = project.decisions
    const latency = project.troubleshooting[0]

    return [
      {
        title: "30–40초 응답 병목",
        problem: latency.problem,
        investigation: latency.investigation,
        solution: latency.change,
        why: cache.why,
        tradeOff: cache.tradeOff,
        validation: latency.validation,
        evidence: cache.evidence,
      },
      {
        title: "Semantic Cache와 세션 상태 분리",
        problem: stateSeparation.context,
        solution: stateSeparation.decision,
        why: stateSeparation.why,
        tradeOff: stateSeparation.tradeOff,
        validation: project.validation[1],
      },
    ]
  }

  if (project.slug === "weather") {
    const modeling = project.decisions[0]
    const leakage = project.troubleshooting[0]

    return [
      {
        title: "재난 상황의 다른 데이터 분포",
        problem: modeling.context,
        solution: modeling.decision,
        why: modeling.why,
        tradeOff: modeling.tradeOff,
        validation: `${project.validation[0]} ${project.validation[2]}`,
      },
      {
        title: "과도하게 좋은 초기 성능 지표",
        problem: leakage.problem,
        investigation: leakage.investigation,
        solution: leakage.change,
        validation: leakage.validation,
      },
    ]
  }

  const execution = project.decisions[0]
  const runtime = project.troubleshooting[0]

  return [
    {
      title: "정적 비교가 놓치는 런타임 오류",
      problem: runtime.problem,
      investigation: runtime.investigation,
      solution: execution.decision,
      why: execution.why,
      tradeOff: execution.tradeOff,
      validation: runtime.validation,
      evidence: execution.evidence,
    },
  ]
}

function ChallengeRow({
  icon: Icon,
  label,
  children,
  accent = false,
}: {
  icon: LucideIcon
  label: string
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <div className="grid grid-cols-[24px_92px_1fr] gap-3 py-3">
      <Icon
        size={16}
        strokeWidth={1.7}
        className={accent ? "mt-0.5 text-accent" : "mt-0.5 text-muted"}
      />
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </div>
      <div className={`text-[14px] leading-[1.7] ${accent ? "font-medium text-foreground" : "text-secondary"}`}>
        {children}
      </div>
    </div>
  )
}

export function EngineeringChallenge({
  challenge,
  index,
}: {
  challenge: Challenge
  index: number
}) {
  return (
    <article className="border-t border-border pt-6">
      <div className="flex items-start gap-4">
        <span className="font-mono text-[11px] font-medium text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-[22px] leading-tight tracking-[-0.02em] text-foreground">
          {challenge.title}
        </h3>
      </div>

      <div className="mt-4 divide-y divide-border/80">
        <ChallengeRow icon={AlertCircle} label="문제">
          {challenge.problem}
        </ChallengeRow>

        {challenge.investigation ? (
          <ChallengeRow icon={Search} label="확인">
            {challenge.investigation}
          </ChallengeRow>
        ) : null}

        <ChallengeRow icon={Wrench} label="해결" accent>
          {challenge.solution}
        </ChallengeRow>

        {challenge.why ? (
          <ChallengeRow icon={FileCode2} label="선택 이유">
            {challenge.why}
          </ChallengeRow>
        ) : null}

        {challenge.tradeOff ? (
          <ChallengeRow icon={Scale} label="트레이드오프">
            {challenge.tradeOff}
          </ChallengeRow>
        ) : null}

        {challenge.validation ? (
          <ChallengeRow icon={CheckCircle2} label="검증" accent>
            {challenge.validation}
          </ChallengeRow>
        ) : null}
      </div>

      {challenge.evidence ? (
        <div className="mt-3 pl-[128px] font-mono text-[11px] text-muted">
          근거 · {challenge.evidence}
        </div>
      ) : null}
    </article>
  )
}
