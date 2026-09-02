import type React from "react"

export function DetailSection({
  id,
  overline,
  title,
  children,
}: {
  id: string
  overline: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-10">
      <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">{overline}</span>
      <h2 className="mt-2 text-[24px] font-bold tracking-tight sm:text-[28px]">{title}</h2>
      <div className="mt-6 max-w-[760px]">{children}</div>
    </section>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-secondary">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
