import Link from "next/link"
import type { Project } from "@/data/projects"
import { ProjectFlowDiagram } from "./project-flow-diagram"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-7 py-8 lg:grid-cols-12 lg:items-center lg:gap-8">
      <div className="min-w-0 lg:col-span-4">
        <div className="text-[12px] font-medium text-[#68717c]">{project.category}</div>
        <h3 className="mt-2 text-[21px] font-semibold leading-tight tracking-[-0.025em] text-[#111318] sm:text-[23px]">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[470px] text-[13px] leading-[1.7] text-[#626973] sm:text-[14px]">
          {project.summary}
        </p>
      </div>

      <div className="min-w-0 lg:col-span-5">
        <ProjectFlowDiagram project={project.slug} variant="compact" />
      </div>

      <div className="min-w-0 lg:col-span-3 lg:text-right">
        <div className="text-[17px] font-semibold tracking-[-0.015em] text-[#2a3038]">
          {project.outcome}
        </div>
        {project.outcomeNote ? (
          <div className="mt-1 text-[12px] leading-relaxed text-[#69727d]">
            {project.outcomeNote}
          </div>
        ) : null}
        {project.secondaryMetric ? (
          <div className="mt-2 text-[12px] font-medium text-[#2563eb]">
            {project.secondaryMetricLabel
              ? `${project.secondaryMetricLabel} ${project.secondaryMetric}`
              : project.secondaryMetric}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-1.5 lg:justify-end">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}/`}
          className="mt-5 inline-flex text-[13px] font-semibold text-[#5d6470] underline-offset-4 hover:text-[#111318] hover:underline"
        >
          상세 보기 →
        </Link>
      </div>
    </article>
  )
}
