import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Container } from "@/components/primitives"
import { FeaturedProject } from "@/components/featured-project"
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

            <div className="mt-5 grid gap-0 divide-y divide-[#dfe3e8]">
              {[...featuredProjects, ...secondaryProjects].map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  )
}
