import type React from "react"

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1160px] px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  )
}

export function Overline({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-accent ${className}`}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  overline,
  title,
  description,
  id,
}: {
  overline?: string
  title: string
  description?: string
  id?: string
}) {
  return (
    <div id={id} className="scroll-mt-24">
      {overline ? <Overline className="mb-3 block">{overline}</Overline> : null}
      <h2 className="text-pretty text-[32px] font-bold leading-tight tracking-tight sm:text-[34px] lg:text-[36px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-[640px] text-[16px] leading-relaxed text-secondary">{description}</p>
      ) : null}
    </div>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[13px] text-muted">
      <span className="text-accent">#</span>{children}
    </span>
  )
}
