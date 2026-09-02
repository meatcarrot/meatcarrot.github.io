import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Container, Tag } from "@/components/primitives"
import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { EvidenceLink } from "@/components/blocks"
import {
  EngineeringChallenge,
  getProjectChallenges,
} from "@/components/challenge-block"
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
  { id: "problem", label: "문제와 범위" },
  { id: "architecture", label: "구조" },
  { id: "challenges", label: "문제 해결" },
  { id: "results", label: "결과" },
  { id: "evidence", label: "근거" },
]

function SectionHeading({
  overline,
  title,
}: {
  overline: string
  title: string
}) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
        {overline}
      </div>
      <h2 className="mt-2 text-[28px] leading-tight tracking-[-0.025em] text-foreground">
        {title}
      </h2>
    </div>
  )
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-[13px] leading-relaxed text-foreground">{value}</dd>
    </div>
  )
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const challenges = getProjectChallenges(project)

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-border">
          <Container className="py-12 sm:py-14 lg:py-16">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              <ArrowLeft size={14} strokeWidth={1.8} />
              프로젝트로 돌아가기
            </Link>

            <div className="mt-7 flex items-center gap-3">
              <span className="font-mono text-[11px] font-medium text-accent">
                {project.number}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-muted">
                {project.category}
              </span>
            </div>

            <h1 className="mt-4 max-w-[880px] text-balance text-[38px] leading-[1.05] tracking-[-0.04em] sm:text-[46px] lg:text-[52px]">
              {project.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <div className="text-[22px] font-[720] tracking-[-0.025em] text-foreground sm:text-[26px]">
                {project.outcome}
              </div>
              {project.outcomeNote ? (
                <div className="text-[14px] text-secondary">{project.outcomeNote}</div>
              ) : null}
              {project.outcomeLabel ? (
                <div className="text-[14px] text-secondary">{project.outcomeLabel}</div>
              ) : null}
            </div>

            <p className="mt-5 max-w-[780px] text-[16px] leading-[1.75] text-secondary">
              {project.summary}
            </p>

            <div className="mt-7 grid gap-5 border-y border-border py-5 sm:grid-cols-3">
              <MetaField label="역할" value={project.role} />
              <MetaField label="기간" value={project.period} />
              <MetaField label="팀" value={project.team} />
            </div>

            <div className="mt-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                담당 역할
              </div>
              <ul className="mt-2 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {project.myRole.map((item) => (
                  <li key={item} className="text-[13px] leading-[1.65] text-secondary">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}

              {project.repository ? (
                <a
                  href={project.repository.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ml-1 inline-flex items-center gap-1 text-[12px] font-medium text-accent underline-offset-4 hover:underline"
                >
                  GitHub <ExternalLink size={12} strokeWidth={1.7} />
                </a>
              ) : null}
            </div>
          </Container>
        </section>

        <Container className="py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <aside className="hidden lg:col-span-3 lg:block">
              <nav className="sticky top-24" aria-label="페이지 내 이동">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                  프로젝트 상세
                </div>
                <ul className="mt-4 border-l border-border">
                  {navSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[12px] text-muted transition-colors hover:border-accent hover:text-foreground"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="flex flex-col gap-12 lg:col-span-9">
              <section id="problem" className="scroll-mt-24">
                <SectionHeading overline="문제와 범위" title="핵심 문제" />

                <p className="mt-5 max-w-[780px] text-[16px] leading-[1.8] text-secondary">
                  {project.overview}
                </p>

                <ul className="mt-5 grid gap-3">
                  {project.problem.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-t border-border pt-3 text-[14px] leading-[1.7] text-secondary"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="architecture" className="scroll-mt-24 border-t border-border pt-10">
                <SectionHeading overline="구조" title="핵심 구조" />
                <ArchitectureDiagram
                  flow={project.architecture.flow}
                  caption={project.architecture.caption}
                  className="mt-6 max-w-[620px]"
                />
              </section>

              <section id="challenges" className="scroll-mt-24 border-t border-border pt-10">
                <SectionHeading
                  overline="문제 해결"
                  title="문제 해결"
                />

                <p className="mt-4 max-w-[680px] text-[14px] leading-[1.7] text-secondary">
                  설계 판단과 트러블슈팅을 나누지 않고, 문제를 확인하고 해결책을 선택해 검증한 흐름으로 정리했습니다.
                </p>

                <div className="mt-7 flex flex-col gap-9">
                  {challenges.map((challenge, index) => (
                    <EngineeringChallenge
                      key={challenge.title}
                      challenge={challenge}
                      index={index}
                    />
                  ))}
                </div>
              </section>

              <section id="results" className="scroll-mt-24 border-t border-border pt-10">
                <SectionHeading overline="결과" title="검증과 한계" />

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-foreground">
                      <CheckCircle2 size={16} strokeWidth={1.8} className="text-accent" />
                      검증
                    </div>
                    <ul className="mt-3 space-y-3">
                      {project.validation.map((item) => (
                        <li key={item} className="text-[14px] leading-[1.7] text-secondary">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-subtle/70 p-5">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-foreground">
                      <AlertTriangle size={16} strokeWidth={1.8} className="text-muted" />
                      한계
                    </div>
                    <ul className="mt-3 space-y-3">
                      {project.limitations.map((item) => (
                        <li key={item} className="text-[13px] leading-[1.7] text-secondary">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="evidence" className="scroll-mt-24 border-t border-border pt-10">
                <SectionHeading overline="근거" title="확인 가능한 자료" />

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {project.evidence.map((item, index) => (
                    <EvidenceLink key={`${item.label}-${index}`} item={item} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
