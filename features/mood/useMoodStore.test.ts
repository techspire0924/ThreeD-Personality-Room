/**
 * Tests for mood store state management.
 * Thought Logic: Verify store actions and state transitions; ensure correctness of core app state logic.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMoodStore } from './useMoodStore'
import { moodPresets } from './moodPresets'

describe('useMoodStore', () => {
    beforeEach(() => {
        // Reset store to initial state before each test
        useMoodStore.setState({
            currentMood: moodPresets[0],
            isQuizActive: false,
        })
    })

    it('should initialize with default mood', () => {
        const { result } = renderHook(() => useMoodStore())
        expect(result.current.currentMood.id).toBe('serene')
        expect(result.current.isQuizActive).toBe(false)
    })

    it('should change mood when setMood is called', () => {
        const { result } = renderHook(() => useMoodStore())

        act(() => {
            result.current.setMood(moodPresets[1])
        })

        expect(result.current.currentMood.id).toBe('energetic')
    })

    it('should open quiz when openQuiz is called', () => {
        const { result } = renderHook(() => useMoodStore())

        act(() => {
            result.current.openQuiz()
        })

        expect(result.current.isQuizActive).toBe(true)
    })

    it('should close quiz when closeQuiz is called', () => {
        const { result } = renderHook(() => useMoodStore())

        act(() => {
            result.current.openQuiz()
            result.current.closeQuiz()
        })

        expect(result.current.isQuizActive).toBe(false)
    })
})

