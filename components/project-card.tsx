import Link from "next/link"
import type { Project } from "@/data/projects"
import { Tag } from "./primitives"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground sm:p-7">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[13px] font-medium text-accent">{project.number}</span>
        <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          {project.category}
        </span>
      </div>

      <h3 className="mt-3 text-balance text-[26px] font-bold leading-tight tracking-tight sm:text-[28px]">
        {project.title}
      </h3>

      <div className="mt-4 border-l-2 border-accent pl-3.5">
        <div className="text-[18px] font-bold leading-tight tracking-tight">{project.outcome}</div>
        {project.outcomeNote ? (
          <div className="mt-1 text-[14px] leading-relaxed text-secondary">{project.outcomeNote}</div>
        ) : null}
        {project.secondaryMetric ? (
          <div className="mt-1 font-mono text-[13px] text-muted">{project.secondaryMetric}</div>
        ) : null}
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-secondary">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
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
    </article>
  )
}
