/**
 * Interactive quiz for discovering personalized mood.
 * Thought Logic: Guide users through questions to derive ideal mood vibe; close on complete.
 */
'use client'

import { useMoodStore, type Vibe } from '../mood/useMoodStore'
import { useState } from 'react'

interface Question {
    id: string
    text: string
    options: Array<{ label: string; vibe: Vibe }>
}

const questions: Question[] = [
    {
        id: 'energy',
        text: 'How is your energy level today?',
        options: [
            { label: 'High and ready to go', vibe: 'Chaotic' },
            { label: 'Calm and steady', vibe: 'Calm' },
            { label: 'Needs a boost', vibe: 'Cyber' },
        ],
    },
    {
        id: 'focus',
        text: 'What do you want to accomplish?',
        options: [
            { label: 'Deep concentration', vibe: 'Cyber' },
            { label: 'Relax and unwind', vibe: 'Cozy' },
            { label: 'Explore new ideas', vibe: 'Dreamy' },
        ],
    },
]

export default function MoodQuiz() {
    const { isQuizActive, closeQuiz, setVibe } = useMoodStore()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, Vibe>>({})

    if (!isQuizActive) return null

    const handleAnswer = (vibe: Vibe) => {
        const question = questions[currentQuestion]
        const newAnswers = { ...answers, [question.id]: vibe }
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            // Calculate result (simple majority vote)
            const vibeCounts: Record<Vibe, number> = {
                Calm: 0,
                Chaotic: 0,
                Dreamy: 0,
                Cyber: 0,
                Cozy: 0,
            }

            Object.values(newAnswers).forEach((v) => {
                vibeCounts[v]++
            })

            const resultVibe = Object.entries(vibeCounts)
                .sort((a, b) => b[1] - a[1])[0]?.[0] as Vibe || 'Calm'

            setVibe(resultVibe)
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
                        onClick={() => handleAnswer(option.vibe)}
                        className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

