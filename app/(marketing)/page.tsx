/**
 * Landing page with playful hero and feature highlights.
 * Thought Logic: Entice users with playful headline, gradient background, and clear CTA;
 * feature cards explain value props (Performance, Accessibility, Fun) with emoji flourishes.
 */
import Link from 'next/link'

export default function LandingPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 py-12 text-center relative z-10">
                {/* Playful Hero Section */}
                <div className="mb-16">
                    <div className="flex justify-center mb-4">
                        <span className="text-6xl">🎨</span>
                    </div>
                    <h1 className="text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Build Your Vibe
                    </h1>
                    <p className="text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                        Visualize your personality in 3D space. A room that reflects your mood, values, and essence.
                    </p>
                    <Link
                        href="/configurator"
                        className="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-xl"
                    >
                        Build my vibe →
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                    {/* Performance Card */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-colors">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold mb-3">Performance</h3>
                        <p className="text-gray-300">
                            Optimized 3D rendering with memoization, smart shadows, and mobile-friendly DPR clamping. Smooth 60fps experience.
                        </p>
                    </div>

                    {/* Accessibility Card */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-colors">
                        <div className="text-4xl mb-4">♿</div>
                        <h3 className="text-xl font-bold mb-3">Accessibility</h3>
                        <p className="text-gray-300">
                            Keyboard shortcuts (1-5, R, S), reduced motion support, and full ARIA labels. Accessible to everyone.
                        </p>
                    </div>

                    {/* Fun Card */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-pink-500 transition-colors">
                        <div className="text-4xl mb-4">🎉</div>
                        <h3 className="text-xl font-bold mb-3">Fun</h3>
                        <p className="text-gray-300">
                            Discover hidden easter eggs, randomize your vibe, and share your creations. Pure joy included.
                        </p>
                    </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="mt-16 text-sm text-gray-400">
                    <p>Built with Next.js, React Three Fiber, and Tailwind CSS 🚀</p>
                </div>
            </div>
        </main>
    )
}

