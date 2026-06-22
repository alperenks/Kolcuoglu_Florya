'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Volume2, VolumeX, Loader2 } from 'lucide-react'

// ─── Stories Data ────────────────────────────────────────────────────────────
interface StoryItem {
  id: string
  type: 'image' | 'video'
  url: string
  duration?: number // Milliseconds
}

interface StoryGroup {
  id: string
  title: string
  thumbnail: string
  items: StoryItem[]
}

const STORIES_DATA: StoryGroup[] = [
  {
    id: 'yedi-nesil',
    title: 'Yedi Nesil',
    thumbnail: '/images/florya-eniyi-kebapci.png',
    items: [
      {
        id: 'yn-1',
        type: 'video',
        url: '/videos/Kolcuoğlu-herkes-için.mp4',
        duration: 15000,
      },
      {
        id: 'yn-2',
        type: 'video',
        url: '/videos/Kolcuoğlu-Floryada.mp4',
        duration: 15000,
      },
    ],
  },
  {
    id: 'metrelik-kebap',
    title: 'Metrelik Kebap',
    thumbnail: '/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg',
    items: [
      {
        id: 'mk-1',
        type: 'image',
        url: '/images/kolcuoglu-florya-ozel-menu-metrelik-kebap.jpg',
        duration: 5000,
      },
      {
        id: 'mk-2',
        type: 'image',
        url: '/images/kolcuoglu-florya-adana-kebap.jpg',
        duration: 5000,
      },
    ],
  },
  {
    id: 'teras',
    title: 'Mekan & Teras',
    thumbnail: '/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg',
    items: [
      {
        id: 'tr-1',
        type: 'image',
        url: '/images/kolcuoglu-florya-deniz-manzarali-teras.jpeg',
        duration: 5000,
      },
      {
        id: 'tr-2',
        type: 'image',
        url: '/images/kolcuoglu-florya-deniz-manzarali-salonu.jpeg',
        duration: 5000,
      },
    ],
  },
]

