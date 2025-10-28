/**
 * Tests for mood store state management.
 * Thought Logic: Verify store actions, URL serialization, and custom event emission.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMoodStore } from './useMoodStore'

// Mock window.dispatchEvent
const mockDispatchEvent = vi.fn()
Object.defineProperty(window, 'dispatchEvent', {
    value: mockDispatchEvent,
    writable: true,
})

describe('useMoodStore', () => {
    beforeEach(() => {
        // Reset store to initial state before each test
        useMoodStore.setState({
            vibe: 'Calm',
            palette: {
                primary: '#7DD3C0',
                accent: '#FF6B6B',
                bg: '#1a1a1a',
            },
            music: 'lofi',
            intensity: 0.5,
            isQuizActive: false,
        })
        mockDispatchEvent.mockClear()
    })

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useMoodStore())
        expect(result.current.vibe).toBe('Calm')
        expect(result.current.music).toBe('lofi')
        expect(result.current.intensity).toBe(0.5)
        expect(result.current.isQuizActive).toBe(false)
    })

    it('should change vibe when setVibe is called', () => {
        const { result } = renderHook(() => useMoodStore())

        act(() => {
            result.current.setVibe('Cyber')
        })

        expect(result.current.vibe).toBe('Cyber')
        expect(mockDispatchEvent).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'mood:changed' })
        )
    })

    it('should clamp intensity between 0 and 1', () => {
        const { result } = renderHook(() => useMoodStore())

        act(() => {
            result.current.setIntensity(1.5)
        })
        expect(result.current.intensity).toBe(1)

        act(() => {
            result.current.setIntensity(-0.5)
        })
        expect(result.current.intensity).toBe(0)
    })

    it('should update palette when setPalette is called', () => {
        const { result } = renderHook(() => useMoodStore())
        const newPalette = {
            primary: '#FF0000',
            accent: '#00FF00',
            bg: '#000000',
        }

        act(() => {
            result.current.setPalette(newPalette)
        })

        expect(result.current.palette).toEqual(newPalette)
        expect(mockDispatchEvent).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'mood:changed' })
        )
    })

    it('should parse query string correctly', () => {
        const { result } = renderHook(() => useMoodStore())
        const queryString = 'vibe=Chaotic&music=synthwave&intensity=0.8&primary=%23FF0000&accent=%2300FF00&bg=%23000000'

        act(() => {
            result.current.fromQuery(queryString)
        })

        expect(result.current.vibe).toBe('Chaotic')
        expect(result.current.music).toBe('synthwave')
        expect(result.current.intensity).toBe(0.8)
        expect(result.current.palette.primary).toBe('#FF0000')
        expect(result.current.palette.accent).toBe('#00FF00')
        expect(result.current.palette.bg).toBe('#000000')
    })

    it('should handle invalid query values gracefully', () => {
        const { result } = renderHook(() => useMoodStore())
        const queryString = 'vibe=Invalid&music=bad&intensity=2.5'

        act(() => {
            result.current.fromQuery(queryString)
        })

        expect(result.current.vibe).toBe('Calm') // Default fallback
        expect(result.current.music).toBe('lofi') // Default fallback
        expect(result.current.intensity).toBe(1) // Clamped to 1
    })

    it('should serialize state to query string', () => {
        const { result } = renderHook(() => useMoodStore())

        act(() => {
            result.current.setVibe('Dreamy')
            result.current.setIntensity(0.7)
        })

        const queryString = result.current.toQuery()
        expect(queryString).toContain('vibe=Dreamy')
        expect(queryString).toContain('intensity=0.7')
        expect(queryString).toContain('music=lofi')
    })

    it('should open and close quiz', () => {
        const { result } = renderHook(() => useMoodStore())

        act(() => {
            result.current.openQuiz()
        })
        expect(result.current.isQuizActive).toBe(true)

        act(() => {
            result.current.closeQuiz()
        })
        expect(result.current.isQuizActive).toBe(false)
    })
})

