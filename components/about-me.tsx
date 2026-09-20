import { Container } from "./primitives"
import { profile } from "@/data/experience"

export function AboutMe() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-16 border-t border-[#dfe3e8] bg-[#fbfbfa] py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-20">
          <div>
            <h2 id="about-heading" className="text-[30px] font-semibold leading-tight tracking-[-0.035em] text-[#111318] sm:text-[34px]">
              About Me
            </h2>
            <p className="mt-4 text-[14px] font-medium text-[#68707a]">
              {profile.name} · {profile.role}
            </p>
          </div>

          <div className="max-w-[720px]">
            <p className="text-[22px] font-semibold leading-[1.5] tracking-[-0.025em] text-[#111318] sm:text-[26px]">
              기능을 구현한 뒤에도, 어떤 상황에서 문제가 생길지 묻습니다.
            </p>
            <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-[#59616b] sm:text-[16px]">
              <p>
                Java와 Spring Boot를 중심으로 백엔드를 개발합니다. 송금 시스템과 AI 서비스를 만들며,
                동시 요청에서도 데이터가 일관되게 처리되고 사용자가 오래 기다리지 않는 구조에 관심을 가져왔습니다.
              </p>
              <p>
                문제가 생기면 로그와 실행 흐름을 따라 원인을 좁힙니다. 바꾼 구조가 실제로 효과가 있는지는
                테스트와 측정 결과로 확인하고, 선택한 이유와 남은 한계를 함께 기록합니다.
              </p>
              <p>
                협업에서는 데이터 형식과 작업 범위를 먼저 맞춥니다. 서로 다른 의견이 나오면
                구현 가능성과 사용 목적을 함께 살피고, 합의한 기준을 문서로 남깁니다.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
