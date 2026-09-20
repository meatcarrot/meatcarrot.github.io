"use client"

import { useEffect, useRef } from "react"

export function DemoVideo({ src, poster, title, portrait = false }: {
  src: string
  poster: string
  title: string
  portrait?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let inView = false
    let manuallyPaused = false
    let automaticPause = false
    const sync = () => {
      if (inView && !document.hidden && !motion.matches && !manuallyPaused) {
        void video.play().catch(() => { /* Native controls remain available. */ })
      } else if (!video.paused) {
        automaticPause = true
        video.pause()
      }
    }
    const onPause = () => {
      if (!automaticPause) manuallyPaused = true
      automaticPause = false
    }
    const onPlay = () => { manuallyPaused = false }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.25
      sync()
    }, { threshold: [0, 0.25] })
    observer.observe(video)
    video.addEventListener("pause", onPause)
    video.addEventListener("play", onPlay)
    document.addEventListener("visibilitychange", sync)
    motion.addEventListener("change", sync)
    return () => {
      observer.disconnect()
      video.removeEventListener("pause", onPause)
      video.removeEventListener("play", onPlay)
      document.removeEventListener("visibilitychange", sync)
      motion.removeEventListener("change", sync)
      video.pause()
    }
  }, [])

  return (
    <figure>
      <figcaption className="mb-3 text-[17px] font-semibold text-[#111318]">{title}</figcaption>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        controls
        preload="metadata"
        aria-label={title}
        className={`block w-full rounded-lg border border-[#dfe3e8] bg-[#f0f3f6] object-contain ${portrait ? "max-w-[480px] aspect-[4/5]" : "aspect-video"}`}
      >
        <a href={src}>시연 영상 열기</a>
      </video>
    </figure>
  )
}
