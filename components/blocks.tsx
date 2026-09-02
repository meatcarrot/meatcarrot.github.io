import type { DecisionBlock, TroubleshootingBlock, EvidenceLink as EvidenceLinkType } from "@/data/projects"

export function MetricBlock({
  value,
  label,
  note,
  size = "lg",
}: {
  value: string
  label?: string
  note?: string
  size?: "lg" | "md"
}) {
  return (
    <div>
      <div
        className={`text-balance font-bold leading-[1.05] tracking-tight text-foreground ${
          size === "lg" ? "text-[36px] sm:text-[40px] lg:text-[46px]" : "text-[28px] sm:text-[32px]"
        }`}
      >
        {value}
      </div>
      {note ? <div className="mt-2 text-[15px] leading-relaxed text-secondary">{note}</div> : null}
      {label ? (
        <div className="mt-2 font-mono text-[12px] uppercase tracking-[0.1em] text-muted">{label}</div>
      ) : null}
    </div>
  )
}

export function EvidenceLink({ item }: { item: EvidenceLinkType }) {
  if (!item.href) {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[13px] text-secondary">
        {item.label}
      </span>
    )
  }
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-1 font-mono text-[13px] text-secondary underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
    >
      {item.label}
      <span aria-hidden>↗</span>
    </a>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[110px_1fr] sm:gap-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:pt-0.5">
        {label}
      </dt>
      <dd className="text-[15px] leading-relaxed text-secondary">{children}</dd>
    </div>
  )
}

export function DecisionBlockView({ block }: { block: DecisionBlock }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
      <dl className="flex flex-col gap-3">
        <Field label="Context">{block.context}</Field>
        <Field label="Decision">
          <span className="text-foreground">{block.decision}</span>
        </Field>
        <Field label="Why">{block.why}</Field>
        <Field label="Trade-off">{block.tradeOff}</Field>
        {block.evidence ? (
          <Field label="Evidence">
            <span className="font-mono text-[13px] text-secondary">{block.evidence}</span>
          </Field>
        ) : null}
      </dl>
    </div>
  )
}

export function TroubleshootingBlockView({ block }: { block: TroubleshootingBlock }) {
  const rows: [string, string][] = [
    ["Problem", block.problem],
    ["Investigation", block.investigation],
    ["Change", block.change],
    ["Validation", block.validation],
  ]
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      {rows.map(([label, value], i) => (
        <div
          key={label}
          className={`grid grid-cols-1 gap-1 p-4 sm:grid-cols-[130px_1fr] sm:gap-4 sm:px-5 ${
            i < rows.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent sm:pt-0.5">
            {label}
          </div>
          <div className="text-[15px] leading-relaxed text-secondary">{value}</div>
        </div>
      ))}
    </div>
  )
}
