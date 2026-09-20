export type ExperienceItem = {
  year: string
  month: string
  period: string
  title: string
  details: string[]
}

export const experience: ExperienceItem[] = [
  { year: "2024", month: "08", period: "2024.08–2024.12", title: "학부 종합설계", details: ["AI 생성 코드 실행 결과·오류 분석", "리뷰 모델 피드백을 통한 코드 개선"] },
  { year: "2025", month: "03", period: "2025.03–2025.09", title: "KT AIVLE School 7기", details: ["클라우드 기반 AI·웹 서비스 개발 교육", "인천공항 챗봇 AI 서버·데이터 처리 구현"] },
  { year: "2025", month: "05", period: "2025.05–2025.08", title: "날씨 빅데이터 콘테스트", details: ["부산 119 신고량 예측·기상 상황별 모델 분리", "본선 발표 · 부산소방재난본부장상"] },
  { year: "2026", month: "07", period: "2026.07–현재", title: "SSAFY 16기", details: ["Java 서비스 개발·알고리즘 심화 학습", "AI 모델링 교육"] },
]

export const profile = {
  name: "LEE HEEYEON",
  role: "Backend Developer",
  birthDate: "2000.03.08",
  address: "부산광역시 강서구 신호동",
  phone: "010-6881-3500",
  github: "https://github.com/meatcarrot",
  email: "ninguis555@gmail.com",
  velog: "https://velog.io/@ninguis555/posts",
}
