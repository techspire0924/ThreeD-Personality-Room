/**
 * Enhanced mood toolbar with comprehensive controls and keyboard shortcuts.
 * Thought Logic: Orchestrates modular sub-components; handles keyboard shortcuts
 * (1-5 for vibes, R for randomize, S for screenshot). Provides aria-live for toasts.
 */
'use client'

import { useMoodStore, type Vibe, type Palette } from '../mood/useMoodStore'
import { pickPreset } from '../mood/moodPresets'
import { useState, useEffect } from 'react'
import CurrentMoodDisplay from './toolbar/CurrentMoodDisplay'
import VibeSelect from './toolbar/VibeSelect'
import IntensityControl from './toolbar/IntensityControl'
import ColorPickers from './toolbar/ColorPickers'
import UtilityButtons from './toolbar/UtilityButtons'

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

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if typing in input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return
            }

            // 1-5 for vibe selection
            if (e.key >= '1' && e.key <= '5') {
                const index = parseInt(e.key) - 1
                if (vibeOptions[index]) {
                    handleVibeChange(vibeOptions[index].value)
                }
            }
            // R for randomize
            if (e.key === 'r' || e.key === 'R') {
                handleRandomize()
            }
            // S for screenshot
            if (e.key === 's' || e.key === 'S') {
                handleScreenshot()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [vibe])

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
            // Announce to aria-live region
            const liveRegion = document.getElementById('aria-live-region')
            if (liveRegion) {
                liveRegion.textContent = 'Link copied to clipboard!'
            }
        }
    }

    const toggleReducedMotion = () => {
        const newValue = !reducedMotion
        setReducedMotion(newValue)
        document.documentElement.classList.toggle('reduced-motion', newValue)

        window.dispatchEvent(new CustomEvent('reduced-motion-changed', {
            detail: { enabled: newValue }
        }))
    }

    return (
        <>
            <div id="aria-live-region" aria-live="polite" className="sr-only" />
            <div className="flex flex-col gap-4">
                <CurrentMoodDisplay vibe={vibe} intensity={intensity} palette={palette} />

                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                        Vibe
                    </h3>
                    <VibeSelect value={vibe} onChange={handleVibeChange} />
                </div>

                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Intensity
                    </label>
                    <IntensityControl value={intensity} onChange={setIntensity} />
                </div>

                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                        Colors
                    </h3>
                    <ColorPickers palette={palette} onChange={setPalette} />
                </div>

                <UtilityButtons
                    onRandomize={handleRandomize}
                    onScreenshot={handleScreenshot}
                    onShare={handleShare}
                    reducedMotion={reducedMotion}
                    onToggleReducedMotion={toggleReducedMotion}
                />

                <button
                    onClick={openQuiz}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                    aria-label="Take mood quiz"
                >
                    Discover Your Mood
                </button>
            </div>
        </>
    )
}