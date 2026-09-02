import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Container, SectionHeading } from "@/components/primitives"
import { FeaturedProject } from "@/components/featured-project"
import { ProjectCard } from "@/components/project-card"
import { Approach } from "@/components/approach"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Footer } from "@/components/footer"
import { featuredProjects, secondaryProjects } from "@/data/projects"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="py-16 sm:py-20 lg:py-24">
          <Container>
            <SectionHeading
              id="projects"
              overline="주요 프로젝트"
              title="프로젝트"
              description="문제를 정의하고, 선택을 기록하고, 결과를 검증한 경험을 정리했습니다."
            />

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {featuredProjects.map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
              {secondaryProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>

        <Approach />
        <ExperienceTimeline />
      </main>
      <Footer />
    </>
  )
}
