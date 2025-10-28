/**
 * Display current mood and intensity.
 * Thought Logic: Shows current state at a glance.
 */
'use client'

import type { Vibe, Palette } from '../../mood/useMoodStore'

interface CurrentMoodDisplayProps {
    vibe: Vibe
    intensity: number
    palette: Palette
}

export default function CurrentMoodDisplay({ vibe, intensity, palette }: CurrentMoodDisplayProps) {
    return (
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-3">Current Mood</h2>
            <div className="mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: palette.primary }}
                    />
                    <div>
                        <p className="text-white font-medium">{vibe}</p>
                        <p className="text-sm text-gray-400">Intensity: {Math.round(intensity * 100)}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
