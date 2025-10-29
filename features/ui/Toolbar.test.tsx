/**
 * Tests for Toolbar UI component.
 * Thought Logic: Verify rendering and interaction; ensure accessibility and state updates work correctly.
 * Updated to match actual dropdown-based implementation.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useMoodStore } from '../mood/useMoodStore'
import Toolbar from './Toolbar'

// Mock the store
vi.mock('../mood/useMoodStore', () => ({
    useMoodStore: vi.fn(),
}))

// Mock the pickPreset function
vi.mock('../mood/moodPresets', () => ({
    pickPreset: vi.fn(() => ({
        palette: {
            primary: '#7DD3C0',
            accent: '#FF6B6B',
            bg: '#1a1a1a',
        }
    }))
}))

describe('Toolbar', () => {
    const mockSetVibe = vi.fn()
    const mockSetIntensity = vi.fn()
    const mockSetPalette = vi.fn()
    const mockOpenQuiz = vi.fn()
    const mockToQuery = vi.fn(() => 'vibe=Calm&intensity=0.5')

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
                setPalette: mockSetPalette,
                openQuiz: mockOpenQuiz,
                toQuery: mockToQuery,
            })
    })

    it('should render vibe dropdown with all options', () => {
        render(<Toolbar />)

        const vibeSelect = screen.getByRole('combobox', { name: 'Select mood vibe' })
        expect(vibeSelect).toBeInTheDocument()

        // Check that all vibe options are present
        expect(screen.getByRole('option', { name: 'Calm' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Chaotic' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Dreamy' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Cyber' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Cozy' })).toBeInTheDocument()
    })

    it('should call setVibe and setPalette when vibe is changed', () => {
        render(<Toolbar />)

        const vibeSelect = screen.getByRole('combobox', { name: 'Select mood vibe' })
        fireEvent.change(vibeSelect, { target: { value: 'Chaotic' } })

        expect(mockSetVibe).toHaveBeenCalledWith('Chaotic')
        expect(mockSetPalette).toHaveBeenCalled()
    })

    it('should display current vibe in dropdown', () => {
        render(<Toolbar />)

        const vibeSelect = screen.getByRole('combobox', { name: 'Select mood vibe' })
        expect(vibeSelect).toHaveValue('Calm')
    })

    it('should call setIntensity when slider is changed', () => {
        render(<Toolbar />)

        const slider = screen.getByRole('slider', { name: 'Adjust mood intensity' })
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
            setPalette: mockSetPalette,
            openQuiz: mockOpenQuiz,
            toQuery: mockToQuery,
        })

        render(<Toolbar />)

        expect(screen.getByText('Intensity: 70%')).toBeInTheDocument()
    })

    it('should have proper ARIA labels', () => {
        render(<Toolbar />)

        expect(screen.getByRole('combobox', { name: 'Select mood vibe' })).toBeInTheDocument()
        expect(screen.getByRole('slider', { name: 'Adjust mood intensity' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Take mood quiz' })).toBeInTheDocument()
    })
})