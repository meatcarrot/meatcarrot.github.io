import Link from "next/link"
import type { Project } from "@/data/projects"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)_auto] sm:items-center sm:gap-8">
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-[#8a9098]">{project.category}</div>
        <h3 className="mt-2 text-[21px] font-semibold leading-tight tracking-[-0.025em] text-[#111318] sm:text-[23px]">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-[#626973]">
          {project.summary}
        </p>
      </div>

      <div className="min-w-0">
        <div className="text-[17px] font-semibold text-[#2a3038]">{project.outcome}</div>
        {project.outcomeNote ? (
          <div className="mt-1 text-[12px] text-[#8a9098]">{project.outcomeNote}</div>
        ) : null}
        {project.secondaryMetric ? (
          <div className="mt-2 text-[12px] font-medium text-[#2563eb]">
            {project.secondaryMetricLabel
              ? `${project.secondaryMetricLabel} ${project.secondaryMetric}`
              : project.secondaryMetric}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-[#9aa0a8]">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>

      <Link
        href={`/projects/${project.slug}/`}
        className="text-[13px] font-semibold text-[#5d6470] underline-offset-4 hover:text-[#111318] hover:underline sm:justify-self-end"
      >
        상세 보기 →
      </Link>
    </article>
  )
}
