import type { ArchitectureNode } from "@/data/projects"

export function ArchitectureDiagram({
  flow,
  caption,
  className = "",
}: {
  flow: ArchitectureNode[]
  caption?: string
  className?: string
}) {
  return (
    <figure
      className={`rounded-lg border border-border bg-subtle/60 p-5 sm:p-6 ${className}`}
      aria-label="시스템 아키텍처 다이어그램"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          architecture
        </span>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>
      <ol className="flex flex-col gap-2">
        {flow.map((node, i) => (
          <li key={`${node.label}-${i}`} className="flex flex-col gap-2">
            <div
              className={`flex items-center justify-between gap-3 rounded-md border px-3.5 py-2.5 ${
                node.emphasis
                  ? "border-accent/40 bg-surface"
                  : "border-border bg-surface"
              }`}
            >
              <span
                className={`font-mono text-[14px] ${
                  node.emphasis ? "font-medium text-accent" : "text-foreground"
                }`}
              >
                {node.label}
              </span>
              {node.note ? (
                <span className="font-mono text-[12px] text-muted">{node.note}</span>
              ) : null}
            </div>
            {i < flow.length - 1 ? (
              <span aria-hidden className="ml-4 font-mono text-[13px] leading-none text-muted">
                ↓
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {caption ? (
        <figcaption className="mt-4 text-[15px] leading-[1.7] text-secondary">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
