/**
 * R3F Canvas wrapper with soft lighting, city environment, and responsive DPR.
 * Thought Logic: Expose children prop for flexible composition; drei helpers for quality rendering;
 * Perf meter for dev-only performance monitoring. Includes error boundary for 3D crashes.
 */
'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { useRef } from 'react'
import { type ReactNode } from 'react'
import { SceneErrorBoundary } from '../SceneErrorBoundary'
import { KeyboardControls } from './KeyboardControls'
import { ScreenshotCapture } from './ScreenshotCapture'

interface SceneCanvasProps {
    children?: ReactNode
}

export default function SceneCanvas({ children }: SceneCanvasProps) {
    const perfMonitor = useRef(process.env.NODE_ENV === 'development')

    // Clamp DPR on mobile for performance
    const devicePixelRatio = typeof window !== 'undefined'
        ? Math.min(window.devicePixelRatio || 1, 2)
        : 1

    return (
        <SceneErrorBoundary>
            <Canvas
                camera={{ position: [0, 1.6, 0], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                dpr={devicePixelRatio}
                performance={{ min: 0.8 }}
                shadows
            >
                {perfMonitor.current && <Stats />}

                {/* Soft ambient lighting for gentle overall illumination */}
                <ambientLight intensity={0.3} />

                {/* Hemisphere light for natural sky/ground gradient */}
                <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#8bbcdb" />

                {/* Soft directional light for subtle shadows */}
                <directionalLight
                    position={[5, 8, 5]}
                    intensity={0.6}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />

                {/* Keyboard controls for precise navigation */}
                <KeyboardControls />

                {/* Screenshot capture functionality */}
                <ScreenshotCapture />

                {/* Consumer-provided content (e.g., <Room />) */}
                {children}

                <OrbitControls
                    // Enable all navigation methods
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}

                    // Strict room constraints (room is 10x6x10, centered at origin)
                    minDistance={0.5}
                    maxDistance={3} // Keep camera well inside room

                    // Limit vertical rotation to keep camera inside
                    minPolarAngle={Math.PI / 6} // 30 degrees from top
                    maxPolarAngle={Math.PI * 5 / 6} // 150 degrees from top
                    minAzimuthAngle={-Infinity}
                    maxAzimuthAngle={Infinity}

                    // Center the room
                    target={[0, 1.6, 0]}

                    // Responsive controls
                    dampingFactor={0.1}
                    enableDamping={true}

                    // Moderate controls for better room navigation
                    rotateSpeed={1.5}
                    zoomSpeed={1.0}
                    panSpeed={0.8}

                    // Standard mouse controls
                    mouseButtons={{
                        LEFT: 0,   // Rotate
                        MIDDLE: 1, // Zoom
                        RIGHT: 2   // Pan
                    }}

                    // Touch controls
                    touches={{
                        ONE: 1,    // Rotate
                        TWO: 2     // Zoom/Pan
                    }}

                    // Zoom to cursor for better UX
                    zoomToCursor={true}

                    // Keep camera upright for room navigation
                    screenSpacePanning={true}
                />

                <Environment preset="city" />
            </Canvas>
        </SceneErrorBoundary>
    )
}

