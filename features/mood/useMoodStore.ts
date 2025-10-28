/**
 * Zustand store for mood state with URL sync.
 * Thought Logic: Single source of truth for mood selection; persist/share via URL params.
 */
'use client'

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { moodPresets, type MoodPreset } from './moodPresets'

interface MoodState {
    currentMood: MoodPreset
    isQuizActive: boolean
    setMood: (mood: MoodPreset) => void
    openQuiz: () => void
    closeQuiz: () => void
}

export const useMoodStore = create<MoodState>()(
    subscribeWithSelector((set) => ({
        currentMood: moodPresets[0], // Default to 'serene'
        isQuizActive: false,

        setMood: (mood: MoodPreset) => {
            set({ currentMood: mood })
            // TODO: Sync to URL params via lib/urlState.ts
        },

        openQuiz: () => set({ isQuizActive: true }),
        closeQuiz: () => set({ isQuizActive: false }),
    }))
)

