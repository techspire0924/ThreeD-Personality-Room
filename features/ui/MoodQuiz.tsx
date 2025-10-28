/**
 * Interactive 5-question compact quiz with sliders and selects.
 * Thought Logic: Guide users through questions to derive ideal mood vibe; 
 * uses pickPreset() to set store, shows confetti on completion.
 */
'use client'

import { useMoodStore, type Vibe } from '../mood/useMoodStore'
import { pickPreset } from '../mood/moodPresets'
import { useState, useEffect } from 'react'

interface Question {
    id: string
    text: string
    type: 'slider' | 'select'
    options?: Array<{ label: string; value: string }>
    min?: number
    max?: number
    step?: number
    labels?: { min: string; max: string }
}

const questions: Question[] = [
    {
        id: 'energy',
        text: 'How energetic do you feel?',
        type: 'slider',
        min: 0,
        max: 100,
        step: 10,
        labels: { min: 'Low', max: 'High' },
    },
    {
        id: 'focus',
        text: 'What\'s your focus level?',
        type: 'slider',
        min: 0,
        max: 100,
        step: 10,
        labels: { min: 'Scattered', max: 'Laser' },
    },
    {
        id: 'mood',
        text: 'How would you describe your mood?',
        type: 'select',
        options: [
            { label: 'Peaceful', value: 'calm' },
            { label: 'Excited', value: 'chaotic' },
            { label: 'Dreamy', value: 'dreamy' },
            { label: 'Focused', value: 'cyber' },
            { label: 'Cozy', value: 'cozy' },
        ],
    },
    {
        id: 'activity',
        text: 'What activity suits you now?',
        type: 'select',
        options: [
            { label: 'Meditation', value: 'calm' },
            { label: 'Dancing', value: 'chaotic' },
            { label: 'Daydreaming', value: 'dreamy' },
            { label: 'Coding', value: 'cyber' },
            { label: 'Reading', value: 'cozy' },
        ],
    },
    {
        id: 'environment',
        text: 'Preferred environment vibe?',
        type: 'slider',
        min: 0,
        max: 100,
        step: 10,
        labels: { min: 'Minimal', max: 'Rich' },
    },
]

export default function MoodQuiz() {
    const { isQuizActive, closeQuiz, setVibe, setPalette, setIntensity } = useMoodStore()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number | string>>({})
    const [showConfetti, setShowConfetti] = useState(false)

    if (!isQuizActive) return null

    const handleAnswer = (value: number | string) => {
        const question = questions[currentQuestion]
        const newAnswers = { ...answers, [question.id]: value }
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            // Calculate vibe based on answers
            const vibe = calculateVibe(newAnswers)
            const preset = pickPreset(vibe)

            // Update store
            setVibe(vibe)
            setPalette(preset.palette)
            setIntensity(0.7) // Default intensity

            // Show confetti
            setShowConfetti(true)
            setTimeout(() => setShowConfetti(false), 2000)

            // Close quiz
            setTimeout(() => {
                closeQuiz()
                setCurrentQuestion(0)
                setAnswers({})
            }, 1500)
        }
    }

    const calculateVibe = (answers: Record<string, number | string>): Vibe => {
        const mood = answers.mood as string
        const activity = answers.activity as string

        // Simple mapping based on mood and activity
        if (mood === 'calm' || activity === 'calm') return 'Calm'
        if (mood === 'chaotic' || activity === 'chaotic') return 'Chaotic'
        if (mood === 'dreamy' || activity === 'dreamy') return 'Dreamy'
        if (mood === 'cyber' || activity === 'cyber') return 'Cyber'
        if (mood === 'cozy' || activity === 'cozy') return 'Cozy'

        // Fallback based on energy level
        const energy = answers.energy as number
        if (energy > 70) return 'Chaotic'
        if (energy < 30) return 'Calm'
        return 'Dreamy'
    }

    const handleClose = () => {
        closeQuiz()
        setCurrentQuestion(0)
        setAnswers({})
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') handleClose()
        if (e.key === 'Enter' && currentQuestion === questions.length - 1) {
            // Submit on last question
        }
    }

    const currentQ = questions[currentQuestion]

    return (
        <div
            className="bg-gray-900 rounded-lg p-6 border border-gray-700"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="confetti">🎉</div>
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                    Question {currentQuestion + 1} of {questions.length}
                </h3>
                <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label="Close quiz"
                >
                    ✕
                </button>
            </div>

            <p className="text-lg text-gray-200 mb-6">
                {currentQ.text}
            </p>

            <div className="space-y-4">
                {currentQ.type === 'slider' && (
                    <div>
                        <input
                            type="range"
                            min={currentQ.min}
                            max={currentQ.max}
                            step={currentQ.step}
                            defaultValue={50}
                            onChange={(e) => handleAnswer(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            aria-label={currentQ.text}
                        />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                            <span>{currentQ.labels?.min}</span>
                            <span>{currentQ.labels?.max}</span>
                        </div>
                    </div>
                )}

                {currentQ.type === 'select' && (
                    <div className="space-y-2">
                        {currentQ.options?.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleAnswer(option.value)}
                                className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                                aria-label={`Select ${option.label}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-6">
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    )
}