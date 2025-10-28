/**
 * R3F Canvas wrapper with soft lighting, city environment, and responsive DPR.
 * Thought Logic: Expose children prop for flexible composition; drei helpers for quality rendering;
 * Perf meter for dev-only performance monitoring.
 */
'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, RoundedBox, Stats } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { type ReactNode } from 'react'

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
        <Canvas
            camera={{ position: [0, 1.6, 3], fov: 60 }}
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

            {/* Consumer-provided content (e.g., <Room />) */}
            {children}

            <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={8}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
                target={[0, 1.6, 0]}
                dampingFactor={0.05}
                enableDamping={true}
                rotateSpeed={0.5}
                zoomSpeed={0.8}
            />

            <Environment preset="city" />
        </Canvas>
    )
}

