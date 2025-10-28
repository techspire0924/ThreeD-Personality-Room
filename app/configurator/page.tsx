/**
 * Main 3D configurator view with mood selection and room rendering.
 * Thought Logic: Server component orchestrates SceneCanvas (client) and UI overlays. 
 * Lazy-load heavy 3D code while providing instant UI feedback.
 */
import { Suspense } from 'react'
import SceneCanvas from '@/components/canvas/SceneCanvas'
import Toolbar from '@/features/ui/Toolbar'
import MoodQuiz from '@/features/ui/MoodQuiz'

export default function ConfiguratorPage() {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
            <Suspense
                fallback={
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white">Loading 3D scene...</div>
                    </div>
                }
            >
                <SceneCanvas />
            </Suspense>

            <div className="absolute inset-0 pointer-events-none">
                <div className="pointer-events-auto">
                    <Toolbar />
                </div>
                <div className="pointer-events-auto">
                    <MoodQuiz />
                </div>
            </div>
        </div>
    )
}