export default function StorySystem() {
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [readStories, setReadStories] = useState<string[]>([])
  const [videoDuration, setVideoDuration] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  const [shouldPreload, setShouldPreload] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const pointerDownTime = useRef(0)

  // Load read stories from localStorage
  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('kolcuoglu_read_stories')
      if (stored) {
        setReadStories(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to parse read stories', e)
    }

    // Start preloading videos 2.5 seconds after mounting to let critical assets load first
    const timer = setTimeout(() => {
      setShouldPreload(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  // Lock body scroll when stories viewer is open
  useEffect(() => {
    if (isViewerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isViewerOpen])

  // Reset states when slide changes
  useEffect(() => {
    setIsLoading(true)
    setVideoDuration(null)
  }, [activeStoryIndex, activeSlideIndex])

  // Handle video playback play/pause state
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused || isLoading) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(err => console.log('Video play error:', err))
      }
    }
  }, [isPaused, isLoading, activeSlideIndex, activeStoryIndex])

  const markStoryAsRead = (storyId: string) => {
    if (!readStories.includes(storyId)) {
      const updated = [...readStories, storyId]
      setReadStories(updated)
      localStorage.setItem('kolcuoglu_read_stories', JSON.stringify(updated))
    }
  }

  const openStory = (index: number) => {
    setActiveStoryIndex(index)
    setActiveSlideIndex(0)
    setIsViewerOpen(true)
    markStoryAsRead(STORIES_DATA[index].id)
  }

  const closeViewer = () => {
    setIsViewerOpen(false)
    setActiveStoryIndex(null)
    setActiveSlideIndex(0)
  }

  const handleNextSlide = () => {
    if (activeStoryIndex === null) return
    const currentStory = STORIES_DATA[activeStoryIndex]

    if (activeSlideIndex < currentStory.items.length - 1) {
      setActiveSlideIndex(prev => prev + 1)
    } else {
      // Go to next story group
      if (activeStoryIndex < STORIES_DATA.length - 1) {
        const nextIndex = activeStoryIndex + 1
        setActiveStoryIndex(nextIndex)
        setActiveSlideIndex(0)
        markStoryAsRead(STORIES_DATA[nextIndex].id)
      } else {
        // Finished all stories
        closeViewer()
      }
    }
  }

  const handlePrevSlide = () => {
    if (activeStoryIndex === null) return

    if (activeSlideIndex > 0) {
      setActiveSlideIndex(prev => prev - 1)
    } else {
      // Go to previous story group
      if (activeStoryIndex > 0) {
        const prevIndex = activeStoryIndex - 1
        setActiveStoryIndex(prevIndex)
        setActiveSlideIndex(STORIES_DATA[prevIndex].items.length - 1)
        markStoryAsRead(STORIES_DATA[prevIndex].id)
      } else {
        // At the very beginning, restart first slide by changing reset key
        setResetKey(prev => prev + 1)
      }
    }
  }

  const handlePointerDown = () => {
    pointerDownTime.current = Date.now()
    setIsPaused(true)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const clickDuration = Date.now() - pointerDownTime.current
    setIsPaused(false)

    // Only trigger action if it was a quick tap, not a long-press hold
    if (clickDuration < 220) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const width = rect.width
      
      // Tap on left 35% -> Go back, right 65% -> Go forward
      if (x < width * 0.35) {
        handlePrevSlide()
      } else {
        handleNextSlide()
      }
    }
  }

  const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const durSec = e.currentTarget.duration
    if (durSec && !isNaN(durSec)) {
      setVideoDuration(durSec * 1000)
    }
    setIsLoading(false)
  }

  if (activeStoryIndex === null && isViewerOpen) return null

  const currentStory = activeStoryIndex !== null ? STORIES_DATA[activeStoryIndex] : null
  const currentSlide = currentStory ? currentStory.items[activeSlideIndex] : null

  // Determine slide duration
  const duration = currentSlide
    ? (currentSlide.type === 'video' && videoDuration) 
      ? videoDuration 
      : (currentSlide.duration || 5000)
    : 5000

  return (
    <div className="w-full md:hidden mt-0 mb-6">
      {/* CSS Keyframe for hardware-accelerated progress bar & hiding scrollbars */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes play-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* ─── Story Thumbnails Carousel ─── */}
      <div className="flex gap-4 overflow-x-auto pb-2 px-1 no-scrollbar snap-x snap-mandatory justify-start items-center">
        {STORIES_DATA.map((story, idx) => {
          const isRead = readStories.includes(story.id)
          return (
            <button
              key={story.id}
              onClick={() => openStory(idx)}
              className="flex flex-col items-center flex-shrink-0 focus:outline-none cursor-pointer snap-start"
              aria-label={`${story.title} hikayesini izle`}
            >
              {/* Outer circle with gradient or gray border */}
              <div
                className={`w-[72px] h-[72px] rounded-full flex items-center justify-center p-[2.5px] transition-all duration-300 ${
                  isRead
                    ? 'border border-[rgba(255,255,255,0.15)] bg-transparent'
                    : 'bg-gradient-to-tr from-[#b87333] via-[#a32124] to-[#c44b3b] shadow-lg shadow-red-950/20'
                }`}
              >
                {/* Inner background (anti-bleed) */}
                <div className="w-full h-full rounded-full bg-[#111111] p-[2px] relative overflow-hidden">
                  <Image
                    src={story.thumbnail}
                    alt={story.title}
                    fill
                    sizes="72px"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              
              {/* Title */}
              <span 
                className="text-[11px] font-medium mt-1.5 max-w-[80px] truncate tracking-wide"
                style={{ 
                  color: 'var(--color-cream)',
                  opacity: isRead ? 0.6 : 0.9
                }}
              >
                {story.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* ─── Fullscreen Story Viewer Modal (Rendered in Portal) ─── */}
      {mounted && createPortal(
        <AnimatePresence>
          {isViewerOpen && currentStory && currentSlide && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black text-white touch-none"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, info) => {
                // Dismiss on pull-down or pull-up
                if (Math.abs(info.offset.y) > 110) {
                  closeViewer()
                }
              }}
            >
              {/* Top Bar overlays */}
              <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-3 pb-8 px-4 pointer-events-none">
                {/* Progress bars */}
                <div className="flex gap-1.5 w-full mb-3 pointer-events-auto">
                  {currentStory.items.map((item, idx) => {
                    const isActive = idx === activeSlideIndex
                    const isCompleted = idx < activeSlideIndex

                    let barStyle: React.CSSProperties = {}
                    if (isCompleted) {
                      barStyle = { width: '100%' }
                    } else if (isActive && !isLoading) {
                      barStyle = {
                        animationName: 'play-progress',
                        animationDuration: `${duration}ms`,
                        animationTimingFunction: 'linear',
                        animationFillMode: 'forwards',
                        animationPlayState: isPaused ? 'paused' : 'running',
                      }
                    } else {
                      barStyle = { width: '0%' }
                    }

                    return (
                      <div
                        key={`${item.id}-${resetKey}`}
                        className="h-[3px] flex-1 rounded-full overflow-hidden bg-white/20"
                      >
                        <div
                          className="h-full bg-white"
                          style={barStyle}
                          onAnimationEnd={isActive ? handleNextSlide : undefined}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* Story Header (Avatar, Title, Actions) */}
                <div className="flex items-center justify-between w-full pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full border border-white/20 overflow-hidden">
                      <Image
                        src={currentStory.thumbnail}
                        alt={currentStory.title}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold tracking-wide text-white drop-shadow-md">
                        {currentStory.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sound Toggle (only for video slides) */}
                    {currentSlide.type === 'video' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsMuted(!isMuted)
                        }}
                        className="p-1.5 bg-black/35 backdrop-blur-md rounded-full border border-white/10 text-white focus:outline-none"
                        aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
                      >
                        {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                      </button>
                    )}

                    {/* Close button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        closeViewer()
                      }}
                      className="p-1.5 bg-black/35 backdrop-blur-md rounded-full border border-white/10 text-white focus:outline-none"
                      aria-label="Kapat"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* ─── Media Content Container ─── */}
              <div
                className="relative flex-1 w-full h-full flex items-center justify-center cursor-pointer select-none bg-neutral-950"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onContextMenu={(e) => e.preventDefault()}
                style={{ WebkitTouchCallout: 'none', userSelect: 'none' }}
              >
                {/* Media Loader spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-white opacity-60" />
                  </div>
                )}

                {/* Slide Image */}
                {currentSlide.type === 'image' && (
                  <Image
                    src={currentSlide.url}
                    alt="Story image content"
                    fill
                    sizes="100vw"
                    className={`object-cover transition-opacity duration-300 ${
                      isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoadingComplete={() => setIsLoading(false)}
                    priority
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ WebkitTouchCallout: 'none' }}
                  />
                )}

                {/* Slide Video */}
                {currentSlide.type === 'video' && (
                  <video
                    ref={videoRef}
                    src={currentSlide.url}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    playsInline
                    autoPlay
                    muted={isMuted}
                    loop={false}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onCanPlay={() => setIsLoading(false)}
                    onWaiting={() => setIsLoading(true)}
                    onPlaying={() => setIsLoading(false)}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ WebkitTouchCallout: 'none' }}
                  />
                )}

                {/* Swipe down hints */}
                <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center gap-1 opacity-40 text-center select-none pointer-events-none">
                  <div className="w-8 h-1 rounded-full bg-white/40 mb-1" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-white/70">
                    Kapatmak için kaydırın
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
      {/* Background preloader for stories videos (delayed 2.5s) */}
      {shouldPreload && (
        <div style={{ display: 'none' }} aria-hidden="true">
          <video preload="auto" src="/videos/Kolcuoğlu-herkes-için.mp4" muted playsInline />
          <video preload="auto" src="/videos/Kolcuoğlu-Floryada.mp4" muted playsInline />
        </div>
      )}
    </div>
  )
}
