import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Container } from "@/components/primitives"
import { FeaturedProject } from "@/components/featured-project"
import { ProjectCard } from "@/components/project-card"
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
                  각 프로젝트에서 맡은 역할과 기술적 판단, 구현 결과를 정리했습니다.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="pb-5">
                <h3 className="inline-flex rounded-[14px] border border-[#d9e7fb] bg-[#eef5ff] px-5 py-3 text-[20px] font-semibold leading-none tracking-[-0.02em] text-[#2563eb] sm:text-[22px]">
                  주요 프로젝트
                </h3>
              </div>
              <div className="grid gap-0">
                {featuredProjects.map((project) => (
                  <FeaturedProject key={project.slug} project={project} />
                ))}
              </div>
            </div>

            <div className="mt-14">
              <div className="pb-5">
                <h3 className="inline-flex rounded-[14px] border border-[#e0e4e8] bg-[#f1f3f5] px-5 py-3 text-[20px] font-semibold leading-none tracking-[-0.02em] text-[#59616b] sm:text-[22px]">
                  추가 프로젝트
                </h3>
              </div>
              <div className="grid gap-0 divide-y divide-[#dfe3e8]">
                {secondaryProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  )
}
