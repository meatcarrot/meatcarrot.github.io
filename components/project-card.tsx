import Link from "next/link"
import type { Project } from "@/data/projects"
import { ProjectOverviewDiagram } from "./project-overview-diagram"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-5 border-b border-[#dfe3e8] py-5 lg:grid-cols-12 lg:items-center lg:gap-6">
      <div className="min-w-0 lg:col-span-4">
        <div className="text-[11px] font-medium text-[#737b86]">{project.category}</div>
        <h3 className="mt-1.5 text-[18px] font-semibold leading-tight tracking-[-0.02em] text-[#111318] sm:text-[20px]">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[450px] text-[12px] leading-[1.65] text-[#68707a] sm:text-[13px]">
          {project.summary}
        </p>
      </div>

      <div className="min-w-0 lg:col-span-5">
        <ProjectOverviewDiagram project={project.slug} variant="compact" />
      </div>

      <div className="min-w-0 lg:col-span-3 lg:text-right">
        <div className="text-[15px] font-semibold tracking-[-0.01em] text-[#2a3038] sm:text-[16px]">
          {project.outcome}
        </div>
        {project.outcomeNote ? (
          <div className="mt-1 text-[11px] leading-relaxed text-[#737b86]">
            {project.outcomeNote}
          </div>
        ) : null}
        {project.secondaryMetric ? (
          <div className="mt-1.5 text-[11px] font-medium text-[#2563eb]">
            {project.secondaryMetricLabel
              ? `${project.secondaryMetricLabel} ${project.secondaryMetric}`
              : project.secondaryMetric}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-1.5 lg:justify-end">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md border border-[#dde3e8] bg-[#f0f3f6] px-2 py-1 text-[11px] font-medium leading-none text-[#4f5964]"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}/`}
          className="mt-4 inline-flex text-[12px] font-semibold text-[#626a75] underline-offset-4 hover:text-[#111318] hover:underline"
        >
          상세 보기 →
        </Link>
      </div>
    </article>
  )
}
