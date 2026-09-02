import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Container } from "@/components/primitives"
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
      <main id="main-content">
        <Hero />

        <section
          id="projects"
          className="scroll-mt-16 border-t border-[#dfe3e8] bg-[#f7f8fa]"
        >
          <Container className="py-16 sm:py-20 lg:py-24">
            <div className="pb-8">
              <div>
                <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.035em] text-[#111318] sm:text-[38px]">
                  프로젝트
                </h2>
                <p className="mt-3 max-w-[620px] text-[15px] leading-[1.75] text-[#616873] sm:text-[16px]">
                  시스템의 실패 조건을 정의하고, 구조를 바꾸고, 결과를 검증한 경험입니다.
                </p>
              </div>
            </div>

            <div>
              {featuredProjects.map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
            </div>

            <div className="mt-5 grid gap-0 divide-y divide-[#dfe3e8]">
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
