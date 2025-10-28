/**
 * Enhanced mood toolbar with comprehensive controls.
 * Thought Logic: Complete mood configuration UI; includes vibe select, color pickers,
 * action buttons (randomize, screenshot, share), and accessibility controls.
 */
'use client'

import { useMoodStore, type Vibe, type Palette } from '../mood/useMoodStore'
import { pickPreset } from '../mood/moodPresets'
import { useState, useRef } from 'react'

const vibeOptions: Array<{ value: Vibe; label: string }> = [
    { value: 'Calm', label: 'Calm' },
    { value: 'Chaotic', label: 'Chaotic' },
    { value: 'Dreamy', label: 'Dreamy' },
    { value: 'Cyber', label: 'Cyber' },
    { value: 'Cozy', label: 'Cozy' },
]

export default function Toolbar() {
    const {
        vibe,
        intensity,
        palette,
        setVibe,
        setIntensity,
        setPalette,
        openQuiz,
        toQuery
    } = useMoodStore()

    const [reducedMotion, setReducedMotion] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleVibeChange = (newVibe: Vibe) => {
        setVibe(newVibe)
        const preset = pickPreset(newVibe)
        setPalette(preset.palette)
    }

    const handleRandomize = () => {
        const randomVibe = vibeOptions[Math.floor(Math.random() * vibeOptions.length)].value
        handleVibeChange(randomVibe)
        setIntensity(Math.random())
    }

    const handleScreenshot = () => {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement
        if (canvas) {
            const dataURL = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.download = `mood-room-${vibe.toLowerCase()}.png`
            link.href = dataURL
            link.click()
        }
    }

    const handleShare = () => {
        const queryString = toQuery()
        const url = `${window.location.origin}${window.location.pathname}?${queryString}`

        if (navigator.share) {
            navigator.share({ url, title: 'My Mood Room' })
        } else {
            navigator.clipboard.writeText(url)
            // Show toast notification
            alert('URL copied to clipboard!')
        }
    }

    const toggleReducedMotion = () => {
        const newValue = !reducedMotion
        setReducedMotion(newValue)
        document.documentElement.classList.toggle('reduced-motion', newValue)

        // Dispatch custom event for room to listen
        window.dispatchEvent(new CustomEvent('reduced-motion-changed', {
            detail: { enabled: newValue }
        }))
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Current Mood Display */}
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

            {/* Vibe Selection */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                    Vibe
                </h3>
                <select
                    value={vibe}
                    onChange={(e) => handleVibeChange(e.target.value as Vibe)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Select mood vibe"
                >
                    {vibeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Intensity Slider */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
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
                    aria-label="Adjust mood intensity"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Low</span>
                    <span>High</span>
                </div>
            </div>

            {/* Color Pickers */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                    Colors
                </h3>
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Primary</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={palette.primary}
                                onChange={(e) => setPalette({ ...palette, primary: e.target.value })}
                                className="w-8 h-8 rounded border border-gray-600"
                                aria-label="Primary color"
                            />
                            <span className="text-xs text-gray-300">{palette.primary}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Accent</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={palette.accent}
                                onChange={(e) => setPalette({ ...palette, accent: e.target.value })}
                                className="w-8 h-8 rounded border border-gray-600"
                                aria-label="Accent color"
                            />
                            <span className="text-xs text-gray-300">{palette.accent}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Background</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={palette.bg}
                                onChange={(e) => setPalette({ ...palette, bg: e.target.value })}
                                className="w-8 h-8 rounded border border-gray-600"
                                aria-label="Background color"
                            />
                            <span className="text-xs text-gray-300">{palette.bg}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                    Actions
                </h3>
                <div className="space-y-2">
                    <button
                        onClick={handleRandomize}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        aria-label="Randomize mood settings"
                    >
                        🎲 Randomize
                    </button>
                    <button
                        onClick={handleScreenshot}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        aria-label="Take screenshot"
                    >
                        📸 Screenshot
                    </button>
                    <button
                        onClick={handleShare}
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
                        onClick={toggleReducedMotion}
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

            {/* Quiz Button */}
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