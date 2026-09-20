import { ExperienceTimeline } from "./experience-timeline"
import { Container } from "./primitives"
import { profile } from "@/data/experience"

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
                실제 쓰임을 생각하는 개발자 이희연입니다
              </h1>
              <ul className="mt-7 space-y-4 text-[16px] leading-[1.85] text-[#59616b]">
                <li>기능 하나를 추가할 때도 <strong className="font-semibold text-[#202733]">사용하는 사람에게 도움이 되는지</strong> 생각합니다.</li>
                <li><strong className="font-semibold text-[#202733]">AI 활용만큼 신뢰성과 실제 쓰임도</strong> 중요하게 생각합니다.</li>
                <li>모르는 것은 질문하고 배우며, <strong className="font-semibold text-[#202733]">새로운 지식과 방법에 열려 있습니다.</strong></li>
                <li>막연히 이해했다고 넘기지 않고, <strong className="font-semibold text-[#202733]">데이터와 로그로 확인합니다.</strong></li>
              </ul>
            </div>
            <aside aria-label="기본 정보와 연락처" className="border-t border-[#dfe3e8] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
              <dl className="grid gap-5">
                <div><dt className="text-[13px] text-[#68707a]">출생일</dt><dd className="mt-1 text-[15px] font-medium">{profile.birthDate}</dd></div>
                <div><dt className="text-[13px] text-[#68707a]">주소</dt><dd className="mt-1 text-[15px] font-medium">{profile.address}</dd></div>
                <div><dt className="text-[13px] text-[#68707a]">전화번호</dt><dd className="mt-1 text-[15px] font-medium"><a href={`tel:${profile.phone.replaceAll("-", "")}`} className="hover:underline">{profile.phone}</a></dd></div>
                <div><dt className="text-[13px] text-[#68707a]">이메일</dt><dd className="mt-1 break-all text-[15px] font-medium"><a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a></dd></div>
              </dl>
              <div className="mt-7 flex flex-wrap gap-6 text-[14px] font-semibold text-[#2563eb]">
                <a href={profile.github} target="_blank" rel="noreferrer noopener" className="hover:underline">GitHub ↗</a>
                <a href={profile.velog} target="_blank" rel="noreferrer noopener" className="hover:underline">Velog ↗</a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
      <ExperienceTimeline />
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
