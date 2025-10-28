/**
 * Landing page with intro and CTA to configurator.
 * Thought Logic: Present the concept clearly before 3D load, provide quick access to the main experience.
 */
import Link from 'next/link'

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h1 className="text-6xl font-bold mb-6 tracking-tight">
                    Mood Room
                </h1>
                <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                    Visualize your personality in 3D space. A room that reflects your mood, values, and essence.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/configurator"
                        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Enter Your Room
                    </Link>
                    <p className="text-sm text-gray-400 mt-4">
                        A React Three Fiber experience
                    </p>
                </div>
            </div>
        </main>
    )
}

