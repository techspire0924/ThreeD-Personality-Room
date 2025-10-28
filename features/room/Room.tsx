/**
 * Main 3D room mesh with procedural props based on mood.
 * Thought Logic: Renders basic room geometry; ProceduralProps add mood-driven decorations;
 * environment lighting follows mood preset (intensity & tint).
 */
'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMoodStore } from '../mood/useMoodStore'
import { pickPreset } from '../mood/moodPresets'
import ProceduralProps from './ProceduralProps'

export default function Room() {
    const { vibe, palette } = useMoodStore()
    const rotationSpeed = useRef(0.002)

    // Update environment lighting based on mood
    useEffect(() => {
        const preset = pickPreset(vibe)
        document.documentElement.style.setProperty('--light-intensity', `${preset.lightIntensity}`)
        document.documentElement.style.setProperty('--light-tint', preset.lightTint)
    }, [vibe])

    // Gentle camera auto-rotate when idle (respects reduced motion)
    useFrame(({ camera, clock }) => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const hasReducedMotionClass = document.documentElement.classList.contains('reduced-motion')

        if (!prefersReducedMotion && !hasReducedMotionClass) {
            camera.position.x = Math.cos(clock.elapsedTime * rotationSpeed.current) * 5
            camera.position.z = Math.sin(clock.elapsedTime * rotationSpeed.current) * 5
            camera.lookAt(0, 0, 0)
        }
    })

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={palette.bg} />
            </mesh>

            {/* Back wall */}
            <mesh position={[0, 3, -5]} receiveShadow>
                <planeGeometry args={[10, 6]} />
                <meshStandardMaterial color={palette.primary} />
            </mesh>

            {/* Left wall */}
            <mesh
                position={[-5, 3, 0]}
                rotation={[0, Math.PI / 2, 0]}
                receiveShadow
            >
                <planeGeometry args={[10, 6]} />
                <meshStandardMaterial color={palette.primary} />
            </mesh>

            {/* Right wall */}
            <mesh
                position={[5, 3, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                receiveShadow
            >
                <planeGeometry args={[10, 6]} />
                <meshStandardMaterial color={palette.primary} />
            </mesh>

            {/* Ceiling */}
            <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={palette.primary} />
            </mesh>

            <ProceduralProps />
        </group>
    )
}

