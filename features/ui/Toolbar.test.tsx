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
    const mockSetMood = vi.fn()
    const mockOpenQuiz = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
            ; (useMoodStore as any).mockReturnValue({
                currentMood: { id: 'serene', label: 'Serene' },
                setMood: mockSetMood,
                openQuiz: mockOpenQuiz,
            })
    })

    it('should render mood preset buttons', () => {
        render(<Toolbar />)

        expect(screen.getByText('Serene')).toBeInTheDocument()
        expect(screen.getByText('Energetic')).toBeInTheDocument()
        expect(screen.getByText('Focused')).toBeInTheDocument()
    })

    it('should call setMood when a preset button is clicked', () => {
        render(<Toolbar />)

        const energeticButton = screen.getByText('Energetic')
        fireEvent.click(energeticButton)

        expect(mockSetMood).toHaveBeenCalled()
    })

    it('should highlight the current mood', () => {
        render(<Toolbar />)

        const sereneButton = screen.getByRole('button', { name: 'Switch to Serene mood' })
        expect(sereneButton).toHaveClass('bg-blue-600')
    })

    it('should call openQuiz when quiz button is clicked', () => {
        render(<Toolbar />)

        const quizButton = screen.getByRole('button', { name: 'Take mood quiz' })
        fireEvent.click(quizButton)

        expect(mockOpenQuiz).toHaveBeenCalled()
    })

    it('should have proper ARIA labels', () => {
        render(<Toolbar />)

        expect(screen.getByRole('button', { name: 'Switch to Serene mood' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Take mood quiz' })).toBeInTheDocument()
    })
})

