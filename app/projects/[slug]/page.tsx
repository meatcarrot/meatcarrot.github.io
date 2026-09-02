import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BankProjectDetail } from "@/components/bank-project-detail"
import { ProjectCaseStudyDetail } from "@/components/project-case-study-detail"
import { projects, getProject } from "@/data/projects"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return { title: "Project not found" }
  }

  return {
    title: `${project.title} — Lee Heeyeon`,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  if (project.slug === "bank") {
    return <BankProjectDetail project={project} />
  }

  return <ProjectCaseStudyDetail project={project} />
}
