/**
 * Mood selection toolbar with preset buttons.
 * Thought Logic: Quick-switch UI for mood presets; surfaces store actions with keyboard support.
 */
'use client'

import { useMoodStore } from '../mood/useMoodStore'
import { moodPresets } from '../mood/moodPresets'

export default function Toolbar() {
    const { currentMood, setMood, openQuiz } = useMoodStore()

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">Current Mood</h2>
                <div className="mb-4">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: currentMood.color }}
                        />
                        <div>
                            <p className="text-white font-medium">{currentMood.label}</p>
                            <p className="text-sm text-gray-400">{currentMood.description}</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                    Presets
                </h3>
                <div className="flex flex-col gap-2">
                    {moodPresets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => setMood(preset)}
                            className={`px-4 py-2.5 text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentMood.id === preset.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                }`}
                            aria-label={`Switch to ${preset.label} mood`}
                        >
                            {preset.label}
                        </button>
                    ))}
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

