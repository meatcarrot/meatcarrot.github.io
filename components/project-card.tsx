import Link from "next/link"
import {
  CloudSun,
  Code2,
  PlayCircle,
  ShieldCheck,
  MessageSquareText,
  ArrowRight,
} from "lucide-react"
import type { Project } from "@/data/projects"
import { Tag } from "./primitives"

function WeatherVisual() {
  return (
    <div className="mt-6 rounded-xl border border-border bg-subtle/35 p-5">
      <div className="grid grid-cols-[1fr_72px_1fr] items-center gap-3">
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center gap-2 text-[#2e5f95]">
            <CloudSun size={18} strokeWidth={1.8} />
            <span className="text-[11px] font-semibold">Weather + 119</span>
          </div>
          <div className="mt-2 text-[11px] leading-relaxed text-muted">시계열 입력 데이터</div>
        </div>

        <div className="flex flex-col items-center">
          <ArrowRight size={15} className="text-muted" />
          <div className="mt-2 rounded-lg bg-[#f1ecfb] px-2.5 py-2 text-center text-[11px] font-semibold text-[#7355b7]">
            Extreme?
          </div>
          <div className="mt-2 h-4 border-l border-border" />
          <div className="h-px w-12 bg-border" />
        </div>

        <div className="space-y-2">
          <div className="rounded-lg bg-[#eaf7ee] px-3 py-2.5">
            <div className="text-[11px] font-semibold text-[#2f8f55]">Normal Regressor</div>
            <div className="mt-0.5 text-[9px] text-muted">평상시 모델</div>
          </div>
          <div className="rounded-lg bg-[#fff4dc] px-3 py-2.5">
            <div className="text-[11px] font-semibold text-[#9a6b14]">Extreme Regressor</div>
            <div className="mt-0.5 text-[9px] text-muted">재난 모델</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-[12px]">
        <span className="font-semibold text-foreground">특별상</span>
        <span className="text-border">·</span>
        <span className="text-muted">최종 RMSE ≈ 0.9</span>
      </div>
    </div>
  )
}

function LLMVisual() {
  const steps = [
    { icon: Code2, label: "Generate", detail: "코드 생성", tone: "bg-[#e9f1fb] text-[#2e5f95]" },
    { icon: PlayCircle, label: "Execute", detail: "컴파일 · 실행", tone: "bg-[#eaf7ee] text-[#2f8f55]" },
    { icon: ShieldCheck, label: "Sanitizer", detail: "C++ Sanitizer", tone: "bg-[#fff4dc] text-[#9a6b14]" },
    { icon: MessageSquareText, label: "Feedback", detail: "검증 피드백", tone: "bg-[#f1ecfb] text-[#7355b7]" },
  ]

  return (
    <div className="mt-6 rounded-xl border border-border bg-subtle/35 p-5">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={step.label} className="contents">
              <div className="text-center">
                <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${step.tone}`}>
                  <Icon size={19} strokeWidth={1.8} />
                </div>
                <div className="mt-2 text-[12px] font-semibold text-foreground">{step.label}</div>
                <div className="mt-0.5 text-[9px] text-muted">{step.detail}</div>
              </div>
              {index < steps.length - 1 ? (
                <ArrowRight className="mt-4 text-muted" size={14} />
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="mt-4 border-t border-border pt-4 text-[12px] text-muted">
        실제 컴파일·실행 기반 QA 루프
      </div>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const isWeather = project.slug === "weather"

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 shadow-[0_14px_36px_rgba(24,24,27,0.03)] sm:p-8">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[12px] font-medium text-accent">{project.number}</span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.11em] text-muted">
          {project.category}
        </span>
      </div>

      <h3 className="mt-4 text-[28px] leading-[1.08] tracking-[-0.03em]">{project.title}</h3>

      <div className="mt-2 text-[13px] font-medium text-muted">
        {isWeather ? "모델링 · 팀 프로젝트" : "3인 학부 캡스톤"} · {project.period}
      </div>

      {isWeather ? <WeatherVisual /> : <LLMVisual />}

      <p className="mt-5 text-[14px] leading-[1.7] text-secondary">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
        {project.technologies.map((tech) => <Tag key={tech}>{tech}</Tag>)}
      </div>

      <div className="mt-auto pt-7">
        <Link
          href={`/projects/${project.slug}/`}
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          상세 보기 <ArrowRight size={15} strokeWidth={1.8} />
        </Link>
      </div>
    </article>
  )
}
