/**
 * Interactive quiz for discovering personalized mood.
 * Thought Logic: Guide users through questions to derive ideal mood preset; close on complete.
 */
'use client'

import { useMoodStore } from '../mood/useMoodStore'
import { moodPresets, type MoodPreset } from '../mood/moodPresets'
import { useState } from 'react'

interface Question {
    id: string
    text: string
    options: Array<{ label: string; mood: string }>
}

const questions: Question[] = [
    {
        id: 'energy',
        text: 'How is your energy level today?',
        options: [
            { label: 'High and ready to go', mood: 'energetic' },
            { label: 'Calm and steady', mood: 'serene' },
            { label: 'Needs a boost', mood: 'creative' },
        ],
    },
    {
        id: 'focus',
        text: 'What do you want to accomplish?',
        options: [
            { label: 'Deep concentration', mood: 'focused' },
            { label: 'Relax and unwind', mood: 'cozy' },
            { label: 'Explore new ideas', mood: 'creative' },
        ],
    },
]

export default function MoodQuiz() {
    const { isQuizActive, closeQuiz, setMood } = useMoodStore()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})

    if (!isQuizActive) return null

    const handleAnswer = (mood: string) => {
        const question = questions[currentQuestion]
        const newAnswers = { ...answers, [question.id]: mood }
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            // Calculate result (simple majority vote)
            const moodCounts: Record<string, number> = {}
            Object.values(newAnswers).forEach((m) => {
                moodCounts[m] = (moodCounts[m] || 0) + 1
            })
            const resultMood =
                Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
                'serene'

            const preset = moodPresets.find((p) => p.id === resultMood)
            if (preset) setMood(preset)
            closeQuiz()
            setCurrentQuestion(0)
            setAnswers({})
        }
    }

    const handleClose = () => {
        closeQuiz()
        setCurrentQuestion(0)
        setAnswers({})
    }

    return (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
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

            <p className="text-lg text-gray-200 mb-4">
                {questions[currentQuestion].text}
            </p>

            <div className="space-y-3">
                {questions[currentQuestion].options.map((option, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(option.mood)}
                        className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

