import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, Tag } from "@/components/primitives"
import { ArchitectureDiagram } from "@/components/architecture-diagram"
import {
  DecisionBlockView,
  TroubleshootingBlockView,
  EvidenceLink,
} from "@/components/blocks"
import { DetailSection, BulletList } from "@/components/detail-section"
import { projects, getProject } from "@/data/projects"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Project not found" }
  return {
    title: `${project.title} — Lee Heeyeon`,
    description: project.summary,
  }
}

const navSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "role", label: "My Role" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Technical Decisions" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "validation", label: "Validation / Result" },
  { id: "limitations", label: "Limitations & Next" },
  { id: "evidence", label: "Evidence" },
]

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <>
      <Header />
      <main>
        {/* Project hero */}
        <section className="border-b border-border">
          <Container className="py-14 sm:py-16 lg:py-20">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              <span aria-hidden>←</span> Back to projects
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <span className="font-mono text-[13px] font-medium text-accent">{project.number}</span>
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
                {project.category}
              </span>
            </div>

            <h1 className="mt-4 text-balance text-[36px] font-bold leading-[1.1] tracking-tight sm:text-[44px] lg:text-[48px]">
              {project.title}
            </h1>

            <div className="mt-6 border-l-2 border-accent pl-4">
              <div className="text-balance text-[22px] font-bold leading-tight tracking-tight sm:text-[26px]">
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

            <p className="mt-6 max-w-[720px] text-[17px] leading-relaxed text-secondary">
              {project.summary}
            </p>

            {/* Inline meta (mobile-first, shown under hero) */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4 lg:hidden">
              <MetaField label="Role" value={project.role} />
              <MetaField label="Period" value={project.period} />
              <MetaField label="Team" value={project.team} />
              {project.repository ? (
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">Repo</dt>
                  <dd className="mt-1">
                    <a
                      href={project.repository.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[14px] text-accent underline-offset-4 hover:underline"
                    >
                      Repository ↗
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </Container>
        </section>

        {/* Body */}
        <Container className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Sticky sidebar (desktop) */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-24 flex flex-col gap-8">
                <nav aria-label="페이지 내 이동">
                  <ul className="flex flex-col gap-2 border-l border-border">
                    {navSections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="-ml-px block border-l border-transparent py-1 pl-4 text-[13px] text-muted transition-colors hover:border-accent hover:text-foreground"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <dl className="flex flex-col gap-4 border-t border-border pt-6">
                  <MetaField label="Role" value={project.role} />
                  <MetaField label="Period" value={project.period} />
                  <MetaField label="Team" value={project.team} />
                  {project.repository ? (
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                        Repo
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={project.repository.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-[14px] text-accent underline-offset-4 hover:underline"
                        >
                          Repository ↗
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col gap-14 lg:col-span-9">
              <section id="overview" className="scroll-mt-24">
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent">
                  Overview
                </span>
                <p className="mt-4 max-w-[760px] text-[17px] leading-relaxed text-secondary">
                  {project.overview}
                </p>
              </section>

              <DetailSection id="problem" overline="Problem" title="문제 정의">
                <BulletList items={project.problem} />
              </DetailSection>

              <DetailSection id="role" overline="My Role" title="담당 역할">
                <BulletList items={project.myRole} />
              </DetailSection>

              <DetailSection id="architecture" overline="Architecture" title="구조">
                <ArchitectureDiagram
                  flow={project.architecture.flow}
                  caption={project.architecture.caption}
                  className="max-w-[520px]"
                />
              </DetailSection>

              <DetailSection id="decisions" overline="Technical Decisions" title="기술적 의사결정">
                <div className="flex flex-col gap-5">
                  {project.decisions.map((d, i) => (
                    <DecisionBlockView key={i} block={d} />
                  ))}
                </div>
              </DetailSection>

              <DetailSection id="troubleshooting" overline="Troubleshooting" title="트러블슈팅">
                <div className="flex flex-col gap-5">
                  {project.troubleshooting.map((t, i) => (
                    <TroubleshootingBlockView key={i} block={t} />
                  ))}
                </div>
              </DetailSection>

              <DetailSection id="validation" overline="Validation / Result" title="검증과 결과">
                <BulletList items={project.validation} />
              </DetailSection>

              <DetailSection id="limitations" overline="Limitations & Next" title="한계와 다음 단계">
                <BulletList items={project.limitations} />
              </DetailSection>

              <DetailSection id="evidence" overline="Evidence" title="근거">
                <div className="flex flex-col gap-3">
                  {project.evidence.map((e, i) => (
                    <EvidenceLink key={i} item={e} />
                  ))}
                </div>
              </DetailSection>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{label}</dt>
      <dd className="mt-1 text-[14px] leading-relaxed text-foreground">{value}</dd>
    </div>
  )
}
