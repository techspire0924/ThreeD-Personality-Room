/**
 * Tests for Toolbar UI component.
 * Thought Logic: Verify rendering and interaction; ensure accessibility and state updates work correctly.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useMoodStore } from '../mood/useMoodStore'
import Toolbar from './Toolbar'

// Mock the store
vi.mock('../mood/useMoodStore', () => ({
    useMoodStore: vi.fn(),
}))

describe('Toolbar', () => {
    const mockSetVibe = vi.fn()
    const mockSetIntensity = vi.fn()
    const mockOpenQuiz = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
            ; (useMoodStore as any).mockReturnValue({
                vibe: 'Calm',
                intensity: 0.5,
                palette: {
                    primary: '#7DD3C0',
                    accent: '#FF6B6B',
                    bg: '#1a1a1a',
                },
                setVibe: mockSetVibe,
                setIntensity: mockSetIntensity,
                openQuiz: mockOpenQuiz,
            })
    })

    it('should render vibe buttons', () => {
        render(<Toolbar />)

        expect(screen.getByText('Calm')).toBeInTheDocument()
        expect(screen.getByText('Chaotic')).toBeInTheDocument()
        expect(screen.getByText('Dreamy')).toBeInTheDocument()
        expect(screen.getByText('Cyber')).toBeInTheDocument()
        expect(screen.getByText('Cozy')).toBeInTheDocument()
    })

    it('should call setVibe when a vibe button is clicked', () => {
        render(<Toolbar />)

        const chaoticButton = screen.getByText('Chaotic')
        fireEvent.click(chaoticButton)

        expect(mockSetVibe).toHaveBeenCalledWith('Chaotic')
    })

    it('should highlight the current vibe', () => {
        render(<Toolbar />)

        const calmButton = screen.getByRole('button', { name: 'Switch to Calm vibe' })
        expect(calmButton).toHaveClass('bg-blue-600')
    })

    it('should call setIntensity when slider is changed', () => {
        render(<Toolbar />)

        const slider = screen.getByRole('slider')
        fireEvent.change(slider, { target: { value: '0.8' } })

        expect(mockSetIntensity).toHaveBeenCalledWith(0.8)
    })

    it('should call openQuiz when quiz button is clicked', () => {
        render(<Toolbar />)

        const quizButton = screen.getByRole('button', { name: 'Take mood quiz' })
        fireEvent.click(quizButton)

        expect(mockOpenQuiz).toHaveBeenCalled()
    })

    it('should display current intensity percentage', () => {
        ; (useMoodStore as any).mockReturnValue({
            vibe: 'Calm',
            intensity: 0.7,
            palette: {
                primary: '#7DD3C0',
                accent: '#FF6B6B',
                bg: '#1a1a1a',
            },
            setVibe: mockSetVibe,
            setIntensity: mockSetIntensity,
            openQuiz: mockOpenQuiz,
        })

        render(<Toolbar />)

        expect(screen.getByText('Intensity: 70%')).toBeInTheDocument()
    })

    it('should have proper ARIA labels', () => {
        render(<Toolbar />)

        expect(screen.getByRole('button', { name: 'Switch to Calm vibe' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Take mood quiz' })).toBeInTheDocument()
    })
})