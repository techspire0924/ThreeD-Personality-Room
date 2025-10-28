/**
 * Tests for VibeSelect component.
 * Thought Logic: Verify onChange prop triggers correctly with different vibes.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import VibeSelect from './VibeSelect'

describe('VibeSelect', () => {
    it('should render with current value', () => {
        const onChange = vi.fn()
        render(<VibeSelect value="Calm" onChange={onChange} />)

        const select = screen.getByRole('combobox')
        expect(select).toHaveValue('Calm')
    })

    it('should call onChange when value changes', () => {
        const onChange = vi.fn()
        render(<VibeSelect value="Calm" onChange={onChange} />)

        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: 'Chaotic' } })

        expect(onChange).toHaveBeenCalledWith('Chaotic')
    })

    it('should render all vibe options', () => {
        const onChange = vi.fn()
        render(<VibeSelect value="Calm" onChange={onChange} />)

        expect(screen.getByText('Calm')).toBeInTheDocument()
        expect(screen.getByText('Chaotic')).toBeInTheDocument()
        expect(screen.getByText('Dreamy')).toBeInTheDocument()
        expect(screen.getByText('Cyber')).toBeInTheDocument()
        expect(screen.getByText('Cozy')).toBeInTheDocument()
    })

    it('should have proper ARIA label', () => {
        const onChange = vi.fn()
        render(<VibeSelect value="Calm" onChange={onChange} />)

        expect(screen.getByLabelText('Select mood vibe')).toBeInTheDocument()
    })
})
