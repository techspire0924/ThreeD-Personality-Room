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
        <div className="absolute top-6 left-6 flex flex-col gap-3">
            <div className="bg-black/80 backdrop-blur-md rounded-lg p-3 shadow-lg">
                <h2 className="text-sm font-semibold text-white mb-2">Mood Presets</h2>
                <div className="flex flex-col gap-1">
                    {moodPresets.map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => setMood(preset)}
                            className={`px-4 py-2 text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentMood.id === preset.id
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
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Take mood quiz"
            >
                Take Quiz
            </button>
        </div>
    )
}

