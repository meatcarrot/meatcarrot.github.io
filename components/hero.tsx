import Image from "next/image"
import { BookOpen, Code2, Mail } from "lucide-react"
import { Container, Overline } from "./primitives"
import { profile } from "@/data/experience"

const contacts = [
  {
    label: "GitHub",
    value: "meatcarrot",
    href: profile.github,
    icon: Code2,
  },
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "Velog",
    value: "@ninguis555",
    href: profile.velog,
    icon: BookOpen,
  },
]

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="py-12 sm:py-14 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <Overline className="mb-5 block">Backend Developer</Overline>

            <h1 className="max-w-[760px] text-balance text-[42px] leading-[1.06] tracking-[-0.04em] sm:text-[54px] lg:text-[62px]">
              믿고 쓸 수 있는
              <br />
              시스템을 만듭니다
            </h1>

            <p className="mt-6 max-w-[660px] text-[16px] leading-[1.75] text-secondary sm:text-[17px]">
              실제 사용 환경의 예외와 실패까지 고려하며
              정합성·성능·복구 가능성을 검증합니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-medium text-muted">
              <span>#Java</span>
              <span>#SpringBoot</span>
              <span>#Kafka</span>
              <span>#MySQL</span>
              <span>#AIService</span>
            </div>

            <div className="mt-9 grid max-w-[760px] gap-4 border-t border-border pt-5 sm:grid-cols-3">
              {contacts.map((contact) => {
                const Icon = contact.icon

                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex min-w-0 items-start gap-3"
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-accent"
                    />
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold uppercase tracking-[0.10em] text-muted">
                        {contact.label}
                      </div>
                      <div className="mt-1 truncate text-[14px] font-medium text-foreground underline-offset-4 group-hover:text-accent group-hover:underline">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[310px] lg:col-span-4 lg:mx-0 lg:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-subtle">
              <Image
                src="/profile.jpg"
                alt="이희연 프로필 사진"
                fill
                priority
                sizes="(max-width: 1024px) 310px, 320px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
