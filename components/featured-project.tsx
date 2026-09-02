import Link from "next/link"
import type { Project } from "@/data/projects"
import { ProjectFlowDiagram } from "./project-flow-diagram"

export function FeaturedProject({ project }: { project: Project }) {
  const isBank = project.slug === "bank"

  return (
    <article className="grid gap-8 border-b border-[#d9dee4] py-10 lg:grid-cols-12 lg:items-center lg:gap-8">
      <div className={isBank ? "lg:col-span-4" : "lg:col-span-5"}>
        <div className="text-[12px] font-medium text-[#7b828c]">{project.category}</div>

        <h3 className="mt-3 text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-[#111318] sm:text-[30px]">
          {project.title}
        </h3>

        <p className="mt-3 max-w-[440px] text-[14px] leading-[1.72] text-[#626973]">
          {project.summary}
        </p>
      </div>

      <div className={isBank ? "lg:col-span-6" : "lg:col-span-4"}>
        <ProjectFlowDiagram
          project={project.slug}
          variant={isBank ? "home" : "compact"}
        />
      </div>

      <div className={isBank ? "lg:col-span-2 lg:text-right" : "lg:col-span-3 lg:text-right"}>
        <div className="text-[21px] font-semibold tracking-[-0.02em] text-[#111318]">
          {project.outcome}
        </div>
        {project.outcomeNote ? (
          <div className="mt-1 text-[12px] leading-relaxed text-[#8a9098]">
            {project.outcomeNote}
          </div>
        ) : null}
        {project.outcomeLabel ? (
          <div className="mt-1 text-[12px] leading-relaxed text-[#8a9098]">
            {project.outcomeLabel}
          </div>
        ) : null}

        <div className="mt-5 hidden flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-[#989ea6] xl:flex xl:justify-end">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-5 lg:justify-end">
          <Link
            href={`/projects/${project.slug}/`}
            className="text-[13px] font-semibold text-[#3f4650] underline-offset-4 hover:text-[#111318] hover:underline"
          >
            상세 보기 →
          </Link>
          {project.repository ? (
            <a
              href={project.repository.href}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden text-[12px] font-medium text-[#8a9098] underline-offset-4 hover:text-[#5c6470] hover:underline xl:inline"
            >
              GitHub ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
