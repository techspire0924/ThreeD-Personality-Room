/**
 * Utility action buttons (Randomize, Screenshot, Share, Reduced Motion toggle).
 * Thought Logic: Centralized action handlers; clean UI for utility functions.
 */
'use client'

import type { Vibe, Palette } from '../../mood/useMoodStore'

interface UtilityButtonsProps {
    onRandomize: () => void
    onScreenshot: () => void
    onShare: () => void
    reducedMotion: boolean
    onToggleReducedMotion: () => void
}

const vibeOptions: Array<{ value: Vibe; label: string }> = [
    { value: 'Calm', label: 'Calm' },
    { value: 'Chaotic', label: 'Chaotic' },
    { value: 'Dreamy', label: 'Dreamy' },
    { value: 'Cyber', label: 'Cyber' },
    { value: 'Cozy', label: 'Cozy' },
]

export default function UtilityButtons({
    onRandomize,
    onScreenshot,
    onShare,
    reducedMotion,
    onToggleReducedMotion,
}: UtilityButtonsProps) {
    return (
        <>
            {/* Action Buttons */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                    Actions
                </h3>
                <div className="space-y-2">
                    <button
                        onClick={onRandomize}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        aria-label="Randomize mood settings"
                    >
                        🎲 Randomize
                    </button>
                    <button
                        onClick={onScreenshot}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        aria-label="Take screenshot"
                    >
                        📸 Screenshot
                    </button>
                    <button
                        onClick={onShare}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        aria-label="Share mood configuration"
                    >
                        🔗 Share
                    </button>
                </div>
            </div>

            {/* Accessibility Controls */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                    Accessibility
                </h3>
                <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-300">Reduced Motion</label>
                    <button
                        onClick={onToggleReducedMotion}
                        className={`w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${reducedMotion ? 'bg-blue-600' : 'bg-gray-600'
                            }`}
                        aria-label="Toggle reduced motion"
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                                }`}
                        />
                    </button>
                </div>
            </div>
        </>
    )
}
