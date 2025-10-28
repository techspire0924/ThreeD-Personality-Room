/**
 * Zustand store for mood state with URL sync and custom events.
 * Thought Logic: Single source of truth for mood configuration; persist/share via URL params;
 * emit custom events for external listeners (analytics, other components).
 */
'use client'

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export type Vibe = 'Calm' | 'Chaotic' | 'Dreamy' | 'Cyber' | 'Cozy'
export type Music = 'lofi' | 'synthwave' | 'chiptune' | 'nature'

export interface Palette {
    primary: string
    accent: string
    bg: string
}

export interface MoodState {
    vibe: Vibe
    palette: Palette
    music: Music
    intensity: number
    isQuizActive: boolean

    setVibe: (vibe: Vibe) => void
    setIntensity: (intensity: number) => void
    setPalette: (palette: Palette) => void
    fromQuery: (queryString: string) => void
    toQuery: () => string
    openQuiz: () => void
    closeQuiz: () => void
}

const defaultPalette: Palette = {
    primary: '#7DD3C0',
    accent: '#FF6B6B',
    bg: '#1a1a1a',
}

const emitMoodChanged = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('mood:changed'))
    }
}

export const useMoodStore = create<MoodState>()(
    subscribeWithSelector((set, get) => ({
        vibe: 'Calm',
        palette: defaultPalette,
        music: 'lofi',
        intensity: 0.5,
        isQuizActive: false,

        setVibe: (vibe: Vibe) => {
            set({ vibe })
            emitMoodChanged()
        },

        setIntensity: (intensity: number) => {
            set({ intensity: Math.max(0, Math.min(1, intensity)) })
            emitMoodChanged()
        },

        setPalette: (palette: Palette) => {
            set({ palette })
            emitMoodChanged()
        },

        fromQuery: (queryString: string) => {
            const params = new URLSearchParams(queryString)

            const vibe = params.get('vibe') as Vibe
            const music = params.get('music') as Music
            const intensity = params.get('intensity')
            const primary = params.get('primary')
            const accent = params.get('accent')
            const bg = params.get('bg')

            set({
                vibe: vibe && ['Calm', 'Chaotic', 'Dreamy', 'Cyber', 'Cozy'].includes(vibe) ? vibe : 'Calm',
                music: music && ['lofi', 'synthwave', 'chiptune', 'nature'].includes(music) ? music : 'lofi',
                intensity: intensity ? Math.max(0, Math.min(1, parseFloat(intensity))) : 0.5,
                palette: {
                    primary: primary || defaultPalette.primary,
                    accent: accent || defaultPalette.accent,
                    bg: bg || defaultPalette.bg,
                },
            })
        },

        toQuery: () => {
            const { vibe, music, intensity, palette } = get()
            const params = new URLSearchParams()

            params.set('vibe', vibe)
            params.set('music', music)
            params.set('intensity', intensity.toString())
            params.set('primary', palette.primary)
            params.set('accent', palette.accent)
            params.set('bg', palette.bg)

            return params.toString()
        },

        openQuiz: () => set({ isQuizActive: true }),
        closeQuiz: () => set({ isQuizActive: false }),
    }))
)

