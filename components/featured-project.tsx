import Link from "next/link"
import {
  Database,
  MailCheck,
  Network,
  UserCheck,
  BrainCircuit,
  Gauge,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import type { Project } from "@/data/projects"
import { Tag } from "./primitives"

function FlowStep({
  icon: Icon,
  label,
  detail,
  tone = "blue",
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  label: string
  detail?: string
  tone?: "blue" | "green" | "amber" | "violet"
}) {
  const tones = {
    blue: "bg-[#e9f1fb] text-[#2e5f95]",
    green: "bg-[#eaf7ee] text-[#2f8f55]",
    amber: "bg-[#fff4dc] text-[#9a6b14]",
    violet: "bg-[#f1ecfb] text-[#7355b7]",
  }

  return (
    <div className="min-w-0 text-center">
      <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div className="mt-2 text-[12px] font-semibold leading-tight text-foreground">{label}</div>
      {detail ? <div className="mt-1 text-[10px] leading-tight text-muted">{detail}</div> : null}
    </div>
  )
}

function BankVisual() {
  return (
    <div className="mt-6 rounded-xl border border-border bg-subtle/35 p-5">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-2">
        <FlowStep icon={Database} label="DB" detail="Transaction" tone="blue" />
        <ArrowRight className="mt-4 text-muted" size={16} />
        <FlowStep icon={MailCheck} label="Outbox" tone="green" />
        <ArrowRight className="mt-4 text-muted" size={16} />
        <FlowStep icon={Network} label="Kafka" tone="amber" />
        <ArrowRight className="mt-4 text-muted" size={16} />
        <FlowStep icon={UserCheck} label="Consumer" detail="idempotent" tone="violet" />
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9f1fb] text-[#2e5f95]">✓</span>
        <div>
          <div className="text-[13px] font-semibold text-foreground">100건 동시 송금 테스트</div>
          <div className="mt-0.5 text-[11px] text-muted">최종 잔액 정합성 검증</div>
        </div>
      </div>
    </div>
  )
}

function AirBotVisual() {
  const steps = [
    {
      icon: BrainCircuit,
      title: "Repeated LangGraph",
      detail: "3–4 LLM calls",
      metric: "30–40s",
      tone: "bg-[#e9f1fb] text-[#2e5f95]",
      metricClass: "text-[#2e5f95]",
    },
    {
      icon: Database,
      title: "Semantic Cache",
      detail: "MongoDB Vector Search · similarity ≥ 0.97",
      metric: "",
      tone: "bg-[#eaf7ee] text-[#2f8f55]",
      metricClass: "",
    },
    {
      icon: Gauge,
      title: "Cache hit",
      detail: "similar-query response · project testing",
      metric: "<1s*",
      tone: "bg-[#fff4dc] text-[#9a6b14]",
      metricClass: "text-[#2f8f55]",
    },
  ]

  return (
    <div className="mt-6 rounded-xl border border-border bg-subtle/35 p-5">
      <div className="space-y-0">
        {steps.map((step, index) => {
          const Icon = step.icon

          return (
            <div key={step.title}>
              <div className="grid grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${step.tone}`}>
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-foreground">{step.title}</div>
                  <div className="mt-0.5 break-words text-[10px] leading-[1.45] text-muted">
                    {step.detail}
                  </div>
                </div>

                {step.metric ? (
                  <div className={`whitespace-nowrap text-[18px] font-[720] tracking-[-0.025em] ${step.metricClass}`}>
                    {step.metric}
                  </div>
                ) : null}
              </div>

              {index < steps.length - 1 ? (
                <div className="ml-[21px] h-5 border-l border-dashed border-border" aria-hidden />
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="mt-4 border-t border-border pt-3 text-[10px] text-muted">
        cache miss → 기존 LangGraph / RAG 경로 실행
      </div>
    </div>
  )
}

export function FeaturedProject({ project }: { project: Project }) {
  const isBank = project.slug === "bank"

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-[0_14px_36px_rgba(24,24,27,0.03)] sm:p-8">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] font-medium text-accent">{project.number}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">
          {project.category}
        </span>
      </div>

      <h3 className="mt-4 text-[30px] leading-[1.05] tracking-[-0.035em]">{project.title}</h3>

      <div className="mt-2 text-[12px] font-medium text-muted">
        {isBank ? "개인 프로젝트" : "AI 서버 · 6인 팀"} · {project.period}
      </div>

      {isBank ? <BankVisual /> : <AirBotVisual />}

      <p className="mt-5 text-[14px] leading-[1.7] text-secondary">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
        {project.technologies.map((tech) => <Tag key={tech}>{tech}</Tag>)}
      </div>

      <div className="mt-auto flex items-center gap-6 pt-7">
        <Link
          href={`/projects/${project.slug}/`}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          상세 보기 <ArrowRight size={15} strokeWidth={1.8} />
        </Link>

        {project.repository ? (
          <a
            href={project.repository.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            GitHub <ExternalLink size={12} strokeWidth={1.7} />
          </a>
        ) : null}
      </div>
    </article>
  )
}
