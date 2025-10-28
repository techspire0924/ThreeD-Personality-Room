/**
 * Vibe selection dropdown component.
 * Thought Logic: Reusable dropdown for vibe selection; accepts onChange prop for testability.
 */
'use client'

import type { Vibe } from '../../mood/useMoodStore'

const vibeOptions: Array<{ value: Vibe; label: string }> = [
    { value: 'Calm', label: 'Calm' },
    { value: 'Chaotic', label: 'Chaotic' },
    { value: 'Dreamy', label: 'Dreamy' },
    { value: 'Cyber', label: 'Cyber' },
    { value: 'Cozy', label: 'Cozy' },
]

interface VibeSelectProps {
    value: Vibe
    onChange: (vibe: Vibe) => void
}

export default function VibeSelect({ value, onChange }: VibeSelectProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value as Vibe)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select mood vibe"
        >
            {vibeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
