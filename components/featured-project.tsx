import Link from "next/link"
import type { Project } from "@/data/projects"
import { ArchitectureDiagram } from "./architecture-diagram"
import { Tag } from "./primitives"

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[13px] font-medium text-accent">{project.number}</span>
          <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            {project.category}
          </span>
        </div>

        <h3 className="mt-4 text-balance text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[42px] lg:text-[46px]">
          {project.title}
        </h3>

        <div className="mt-6 border-l-2 border-accent pl-4">
          <div className="text-balance text-[24px] font-bold leading-tight tracking-tight sm:text-[28px]">
            {project.outcome}
          </div>
          {project.outcomeNote ? (
            <div className="mt-1.5 text-[15px] leading-relaxed text-secondary">
              {project.outcomeNote}
            </div>
          ) : null}
          {project.outcomeLabel ? (
            <div className="mt-1.5 text-[15px] leading-relaxed text-secondary">
              {project.outcomeLabel}
            </div>
          ) : null}
        </div>

        <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-secondary">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={`/projects/${project.slug}/`}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
          >
            Read case study
            <span aria-hidden>→</span>
          </Link>
          {project.repository ? (
            <a
              href={project.repository.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 font-mono text-[13px] text-muted underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
            >
              Repository ↗
            </a>
          ) : null}
        </div>
      </div>

      <div className="lg:col-span-5">
        <ArchitectureDiagram flow={project.architecture.flow} caption={project.architecture.caption} />
      </div>
    </article>
  )
}
