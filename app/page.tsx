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

        <section className="py-24 sm:py-28 lg:py-32">
          <Container>
            <SectionHeading
              id="projects"
              overline="Selected Projects"
              title="Selected Projects"
              description="문제 정의, 기술적 의사결정, 그리고 그 결정이 실제로 동작했는지에 대한 검증을 중심으로 정리한 케이스 스터디입니다."
            />

            <div className="mt-14 flex flex-col gap-20 sm:gap-24">
              {featuredProjects.map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
            </div>

            <div className="mt-20 grid grid-cols-1 gap-6 sm:mt-24 md:grid-cols-2">
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
