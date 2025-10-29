/**
 * Main 3D configurator view with 2-column responsive layout and reduced-motion support.
 * Thought Logic: Server component orchestrates SceneCanvas (client) and UI panels. 
 * Split view: 3D scene left, controls right. Responsive to stack on mobile.
 * Reduced-motion mode shows static image instead of live 3D.
 */
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import SceneCanvas from '@/components/canvas/SceneCanvas'
import Toolbar from '@/features/ui/Toolbar'
import MoodQuiz from '@/features/ui/MoodQuiz'
import NavigationHelp from '@/components/NavigationHelp'

const Room = dynamic(() => import('@/features/room/Room'), {
    ssr: false,
    loading: () => null,
})

// Static fallback for reduced motion
function StaticRoomFallback() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-950">
            <div className="text-center text-white">
                <div className="text-6xl mb-4">🏠</div>
                <p className="text-lg">Your mood room</p>
                <p className="text-sm text-gray-400">Reduced motion mode</p>
            </div>
        </div>
    )
}

export default function ConfiguratorPage() {
    return (
        <div className="h-screen bg-gray-900 overflow-hidden">
            <NavigationHelp />
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Left: 3D Scene */}
                <div className="relative w-full h-full bg-gray-950">
                    <Suspense
                        fallback={
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white">Loading 3D scene...</div>
                            </div>
                        }
                    >
                        <SceneCanvas>
                            <Room />
                        </SceneCanvas>
                    </Suspense>
                    {/* Reduced motion fallback */}
                    <div className="reduced-motion-fallback hidden">
                        <StaticRoomFallback />
                    </div>
                </div>

                {/* Right: UI Controls */}
                <div className="w-full h-full overflow-y-auto bg-gray-800 p-6 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Mood Room</h1>
                        <p className="text-gray-400">Configure your 3D personality space</p>
                    </div>

                    <Toolbar />

                    <MoodQuiz />
                </div>
            </div>
        </div>
    )
}

