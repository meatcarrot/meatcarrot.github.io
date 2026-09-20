import { Container } from "./primitives"
import { experience, profile } from "@/data/experience"

const skills = [
  { title: "Backend", items: ["Java", "Spring Boot", "Python", "Django"] },
  { title: "Data", items: ["MySQL", "MongoDB", "Redis"] },
  { title: "Infrastructure", items: ["Kafka", "Docker", "Nginx"] },
  { title: "AI", items: ["LLM", "RAG", "Semantic Cache"] },
]

export function Hero() {
  return (
    <>
      <section id="about" aria-labelledby="intro-heading" className="scroll-mt-20 bg-[#fbfbfa] text-[#111318]">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-16">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold tracking-[0.12em] text-[#2563eb]">ABOUT ME</p>
              <h1 id="intro-heading" className="mt-5 max-w-[720px] text-balance text-[32px] font-semibold leading-[1.4] tracking-[-0.035em] sm:text-[40px]">
                실제 쓰임을 생각하는 개발자 이희연입니다.
              </h1>
              <ul className="mt-7 space-y-4 text-[16px] leading-[1.85] text-[#59616b]">
                <li>기능 하나를 추가할 때도 <strong className="font-semibold text-[#202733]">사용하는 사람에게 도움이 되는지</strong> 생각합니다.</li>
                <li><strong className="font-semibold text-[#202733]">AI 활용만큼 신뢰성과 실제 쓰임도</strong> 중요하게 생각합니다.</li>
                <li>모르는 것은 질문하고 배우며, <strong className="font-semibold text-[#202733]">새로운 지식과 방법에 열려 있습니다.</strong></li>
                <li>막연히 이해했다고 넘기지 않고, <strong className="font-semibold text-[#202733]">데이터와 로그로 확인합니다.</strong></li>
              </ul>
              <dl className="mt-9 grid gap-x-8 gap-y-5 border-t border-[#dfe3e8] pt-6 sm:grid-cols-2">
                <div><dt className="text-[13px] text-[#68707a]">출생일</dt><dd className="mt-1 text-[15px] font-medium">{profile.birthDate}</dd></div>
                <div><dt className="text-[13px] text-[#68707a]">주소</dt><dd className="mt-1 text-[15px] font-medium">{profile.address}</dd></div>
                <div><dt className="text-[13px] text-[#68707a]">전화번호</dt><dd className="mt-1 text-[15px] font-medium"><a href={`tel:${profile.phone.replaceAll("-", "")}`} className="hover:underline">{profile.phone}</a></dd></div>
                <div><dt className="text-[13px] text-[#68707a]">이메일</dt><dd className="mt-1 break-all text-[15px] font-medium"><a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a></dd></div>
              </dl>
              <div className="mt-7 flex flex-wrap gap-6 text-[14px] font-semibold text-[#2563eb]">
                <a href={profile.github} target="_blank" rel="noreferrer noopener" className="hover:underline">GitHub ↗</a>
                <a href={profile.velog} target="_blank" rel="noreferrer noopener" className="hover:underline">Velog ↗</a>
              </div>
            </div>
            <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 border-t border-[#dfe3e8] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <h2 id="experience-heading" className="text-[14px] font-semibold tracking-[0.12em] text-[#2563eb]">EXPERIENCE</h2>
              <ol className="mt-8 border-l border-[#dfe3e8]">
                {experience.map((item) => (
                  <li key={`${item.year}-${item.title}`} className="relative pb-9 pl-6 last:pb-0">
                    <span aria-hidden="true" className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-[#2563eb]" />
                    <p className="text-[14px] font-medium text-[#68707a]">{item.year}</p>
                    <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.7] text-[#59616b]">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </Container>
      </section>
      <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20 border-t border-[#dfe3e8] bg-white">
        <Container className="py-9 sm:py-12">
          <h2 id="skills-heading" className="text-[14px] font-semibold tracking-[0.12em] text-[#2563eb]">SKILLS</h2>
          <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.title}>
                <h3 className="mb-3 text-[15px] font-semibold text-[#303844]">{group.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((skill) => <li key={skill} className="tech-tag">{skill}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
