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
            <div className="pb-5">
              <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.035em] text-[#111318] sm:text-[38px]">
                프로젝트
              </h2>
            </div>

            <div className="mt-5 grid gap-0">
              {featuredProjects.map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
              {secondaryProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  )
}
