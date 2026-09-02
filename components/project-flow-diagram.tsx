"use client"

import { useEffect, useMemo, useState } from "react"
import {
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  Panel,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  useReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react"

type DiagramKind =
  | "endpoint"
  | "process"
  | "state"
  | "broker"
  | "tool"
  | "output"

type DiagramNodeData = {
  title: string
  meta?: string
  kind?: DiagramKind
} & Record<string, unknown>

type Waypoint = { x: number; y: number }

type FlowConfig = {
  nodes: Node<DiagramNodeData>[]
  edges: Edge[]
  height: number
}

const HANDLE_STYLE = {
  width: 8,
  height: 8,
  opacity: 0,
  pointerEvents: "none" as const,
}

function DiagramNode({ data }: NodeProps) {
  const node = data as DiagramNodeData
  const kind = node.kind ?? "process"
  const dark = kind === "broker"

  const shell: Record<DiagramKind, string> = {
    endpoint:
      "rounded-full bg-[#fbfbfa] px-5 py-4 ring-1 ring-[#d2d9e1]",
    process:
      "rounded-[14px] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)] ring-1 ring-[#d8e0e8]",
    state:
      "rounded-[16px] bg-[#f1f6ff] px-5 py-4 shadow-[0_10px_28px_rgba(37,99,235,0.055)] ring-1 ring-[#abc5f2]",
    broker:
      "rounded-full bg-[#202833] px-5 py-4 shadow-[0_11px_28px_rgba(15,23,42,0.16)]",
    tool:
      "rounded-[14px] bg-[#fafbfc] px-5 py-4 ring-1 ring-dashed ring-[#c3cdd8]",
    output:
      "rounded-[14px] bg-[#eaf2ff] px-5 py-4 shadow-[0_10px_28px_rgba(37,99,235,0.07)] ring-1 ring-[#9ab9ee]",
  }

  return (
    <div className={`w-full ${shell[kind]}`}>
      <Handle type="target" id="t-left" position={Position.Left} style={HANDLE_STYLE} />
      <Handle type="target" id="t-top" position={Position.Top} style={HANDLE_STYLE} />
      <Handle type="target" id="t-right" position={Position.Right} style={HANDLE_STYLE} />
      <Handle type="target" id="t-bottom" position={Position.Bottom} style={HANDLE_STYLE} />
      <Handle type="source" id="s-left" position={Position.Left} style={HANDLE_STYLE} />
      <Handle type="source" id="s-top" position={Position.Top} style={HANDLE_STYLE} />
      <Handle type="source" id="s-right" position={Position.Right} style={HANDLE_STYLE} />
      <Handle type="source" id="s-bottom" position={Position.Bottom} style={HANDLE_STYLE} />

      <div
        className={`text-[16px] font-semibold leading-[1.35] tracking-[-0.015em] ${
          dark ? "text-white" : "text-[#20262e]"
        }`}
      >
        {node.title}
      </div>

      {node.meta ? (
        <div
          className={`mt-1.5 font-mono text-[12px] leading-[1.45] tracking-[0.015em] ${
            dark ? "text-white/60" : "text-[#778391]"
          }`}
        >
          {node.meta}
        </div>
      ) : null}
    </div>
  )
}

function OrthogonalEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  label,
  data,
}: EdgeProps) {
  const waypoints = ((data as { waypoints?: Waypoint[] } | undefined)?.waypoints ?? [])
  const points = [
    { x: sourceX, y: sourceY },
    ...waypoints,
    { x: targetX, y: targetY },
  ]

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ")

  const middle = points[Math.floor(points.length / 2)]

  return (
    <>
      <BaseEdge path={path} style={style} markerEnd={markerEnd} />
      {label ? (
        <EdgeLabelRenderer>
          <div
            className="pointer-events-none absolute rounded-md bg-[#fbfbfa]/95 px-1.5 py-0.5 text-[10px] font-medium text-[#778391]"
            style={{
              transform: `translate(-50%, -50%) translate(${middle.x}px, ${middle.y}px)`,
            }}
          >
            {String(label)}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  )
}

const nodeTypes = { diagram: DiagramNode } satisfies NodeTypes
const edgeTypes = { orthogonal: OrthogonalEdge }

function N(
  id: string,
  x: number,
  y: number,
  title: string,
  meta: string | undefined,
  kind: DiagramKind,
  width = 180,
): Node<DiagramNodeData> {
  return {
    id,
    type: "diagram",
    position: { x, y },
    data: { title, meta, kind },
    style: { width },
    zIndex: 2,
  }
}

function E(
  id: string,
  source: string,
  target: string,
  options: {
    sourceHandle?: string
    targetHandle?: string
    label?: string
    dashed?: boolean
    accent?: boolean
    curve?: "smoothstep" | "bezier"
  } = {},
): Edge {
  const color = options.accent ? "#5b82c4" : "#b0bac5"

  return {
    id,
    source,
    target,
    sourceHandle: options.sourceHandle ?? "s-right",
    targetHandle: options.targetHandle ?? "t-left",
    type: options.curve ?? "smoothstep",
    zIndex: 0,
    label: options.label,
    style: {
      stroke: color,
      strokeWidth: options.accent ? 1.7 : 1.35,
      strokeDasharray: options.dashed ? "6 6" : undefined,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color,
      width: 15,
      height: 15,
    },
    labelStyle: {
      fill: options.accent ? "#416cae" : "#74808d",
      fontSize: 10,
      fontWeight: 500,
    },
    labelBgStyle: {
      fill: "#fbfbfa",
      fillOpacity: 0.96,
    },
    labelBgPadding: [5, 3],
    labelBgBorderRadius: 5,
  }
}

function O(
  id: string,
  source: string,
  target: string,
  waypoints: Waypoint[],
  options: {
    sourceHandle?: string
    targetHandle?: string
    label?: string
    dashed?: boolean
    accent?: boolean
  } = {},
): Edge {
  const color = options.accent ? "#5b82c4" : "#b5bfc9"

  return {
    id,
    source,
    target,
    sourceHandle: options.sourceHandle ?? "s-right",
    targetHandle: options.targetHandle ?? "t-left",
    type: "orthogonal",
    zIndex: 0,
    label: options.label,
    data: { waypoints },
    style: {
      stroke: color,
      strokeWidth: options.accent ? 1.7 : 1.3,
      strokeDasharray: options.dashed ? "6 6" : undefined,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color,
      width: 15,
      height: 15,
    },
  }
}

/* -------------------------------------------------------------------------- */
/* Detail diagrams: preserve the richer Notion Mermaid topology.              */
/* -------------------------------------------------------------------------- */

function bankDetail(): FlowConfig {
  const nodes = [
    N("request", 0, 170, "송금 요청", "POST /transfer", "endpoint", 155),
    N("service", 220, 170, "송금 요청 접수", "requestTransfer()", "process", 180),

    N("ledger", 480, 60, "거래 상태 기록", "TransferLedger · PENDING", "state", 205),
    N("outbox", 480, 230, "발행 사실 저장", "OutboxEvent · PENDING", "state", 205),

    N("relayer", 780, 230, "Outbox 릴레이", "AFTER_COMMIT", "process", 190),
    N("retry", 780, 420, "미발행 유지", "5초 Scheduler 재시도", "tool", 190),

    N("kafka", 1060, 230, "Kafka", "transfer-topic", "broker", 145),
    N("consumer", 1050, 485, "송금 이벤트 소비", "TransferConsumer", "process", 200),

    N("facade", 760, 570, "충돌 재시도", "Optimistic Lock + Retry", "tool", 210),
    N("process", 460, 570, "송금 처리", "processTransfer()", "process", 185),

    N("account", 145, 470, "계좌 반영", "withdraw / deposit", "output", 175),
    N("accountLedger", 145, 600, "계좌 원장", "DEBIT + CREDIT", "state", 175),
    N("success", 145, 730, "거래 완료", "TransferLedger · SUCCESS", "output", 195),
  ]

  const edges = [
    E("b1", "request", "service"),
    E("b2", "service", "ledger", { accent: true }),
    E("b3", "service", "outbox", { accent: true }),
    E("b4", "outbox", "relayer", { label: "commit 이후", accent: true }),
    E("b5", "relayer", "kafka", { accent: true }),

    O(
      "b6",
      "relayer",
      "retry",
      [
        { x: 1000, y: 350 },
        { x: 1000, y: 455 },
      ],
      {
        sourceHandle: "s-right",
        targetHandle: "t-right",
        label: "발행 실패",
        dashed: true,
      },
    ),
    O(
      "b7",
      "retry",
      "relayer",
      [
        { x: 700, y: 455 },
        { x: 700, y: 305 },
      ],
      {
        sourceHandle: "s-left",
        targetHandle: "t-left",
        dashed: true,
      },
    ),

    E("b8", "kafka", "consumer", {
      sourceHandle: "s-bottom",
      targetHandle: "t-top",
      accent: true,
    }),
    E("b9", "consumer", "facade", {
      sourceHandle: "s-left",
      targetHandle: "t-right",
    }),
    E("b10", "facade", "process", {
      sourceHandle: "s-left",
      targetHandle: "t-right",
    }),

    O("b11", "process", "account", [{ x: 365, y: 525 }], {
      sourceHandle: "s-left",
      targetHandle: "t-right",
    }),
    O("b12", "process", "accountLedger", [{ x: 365, y: 645 }], {
      sourceHandle: "s-left",
      targetHandle: "t-right",
    }),
    O("b13", "process", "success", [{ x: 365, y: 775 }], {
      sourceHandle: "s-left",
      targetHandle: "t-right",
      accent: true,
    }),
  ]

  return { nodes, edges, height: 820 }
}

function airbotDetail(): FlowConfig {
  const nodes = [
    N("user", 0, 225, "사용자 질문", undefined, "endpoint", 150),
    N("api", 220, 225, "Django AI API", "질문 처리 진입점", "process", 190),
    N("session", 220, 35, "대화 상태", "Redis / Django Cache", "state", 190),

    N("embed", 500, 225, "질문 임베딩", undefined, "process", 175),
    N("cache", 760, 225, "Semantic Cache", "MongoDB Vector Search", "state", 215),

    N("hit", 1080, 60, "즉시 응답", "score ≥ 0.97 · < 1s*", "output", 190),
    N("graph", 1080, 340, "LangGraph 처리", "cache miss", "process", 190),

    N("vectors", 720, 550, "문서 근거 검색", "8 Vector Collections", "state", 205),
    N("realtime", 1020, 550, "실시간·정형 데이터", "API / structured DB", "state", 205),

    N("llm", 1325, 340, "응답 생성", "LLM", "process", 170),
    N("answer", 1325, 90, "최종 응답", undefined, "output", 170),
    N("async", 1300, 610, "비동기 캐시 저장", "질문·답변 임베딩", "tool", 200),
  ]

  const edges = [
    E("a1", "user", "api"),
    E("a2", "api", "session", {
      sourceHandle: "s-top",
      targetHandle: "t-bottom",
      label: "세션",
      dashed: true,
    }),
    E("a3", "api", "embed"),
    E("a4", "embed", "cache", { accent: true }),

    E("a5", "cache", "hit", {
      sourceHandle: "s-right",
      targetHandle: "t-left",
      label: "적중",
      accent: true,
      curve: "bezier",
    }),
    E("a6", "hit", "answer", { accent: true }),

    E("a7", "cache", "graph", {
      sourceHandle: "s-right",
      targetHandle: "t-left",
      label: "미적중",
    }),
    E("a8", "graph", "vectors", {
      sourceHandle: "s-bottom",
      targetHandle: "t-top",
    }),
    E("a9", "graph", "realtime", {
      sourceHandle: "s-bottom",
      targetHandle: "t-top",
    }),
    E("a10", "vectors", "llm", {
      sourceHandle: "s-right",
      targetHandle: "t-bottom",
    }),
    E("a11", "realtime", "llm", {
      sourceHandle: "s-right",
      targetHandle: "t-bottom",
    }),
    E("a12", "llm", "answer", {
      sourceHandle: "s-top",
      targetHandle: "t-bottom",
      accent: true,
    }),
    E("a13", "llm", "async", {
      sourceHandle: "s-bottom",
      targetHandle: "t-top",
      dashed: true,
      label: "비동기 저장",
    }),

    O(
      "a14",
      "async",
      "cache",
      [
        { x: 1515, y: 680 },
        { x: 1515, y: 760 },
        { x: 870, y: 760 },
        { x: 870, y: 330 },
      ],
      {
        sourceHandle: "s-right",
        targetHandle: "t-bottom",
        dashed: true,
        label: "캐시 반영",
      },
    ),
  ]

  return { nodes, edges, height: 790 }
}

function weatherDetail(): FlowConfig {
  const nodes = [
    N("call", 0, 40, "119 신고 데이터", "call119 / cat119", "state", 190),
    N("weather", 0, 190, "기상 관측·특보", undefined, "state", 190),
    N("risk", 0, 340, "사고다발지역", undefined, "state", 190),

    N("prep", 300, 190, "전처리·통합", undefined, "process", 185),
    N("feature", 590, 190, "피처 엔지니어링", "지역 · 날짜 · 신고유형 · 특보 · 위험", "process", 220),
    N("stl", 910, 190, "STL 성분 예측", "Trend / Seasonal / Residual", "tool", 220),
    N("classifier", 1230, 190, "극단 상황 분류", "XGBoost Classifier", "state", 210),

    N("normal", 1540, 70, "평상시 회귀", "Normal XGB", "process", 180),
    N("extreme", 1540, 310, "재난시 회귀", "Extreme XGB", "output", 180),

    N("result", 1830, 190, "119 신고량 예측", undefined, "output", 200),
  ]

  const edges = [
    E("w1", "call", "prep"),
    E("w2", "weather", "prep"),
    E("w3", "risk", "prep"),
    E("w4", "prep", "feature"),
    E("w5", "feature", "stl"),
    E("w6", "stl", "classifier", { accent: true }),
    E("w7", "classifier", "normal", { label: "Normal" }),
    E("w8", "classifier", "extreme", { label: "Extreme", accent: true }),
    E("w9", "normal", "result"),
    E("w10", "extreme", "result", { accent: true }),
  ]

  return { nodes, edges, height: 520 }
}

function llmDetail(): FlowConfig {
  const nodes = [
    N("req", 0, 205, "자연어 요구사항", undefined, "endpoint", 175),
    N("spec", 245, 205, "명세 정형화", "Phi-3", "tool", 180),
    N("generate", 500, 205, "코드 생성", "LLM", "process", 180),
    N("code", 760, 205, "생성 C/C++ 코드", undefined, "state", 195),

    N("san", 1060, 60, "실행·분석", "C++ Sanitizer", "tool", 190),
    N("review", 1060, 275, "코드 리뷰", "Qwen 계열", "process", 190),
    N("feedback", 1340, 275, "수정 피드백", undefined, "output", 190),
    N("eval", 1050, 495, "외부 평가", "DebugBench / CodeJudge", "state", 220),
  ]

  const edges = [
    E("l1", "req", "spec"),
    E("l2", "spec", "generate"),
    E("l3", "generate", "code"),
    E("l4", "code", "san", {
      sourceHandle: "s-right",
      targetHandle: "t-left",
      accent: true,
      curve: "bezier",
    }),
    E("l5", "code", "review", {
      sourceHandle: "s-right",
      targetHandle: "t-left",
    }),
    E("l6", "san", "review", {
      sourceHandle: "s-bottom",
      targetHandle: "t-top",
      label: "실행 근거",
      accent: true,
    }),
    E("l7", "review", "feedback", { accent: true }),

    O(
      "l8",
      "feedback",
      "generate",
      [
        { x: 1510, y: 355 },
        { x: 1510, y: 20 },
        { x: 590, y: 20 },
        { x: 590, y: 190 },
      ],
      {
        sourceHandle: "s-right",
        targetHandle: "t-top",
        label: "재생성",
        accent: true,
      },
    ),

    E("l9", "code", "eval", {
      sourceHandle: "s-bottom",
      targetHandle: "t-left",
      dashed: true,
    }),
  ]

  return { nodes, edges, height: 630 }
}

/* -------------------------------------------------------------------------- */
/* Homepage diagrams: intentionally much simpler than the Notion Mermaid.      */
/* -------------------------------------------------------------------------- */


function heroBank(): FlowConfig {
  const nodes = [
    N("request", 0, 35, "송금 요청", undefined, "endpoint", 105),
    N("commit", 135, 20, "원장 + Outbox", undefined, "state", 140),
    N("kafka", 310, 35, "Kafka", undefined, "broker", 90),
    N("consumer", 435, 20, "멱등 소비", undefined, "output", 120),
  ]

  const edges = [
    E("hh1", "request", "commit", { accent: true }),
    E("hh2", "commit", "kafka", { accent: true }),
    E("hh3", "kafka", "consumer", { accent: true }),
  ]

  return { nodes, edges, height: 130 }
}

function homeBank(): FlowConfig {
  const nodes = [
    N("request", 0, 55, "송금 요청", undefined, "endpoint", 135),
    N("commit", 215, 35, "원장 + Outbox", undefined, "state", 180),
    N("kafka", 485, 55, "Kafka", undefined, "broker", 120),
    N("consumer", 695, 35, "멱등 소비", undefined, "output", 170),
  ]

  const edges = [
    E("hb1", "request", "commit", { accent: true }),
    E("hb2", "commit", "kafka", { accent: true }),
    E("hb3", "kafka", "consumer", { accent: true }),
  ]

  return { nodes, edges, height: 190 }
}

function compactAirBot(): FlowConfig {
  const nodes = [
    N("q", 0, 65, "질문", undefined, "endpoint", 125),
    N("cache", 205, 45, "Semantic Cache", undefined, "state", 185),
    N("hit", 490, 0, "즉시 응답", "< 1s*", "output", 155),
    N("miss", 490, 120, "LangGraph / RAG", undefined, "process", 180),
  ]

  const edges = [
    E("ca1", "q", "cache", { accent: true }),
    E("ca2", "cache", "hit", { label: "hit", accent: true }),
    E("ca3", "cache", "miss", { label: "miss" }),
  ]

  return { nodes, edges, height: 225 }
}

function mobile(project: string, variant: "hero" | "home" | "compact" | "detail"): FlowConfig {
  if (variant === "hero") {
    const nodes = [
      N("h0", 0, 0, "송금 요청", undefined, "endpoint", 120),
      N("h1", 155, 0, "원장 + Outbox", undefined, "state", 135),
      N("h2", 155, 125, "Kafka", undefined, "broker", 135),
      N("h3", 0, 125, "멱등 소비", undefined, "output", 120),
    ]

    return {
      nodes,
      edges: [
        E("he0", "h0", "h1", { accent: true }),
        E("he1", "h1", "h2", {
          sourceHandle: "s-bottom",
          targetHandle: "t-top",
          accent: true,
        }),
        E("he2", "h2", "h3", {
          sourceHandle: "s-left",
          targetHandle: "t-right",
          accent: true,
        }),
      ],
      height: 245,
    }
  }

  if (variant === "home") {
    const items = ["송금 요청", "원장 + Outbox", "Kafka", "멱등 소비"]
    const nodes = items.map((title, index) =>
      N(
        `m${index}`,
        0,
        index * 115,
        title,
        undefined,
        index === 2 ? "broker" : index === 1 ? "state" : index === 3 ? "output" : "endpoint",
        260,
      ),
    )
    const edges = items.slice(0, -1).map((_, index) =>
      E(`me${index}`, `m${index}`, `m${index + 1}`, {
        sourceHandle: "s-bottom",
        targetHandle: "t-top",
        accent: true,
      }),
    )
    return { nodes, edges, height: 485 }
  }

  if (variant === "compact" && project === "airbot") {
    const nodes = [
      N("m0", 0, 0, "질문", undefined, "endpoint", 260),
      N("m1", 0, 115, "Semantic Cache", undefined, "state", 260),
      N("m2", 0, 230, "적중 → 즉시 응답", "< 1s*", "output", 260),
      N("m3", 0, 345, "미적중 → LangGraph / RAG", undefined, "process", 260),
    ]
    return {
      nodes,
      edges: [
        E("m1e", "m0", "m1", { sourceHandle: "s-bottom", targetHandle: "t-top" }),
        E("m2e", "m1", "m2", {
          sourceHandle: "s-bottom",
          targetHandle: "t-top",
          accent: true,
        }),
        E("m3e", "m1", "m3", {
          sourceHandle: "s-bottom",
          targetHandle: "t-top",
        }),
      ],
      height: 485,
    }
  }

  const detailCore: Record<string, Array<[string, string | undefined, DiagramKind]>> = {
    bank: [
      ["송금 요청", "POST /transfer", "endpoint"],
      ["거래 상태 + Outbox", "same DB transaction", "state"],
      ["Outbox 릴레이", "실패 시 재발행", "process"],
      ["Kafka", "transfer-topic", "broker"],
      ["멱등 소비 + 충돌 재시도", "unique key / optimistic lock", "tool"],
      ["계좌·원장 반영", "SUCCESS", "output"],
    ],
    airbot: [
      ["사용자 질문", undefined, "endpoint"],
      ["Django AI API", "세션 상태 분리", "process"],
      ["Semantic Cache", "MongoDB Vector Search", "state"],
      ["적중 → 즉시 응답", "score ≥ 0.97", "output"],
      ["미적중 → LangGraph / RAG", "문서 + 실시간 데이터", "process"],
      ["응답 + 비동기 캐시 저장", undefined, "output"],
    ],
    weather: [
      ["119 + 기상 + 위험 데이터", undefined, "state"],
      ["전처리·피처 엔지니어링", undefined, "process"],
      ["STL 성분 예측", undefined, "tool"],
      ["극단 상황 분류", "XGBoost", "state"],
      ["Normal / Extreme 회귀", "2-Stage", "process"],
      ["119 신고량 예측", undefined, "output"],
    ],
    "llm-qa": [
      ["자연어 요구사항", undefined, "endpoint"],
      ["명세 정형화", "Phi-3", "tool"],
      ["코드 생성", "LLM", "process"],
      ["실행 + Sanitizer", "외부 실행 근거", "tool"],
      ["코드 리뷰 + 피드백", "Qwen 계열", "state"],
      ["재생성 / 평가", "feedback loop", "output"],
    ],
  }

  const items = detailCore[project] ?? detailCore.bank
  const nodes = items.map(([title, meta, kind], index) =>
    N(`v${index}`, 0, index * 125, title, meta, kind, 280),
  )
  const edges = items.slice(0, -1).map((_, index) =>
    E(`ve${index}`, `v${index}`, `v${index + 1}`, {
      sourceHandle: "s-bottom",
      targetHandle: "t-top",
      accent: index >= items.length - 3,
    }),
  )

  return { nodes, edges, height: items.length * 125 + 70 }
}

function desktop(project: string, variant: "hero" | "home" | "compact" | "detail"): FlowConfig {
  if (variant === "hero") return heroBank()
  if (variant === "home") return homeBank()
  if (variant === "compact" && project === "airbot") return compactAirBot()
  if (project === "bank") return bankDetail()
  if (project === "airbot") return airbotDetail()
  if (project === "weather") return weatherDetail()
  return llmDetail()
}


function DiagramToolbar() {
  const { fitView, zoomTo } = useReactFlow()

  return (
    <Panel position="top-right" className="!m-3 flex overflow-hidden rounded-lg border border-[#d8dfe6] bg-white/95 shadow-sm">
      <button
        type="button"
        onClick={() => zoomTo(1, { duration: 180 })}
        className="border-r border-[#e4e8ec] px-2.5 py-1.5 text-[11px] font-medium text-[#5f6975] hover:bg-[#f2f6fb]"
      >
        1:1
      </button>
      <button
        type="button"
        onClick={() => fitView({ padding: 0.05, duration: 220 })}
        className="px-2.5 py-1.5 text-[11px] font-medium text-[#5f6975] hover:bg-[#f2f6fb]"
      >
        전체 보기
      </button>
    </Panel>
  )
}

export function ProjectFlowDiagram({
  project,
  variant = "detail",
  className = "",
}: {
  project: string
  variant?: "hero" | "home" | "compact" | "detail"
  className?: string
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)")
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const config = useMemo(
    () => (isMobile ? mobile(project, variant) : desktop(project, variant)),
    [isMobile, project, variant],
  )

  const interactive = variant === "detail"
  const initialViewport = interactive
    ? isMobile
      ? { x: 20, y: 20, zoom: 1 }
      : { x: 34, y: 32, zoom: 0.95 }
    : { x: 0, y: 0, zoom: 1 }

  return (
    <div
      className={`relative overflow-hidden ${
        interactive
          ? "rounded-[18px] border border-[#e0e5ea] bg-[#fafbfc]"
          : ""
      } ${className}`}
      style={{ height: config.height }}
      aria-label={`${project} 프로젝트 흐름도`}
    >
      <ReactFlow
        key={`${project}-${variant}-${isMobile ? "mobile" : "desktop"}`}
        nodes={config.nodes}
        edges={config.edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView={!interactive}
        fitViewOptions={{ padding: variant === "hero" ? 0.025 : 0.045 }}
        defaultViewport={initialViewport}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={interactive}
        zoomOnPinch={interactive}
        zoomOnDoubleClick={interactive}
        panOnScroll={false}
        panOnDrag={interactive}
        preventScrolling={!interactive}
        minZoom={interactive ? 0.4 : 0.25}
        maxZoom={interactive ? 2.4 : 1.2}
        proOptions={{ hideAttribution: true }}
        className={`bg-transparent ${interactive ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        {interactive ? (
          <>
            <DiagramToolbar />
            <Controls
              position="bottom-right"
              showInteractive={false}
              className="!m-3 !overflow-hidden !rounded-lg !border !border-[#d8dfe6] !bg-white/95 !shadow-sm [&>button]:!h-8 [&>button]:!w-8 [&>button]:!border-b-[#e4e8ec] [&>button]:!bg-white [&>button]:!text-[#5f6975] [&>button:hover]:!bg-[#f2f6fb]"
            />
          </>
        ) : null}
      </ReactFlow>

      {interactive ? (
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1.5 text-[10px] text-[#7f8994] shadow-sm ring-1 ring-[#e1e5ea]">
          기본 화면은 가독성 우선 · 드래그 이동 · 휠 확대/축소
        </div>
      ) : null}
    </div>
  )
}
