/**
 * Mood selection toolbar with vibe controls.
 * Thought Logic: Quick-switch UI for mood vibes; surfaces store actions with keyboard support.
 */
'use client'

import { useMoodStore, type Vibe } from '../mood/useMoodStore'

const vibeOptions: Array<{ value: Vibe; label: string; color: string }> = [
    { value: 'Calm', label: 'Calm', color: '#7DD3C0' },
    { value: 'Chaotic', label: 'Chaotic', color: '#FF6B6B' },
    { value: 'Dreamy', label: 'Dreamy', color: '#9B59B6' },
    { value: 'Cyber', label: 'Cyber', color: '#00FFFF' },
    { value: 'Cozy', label: 'Cozy', color: '#FFA07A' },
]

export default function Toolbar() {
    const { vibe, intensity, palette, setVibe, setIntensity, openQuiz } = useMoodStore()

    return (
        <div className="flex flex-col gap-4">
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

                <h3 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                    Vibes
                </h3>
                <div className="flex flex-col gap-2">
                    {vibeOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setVibe(option.value)}
                            className={`px-4 py-2.5 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${vibe === option.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                }`}
                            aria-label={`Switch to ${option.label} vibe`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Intensity
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={intensity}
                        onChange={(e) => setIntensity(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <button
                onClick={openQuiz}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                aria-label="Take mood quiz"
            >
                Discover Your Mood
            </button>
        </div>
    )
}