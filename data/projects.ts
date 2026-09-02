export type DecisionBlock = {
  context: string
  decision: string
  why: string
  tradeOff: string
  evidence?: string
}

export type TroubleshootingBlock = {
  problem: string
  investigation: string
  change: string
  validation: string
}

export type EvidenceLink = {
  label: string
  href?: string
}

export type ArchitectureNode = {
  label: string
  emphasis?: boolean
  note?: string
}

export type Project = {
  slug: string
  number: string
  category: string
  title: string
  outcome: string
  outcomeLabel?: string
  outcomeNote?: string
  secondaryMetric?: string
  secondaryMetricLabel?: string
  summary: string
  description: string
  technologies: string[]
  featured: boolean
  role: string
  period: string
  team: string
  repository?: { label: string; href: string }
  architecture: {
    caption: string
    flow: ArchitectureNode[]
  }
  overview: string
  problem: string[]
  myRole: string[]
  decisions: DecisionBlock[]
  troubleshooting: TroubleshootingBlock[]
  validation: string[]
  limitations: string[]
  evidence: EvidenceLink[]
}

export const projects: Project[] = [
  {
    slug: "bank",
    number: "01",
    category: "백엔드 · 신뢰성",
    title: "Kafka 기반 송금 시스템",
    outcome: "100건 동시 송금",
    outcomeNote: "최종 잔액 정합성 검증",
    summary:
      "DB-Kafka 간 정합성, 중복 소비, 동시성 충돌을 Outbox·Optimistic Lock·멱등성으로 검증한 개인 프로젝트.",
    description:
      "단순 잔액 변경에서 출발해 정합성·복구 가능성·장애 대응을 처음부터 구조화한 금융 백엔드 학습 프로젝트입니다.",
    technologies: ["Java", "Spring Boot", "Kafka", "MySQL", "Docker"],
    featured: true,
    role: "개인 프로젝트 (1인)",
    period: "2026.01 – 2026.05",
    team: "개인 학습·고도화 프로젝트",
    repository: {
      label: "meatcarrot/bank-20260127 (version4)",
      href: "https://github.com/meatcarrot/bank-20260127/tree/version4",
    },
    architecture: {
      caption: "송금 요청이 원장과 Outbox에 함께 기록되고, Kafka를 거쳐 멱등 소비자가 계좌 원장을 갱신합니다.",
      flow: [
        { label: "Request" },
        { label: "Transfer Ledger + Outbox", emphasis: true },
        { label: "Kafka" },
        { label: "Consumer", note: "idempotent" },
        { label: "Account / Account Ledger", emphasis: true },
      ],
    },
    overview:
      "두 계좌의 잔액을 하나의 트랜잭션에서 변경하는 수준에서 시작했지만, 실제 서비스 관점에서는 DB 반영과 메시지 발행이 어긋나는 상황이 더 중요하다고 판단해 정합성과 복구 가능성을 중심으로 구조를 다시 설계했습니다.",
    problem: [
      "DB에는 송금 요청이 저장됐지만 Kafka 발행이 실패하면 요청이 유실될 수 있습니다.",
      "네트워크 재시도나 재처리 과정에서 같은 메시지가 중복 소비될 수 있습니다.",
      "같은 계좌에 동시 송금이 몰리면 갱신 손실과 한도 초과 인출이 발생할 수 있습니다.",
      "실패한 요청이 재시도 큐에 쌓이면 데드락과 이중 출금 가능성이 생깁니다.",
    ],
    myRole: [
      "도메인 모델과 원장(Ledger) 구조 설계 및 구현",
      "Outbox 패턴과 미발행 이벤트 재발행 스케줄러 구현",
      "소비자 멱등성 처리와 복합 유니크 키 제약 설계",
      "Docker Compose·Nginx 기반 배포 환경 구성",
    ],
    decisions: [
      {
        context: "DB 저장과 Kafka 발행이 별도 단계라 한쪽만 성공하면 상태가 어긋납니다.",
        decision: "송금 요청과 Outbox 레코드를 같은 트랜잭션에서 커밋하고, 별도 릴레이가 Kafka로 발행합니다.",
        why: "DB 커밋을 단일 진실 원본으로 삼으면 Kafka 장애 시에도 미발행 이벤트를 이후에 재발행할 수 있습니다.",
        tradeOff: "발행이 즉시가 아닌 근사 실시간이 되고, 릴레이·스케줄러라는 운영 요소가 늘어납니다.",
        evidence: "OutboxRelayer.java",
      },
      {
        context: "같은 계좌에 동시 송금이 들어오면 갱신 손실이 발생할 수 있습니다.",
        decision: "계좌 잔액 갱신에 Optimistic Lock을 적용하고 충돌 시 제한적으로 재시도합니다.",
        why: "충돌 빈도가 높지 않은 구조에서 비관적 락보다 처리량 저하가 작다고 판단했습니다.",
        tradeOff: "충돌이 잦아지면 재시도 비용이 커지므로 재시도 횟수와 실패 처리 정책이 필요합니다.",
        evidence: "TransferConcurrencyTest.java",
      },
      {
        context: "재시도·중복 발행 상황에서 같은 송금이 두 번 반영될 수 있습니다.",
        decision: "서비스단 상태 검증과 복합 유니크 키 제약을 함께 적용해 멱등성을 확보했습니다.",
        why: "애플리케이션 검증만으로는 경합을 완전히 막기 어려워 DB 제약을 최종 방어선으로 두었습니다.",
        tradeOff: "제약 위반을 정상 흐름으로 처리하는 예외 처리 코드가 필요합니다.",
      },
    ],
    troubleshooting: [
      {
        problem: "Kafka가 일시적으로 응답하지 않을 때 송금 이벤트가 발행되지 않는 경우가 있었습니다.",
        investigation: "발행 실패 시점의 트랜잭션 경계와 Outbox 상태를 로그로 추적했습니다.",
        change: "미발행 상태 이벤트를 주기적으로 조회해 재발행하는 스케줄러를 추가했습니다.",
        validation: "Kafka를 의도적으로 중단한 뒤 복구 시 이벤트가 재발행되는지 확인했습니다.",
      },
    ],
    validation: [
      "동시 송금 100건을 실행한 뒤 최종 잔액 합계가 초기 상태와 일치하는지 검증했습니다.",
      "Kafka 중단·복구 시나리오에서 미발행 이벤트가 재발행되는지 확인했습니다.",
    ],
    limitations: [
      "검증은 로컬·테스트 환경 기준이며 대규모 트래픽에서의 성능은 별도 측정이 필요합니다.",
      "외부 시스템 실패에 대한 보상 처리는 Saga 구조의 토대만 마련한 단계입니다.",
    ],
    evidence: [
      { label: "OutboxRelayer.java", href: "https://github.com/meatcarrot/bank-20260127/tree/version4" },
      { label: "TransferConcurrencyTest.java", href: "https://github.com/meatcarrot/bank-20260127/tree/version4" },
    ],
  },
  {
    slug: "airbot",
    number: "02",
    category: "AI 서비스 · 성능 최적화",
    title: "인천공항 AI 챗봇 ‘아라’",
    outcome: "30–40초 → 1초 이내*",
    outcomeLabel: "유사 질의 응답 · 프로젝트 테스트 환경",
    summary:
      "반복 LangGraph 실행으로 30–40초 걸리던 유사 질의를 Semantic Cache를 통해 1초 이내로 단축했습니다.",
    description:
      "인천공항 공공 API와 Vector DB를 결합해 최신 공항 정보를 제공하는 RAG 기반 챗봇 ‘아라’의 응답 성능을 개선했습니다.",
    technologies: ["Django", "LangGraph", "MongoDB Vector Search", "RAG"],
    featured: true,
    role: "AI 서버 설계·구현, 성능 개선",
    period: "2025.07 – 2025.09",
    team: "KT AIVLE School 빅프로젝트 · 6인 팀",
    repository: {
      label: "aivleCloudNative0715/ICN-AI-chatbot",
      href: "https://github.com/aivleCloudNative0715/ICN-AI-chatbot",
    },
    architecture: {
      caption:
        "질문 임베딩으로 Semantic Cache를 먼저 조회하고, 적중 시 즉시 응답하며 미적중 시에만 LangGraph/RAG 경로를 실행합니다.",
      flow: [
        { label: "Question" },
        { label: "Embedding" },
        { label: "Semantic Cache", emphasis: true, note: "MongoDB Vector Search" },
        { label: "cache hit → answer", emphasis: true },
        { label: "cache miss → LangGraph / RAG" },
        { label: "async cache store" },
      ],
    },
    overview:
      "일반 LLM만으로는 항공편·날씨·혼잡도처럼 계속 변하는 공항 정보를 정확히 제공하기 어렵고, 모든 질문마다 공공 API를 직접 호출하면 호출 제한과 외부 지연 문제가 생깁니다. 데이터 성격에 맞춘 수집·갱신·검색 흐름을 설계하고, 반복 질의의 응답 경로를 최적화했습니다.",
    problem: [
      "하나의 질문을 처리하는 동안 LLM이 3–4회 호출되어 응답이 30–40초까지 지연됐습니다.",
      "실시간으로 갱신되는 공공 API 데이터를 안정적으로 반영해야 했습니다.",
      "백엔드와 AI 서버가 서로 다른 정보 구조를 가정해 통합 시점에 스키마를 다시 맞춰야 했습니다.",
    ],
    myRole: [
      "DB·Vector DB 설계 및 Django AI 서버 설계·구현",
      "챗봇 응답 흐름 구현과 성능 최적화",
      "공공 API 데이터 수집·갱신 파이프라인 구성",
      "Semantic Cache 기반 응답 경로 개선",
    ],
    decisions: [
      {
        context: "유사한 질문이 반복돼도 매번 전체 LangGraph/RAG 경로를 실행해 비용이 컸습니다.",
        decision: "질문 임베딩을 MongoDB Vector Search로 조회하는 Semantic Cache fast path를 추가했습니다.",
        why: "의미가 유사한 질문은 기존 답변을 재사용할 수 있어 반복 실행 비용을 줄일 수 있습니다.",
        tradeOff: "유사도 임계값이 낮으면 부정확한 캐시 응답 위험이 있어 임계값 조정이 필요합니다.",
        evidence: "views.py",
      },
      {
        context: "대화 맥락과 의미 캐시를 같은 저장소로 다루면 역할이 뒤섞입니다.",
        decision: "Semantic Cache는 MongoDB Vector Search로, 대화 세션 상태는 별도 캐시로 분리했습니다.",
        why: "의미 기반 검색과 세션 상태는 접근 패턴이 달라 저장소를 분리하는 편이 명확합니다.",
        tradeOff: "저장소가 늘어나 데이터 일관성 관리 지점이 증가합니다.",
      },
    ],
    troubleshooting: [
      {
        problem: "유사 질문 응답이 30–40초까지 걸리는 병목이 있었습니다.",
        investigation: "응답 생성 단계를 나눠 측정한 결과 반복 LLM 호출 구간이 대부분의 시간을 차지했습니다.",
        change: "임베딩 기반 Semantic Cache를 조회하는 fast path를 앞단에 두었습니다.",
        validation: "테스트 환경에서 유사 질문 기준 응답 시간이 1초 이내로 단축되는 것을 확인했습니다.",
      },
    ],
    validation: [
      "테스트 환경에서 유사 질문 응답 시간이 약 30–40초에서 1초 이내로 단축됐습니다.",
      "캐시 미적중 질문은 기존 LangGraph/RAG 경로로 정상 처리되는지 확인했습니다.",
    ],
    limitations: [
      "측정은 프로젝트 테스트 환경 기준이며 실제 트래픽 분포에서는 결과가 달라질 수 있습니다.",
      "캐시 적중률과 유사도 임계값은 데이터가 쌓일수록 재조정이 필요합니다.",
    ],
    evidence: [
      { label: "views.py", href: "https://github.com/aivleCloudNative0715/ICN-AI-chatbot" },
    ],
  },
  {
    slug: "weather",
    number: "03",
    category: "머신러닝 · 문제 정의",
    title: "날씨 빅데이터 기반 119 신고량 예측",
    outcome: "특별상",
    outcomeNote: "2025 날씨 빅데이터 콘테스트",
    secondaryMetric: "RMSE ≈ 0.9",
    secondaryMetricLabel: "최종 모델",
    summary:
      "평상시와 재난 시 신고량의 분포 차이에 주목해 2-Stage 예측 구조를 설계하고 특별상을 수상했습니다.",
    description:
      "날씨 데이터와 부산 지역 119 신고 데이터를 결합해 신고 건수를 예측하고, 부산소방재난본부장상(특별상)을 수상했습니다.",
    technologies: ["Python", "시계열 분석", "Regression", "Classification"],
    featured: false,
    role: "모델링 · 데이터 검증 (팀)",
    period: "2025.05 – 2025.08",
    team: "팀 프로젝트",
    architecture: {
      caption: "극단 기후 여부를 먼저 분류한 뒤 Normal / Extreme 전용 회귀 모델로 분기하는 2-Stage 구조입니다.",
      flow: [
        { label: "Weather + 119 data" },
        { label: "Extreme-climate classifier", emphasis: true },
        { label: "Normal regressor" },
        { label: "Extreme regressor" },
        { label: "Report-count prediction", emphasis: true },
      ],
    },
    overview:
      "평상시와 재난 상황의 119 신고량은 분포가 크게 달라 단일 회귀 모델로는 두 상황을 함께 설명하기 어렵다고 판단했습니다. 극단 상황을 먼저 분류한 뒤 상황별 전용 모델로 예측하는 구조를 팀과 함께 설계했습니다.",
    problem: [
      "평상시와 재난 시 신고량 분포가 달라 단일 모델의 예측 오차가 커집니다.",
      "극단값이 드물어 일반 데이터에 묻히면 재난 상황 예측이 특히 부정확해집니다.",
      "특징 구성 과정에서 결과에 미래 정보가 섞이는 데이터 누수 위험이 있었습니다.",
    ],
    myRole: [
      "2-Stage 모델링 구조 설계 논의 참여",
      "회귀·분류 모델 학습 및 성능 비교",
      "데이터 누수 가능성 재검증",
    ],
    decisions: [
      {
        context: "평상시와 재난 시 신고량 분포가 서로 달라 하나의 회귀 모델로 설명하기 어려웠습니다.",
        decision: "극단 기후 여부를 먼저 분류하고, Normal / Extreme 전용 회귀 모델로 분기했습니다.",
        why: "상황별로 데이터 분포가 다를 때 전용 모델이 각 분포를 더 잘 설명할 수 있다고 판단했습니다.",
        tradeOff: "분류 단계의 오분류가 이후 회귀 예측 오차로 전파될 수 있습니다.",
      },
    ],
    troubleshooting: [
      {
        problem: "초기 성능 지표가 실제 예측력보다 좋게 나오는 정황이 있었습니다.",
        investigation: "특징 구성 과정에서 미래 정보가 섞이는 데이터 누수 가능성을 점검했습니다.",
        change: "누수 가능성이 있는 특징을 제거하고 검증 방식을 다시 구성했습니다.",
        validation: "재검증 후 지표가 과도하게 낙관적이지 않은지 확인해 신뢰도를 높였습니다.",
      },
    ],
    validation: [
      "최종 모델 RMSE는 약 0.9 수준이었습니다.",
      "데이터 누수 가능성을 재검증해 지표의 신뢰도를 높였습니다.",
      "2025 날씨 빅데이터 콘테스트에서 부산소방재난본부장상(특별상)을 수상했습니다.",
    ],
    limitations: [
      "분류 단계 오분류가 회귀 예측에 영향을 주는 구조적 한계가 있습니다.",
      "지역·기간이 제한된 데이터라 다른 지역으로의 일반화는 추가 검증이 필요합니다.",
    ],
    evidence: [{ label: "부산소방재난본부장상 (특별상)" }],
  },
  {
    slug: "llm-qa",
    number: "04",
    category: "LLM · 실행 기반 검증",
    title: "LLM 생성 코드 검증 프레임워크",
    outcome: "실행 기반 피드백 루프",
    outcomeNote: "LLM 생성 C/C++ 코드 검증",
    summary:
      "생성 코드를 실제 컴파일·실행하고 Sanitizer 결과를 다시 피드백하는 검증 파이프라인을 연구했습니다.",
    description:
      "상용 LLM이 생성한 코드의 품질을 자동 점검하고, 실행 근거를 피드백으로 되돌려 개선하는 QA 프레임워크를 연구했습니다.",
    technologies: ["Python", "Qwen 2.5 Coder family", "LoRA", "C++ Sanitizer"],
    featured: false,
    role: "연구·구현 (3인 팀)",
    period: "2024.08 – 2024.12",
    team: "3인 학부 캡스톤 프로젝트",
    architecture: {
      caption: "생성된 코드를 실제로 컴파일·실행하고 Sanitizer 결과를 다시 리뷰 단계로 전달하는 피드백 루프입니다.",
      flow: [
        { label: "Generated code" },
        { label: "Compile & run" },
        { label: "C++ Sanitizer", emphasis: true },
        { label: "Feedback to review", emphasis: true },
        { label: "Revised code" },
      ],
    },
    overview:
      "LLM이 생성한 코드는 겉으로는 그럴듯해도 실제로 컴파일·실행하면 오류가 드러나는 경우가 있습니다. 모델 성능 자체보다, 생성 결과를 실행 근거로 검증하고 그 결과를 다시 리뷰에 반영하는 품질 개선 프로세스를 설계하는 데 초점을 둔 연구성 프로토타입입니다.",
    problem: [
      "LLM 생성 코드를 그대로 신뢰하면 컴파일·실행 단계의 오류를 놓칠 수 있습니다.",
      "정적인 정답 비교만으로는 런타임 메모리 오류 같은 문제를 잡기 어렵습니다.",
      "품질을 정량적으로 검증할 데이터셋과 지표 체계가 필요했습니다.",
    ],
    myRole: [
      "C/C++ 문제·코드 데이터 수집·가공 참여",
      "실행 및 Sanitizer 결과를 피드백으로 연결하는 파이프라인 구현 참여",
      "정량 지표 기반 성능 검증 참여",
    ],
    decisions: [
      {
        context: "생성 코드의 정확도를 정적 비교만으로 판단하기 어려웠습니다.",
        decision: "실제 컴파일·실행과 C++ Sanitizer 결과를 리뷰 과정에 다시 전달하는 실행 기반 피드백 루프를 구성했습니다.",
        why: "실행 근거를 검증에 사용하면 정적 비교가 놓치는 런타임 오류를 반영할 수 있습니다.",
        tradeOff: "컴파일·실행·Sanitizer 실행 환경을 갖춰야 해 파이프라인 복잡도가 커집니다.",
        evidence: "sanitizer.py",
      },
    ],
    troubleshooting: [
      {
        problem: "생성 코드가 정답과 유사해 보여도 실행 시 오류가 나는 경우가 있었습니다.",
        investigation: "정적 비교와 실제 실행 결과의 차이를 사례별로 확인했습니다.",
        change: "실행·Sanitizer 결과를 리뷰 피드백으로 되돌리는 단계를 추가했습니다.",
        validation: "DebugBench, CodeJudge 등 지표로 피드백 전후 결과를 비교했습니다.",
      },
    ],
    validation: [
      "C/C++ 문제·코드 기반 학습 데이터셋을 구축했습니다.",
      "DebugBench, CodeJudge 등 지표로 검증 파이프라인의 효과를 비교했습니다.",
    ],
    limitations: [
      "연구성 프로토타입 단계로, 프로덕션 수준의 안정성은 확보하지 않았습니다.",
      "일부 모델·데이터 규모 관련 기록이 상충해 세부 수치는 보수적으로 다룹니다.",
    ],
    evidence: [{ label: "sanitizer.py" }],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const secondaryProjects = projects.filter((p) => !p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
