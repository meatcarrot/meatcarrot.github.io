import Link from "next/link"
import { Container } from "./primitives"
import { profile } from "@/data/experience"
import { ProjectFlowDiagram } from "./project-flow-diagram"

function SelectedCaseTrace() {
  return (
    <div className="border-t border-[#d7dce2] pt-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[13px] font-medium tracking-[0.06em] text-[#59616b]">
            대표 사례
          </div>
          <div className="mt-1 text-[15px] font-semibold text-[#111318]">
            Kafka 기반 송금 시스템
          </div>
        </div>
        <Link
          href="/projects/bank/"
          className="text-[13px] font-semibold text-[#2563eb] underline-offset-4 hover:underline"
        >
          상세 보기 →
        </Link>
      </div>

      <ProjectFlowDiagram project="bank" variant="hero" className="mt-2" />

      <div className="mt-2 grid grid-cols-2 gap-5 border-t border-[#dfe3e8] pt-4">
        <div>
          <div className="text-[19px] font-semibold tracking-[-0.02em] text-[#111318]">
            100건
          </div>
          <div className="mt-1 text-[13px] leading-relaxed text-[#59616b]">
            동시 송금 시나리오
          </div>
        </div>
        <div>
          <div className="text-[19px] font-semibold tracking-[-0.02em] text-[#111318]">
            정합성 검증
          </div>
          <div className="mt-1 text-[13px] leading-relaxed text-[#59616b]">
            최종 잔액 합계 확인
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="bg-[#fbfbfa] text-[#111318]">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <div className="mb-6 h-[2px] w-10 bg-[#2563eb]" aria-hidden />

            <h1 className="max-w-[720px] text-balance text-[44px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#111318] sm:text-[56px] lg:text-[64px]">
              믿고 쓸 수 있는
              <br />
              시스템을 만듭니다
            </h1>

            <p className="mt-7 max-w-[610px] text-[16px] leading-[1.8] text-[#5f6670] sm:text-[17px]">
              실제 사용 환경의 예외와 실패까지 고려해
              <br className="hidden sm:block" />
              정합성·성능·복구 가능성을 검증합니다.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/#projects"
                className="inline-flex min-h-10 items-center bg-[#111318] px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#2563eb]"
              >
                프로젝트 보기
              </Link>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[14px] font-semibold text-[#5f6670] underline-offset-4 transition-colors hover:text-[#111318] hover:underline"
              >
                GitHub ↗
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              <span className="tech-tag">Java</span>
              <span className="tech-tag">Spring Boot</span>
              <span className="tech-tag">Kafka</span>
              <span className="tech-tag">MySQL</span>
              <span className="tech-tag">AI Service</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SelectedCaseTrace />
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-[#dfe3e8] pt-5 sm:grid-cols-3 lg:mt-20">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group"
          >
            <div className="font-mono text-[13px] tracking-[0.1em] text-[#59616b]">GITHUB</div>
            <div className="mt-1 text-[14px] font-medium text-[#59616b] group-hover:text-[#111318]">
              github.com/meatcarrot ↗
            </div>
          </a>
          <a href={`mailto:${profile.email}`} className="group">
            <div className="font-mono text-[13px] tracking-[0.1em] text-[#59616b]">EMAIL</div>
            <div className="mt-1 text-[14px] font-medium text-[#59616b] group-hover:text-[#111318]">
              {profile.email}
            </div>
          </a>
          <a
            href={profile.velog}
            target="_blank"
            rel="noreferrer noopener"
            className="group"
          >
            <div className="font-mono text-[13px] tracking-[0.1em] text-[#59616b]">VELOG</div>
            <div className="mt-1 text-[14px] font-medium text-[#59616b] group-hover:text-[#111318]">
              velog.io/@ninguis555 ↗
            </div>
          </a>
        </div>
      </Container>
    </section>
  )
}
