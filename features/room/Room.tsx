/**
 * Main 3D room mesh with procedural props based on mood.
 * Thought Logic: Renders basic room geometry; ProceduralProps add mood-driven decorations;
 * environment lighting follows mood preset (intensity & tint).
 * DUCK_MODE: If vibe is 'Chaotic' and intensity > 0.8, spawns a tiny spinning rubber duck.
 */
'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { useMoodStore } from '../mood/useMoodStore'
import { pickPreset } from '../mood/moodPresets'
import ProceduralProps from './ProceduralProps'

// Memoize materials for performance
const createMaterial = (color: string) => useMemo(
    () => ({ color }),
    [color]
)

export default function Room() {
    const { vibe, palette, intensity } = useMoodStore()
    const rotationSpeed = useRef(0.002)
    const [duckVisible, setDuckVisible] = useState(false)
    const [duckAudio, setDuckAudio] = useState<HTMLAudioElement | null>(null)

    // DUCK_MODE: Check if easter egg should activate
    useEffect(() => {
        if (vibe === 'Chaotic' && intensity > 0.8) {
            setDuckVisible(true)
        } else {
            setDuckVisible(false)
        }
    }, [vibe, intensity])

    // Initialize duck quack sound
    useEffect(() => {
        if (duckVisible && typeof Audio !== 'undefined') {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTSN0/LO')
            setDuckAudio(audio)
        }
    }, [duckVisible])

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

    // Memoize floor material
    const floorMaterial = useMemo(() => (
        <meshStandardMaterial color={palette.bg} />
    ), [palette.bg])

    // Memoize wall material
    const wallMaterial = useMemo(() => (
        <meshStandardMaterial color={palette.primary} />
    ), [palette.primary])

    // Duck click handler (debounced)
    const handleDuckClick = () => {
        if (duckAudio) {
            duckAudio.volume = 0.3
            duckAudio.play().catch(() => { })
        }
    }

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                {floorMaterial}
            </mesh>

            {/* Back wall */}
            <mesh position={[0, 3, -5]} receiveShadow>
                <planeGeometry args={[10, 6]} />
                {wallMaterial}
            </mesh>

            {/* Left wall */}
            <mesh
                position={[-5, 3, 0]}
                rotation={[0, Math.PI / 2, 0]}
                receiveShadow
            >
                <planeGeometry args={[10, 6]} />
                {wallMaterial}
            </mesh>

            {/* Right wall */}
            <mesh
                position={[5, 3, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                receiveShadow
            >
                <planeGeometry args={[10, 6]} />
                {wallMaterial}
            </mesh>

            {/* Ceiling */}
            <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                {wallMaterial}
            </mesh>

            <ProceduralProps />

            {/* DUCK_MODE: Rubber duck easter egg */}
            {duckVisible && (
                <Duck rotationSpeed={0.02} onClick={handleDuckClick} />
            )}
        </group>
    )
}

// Tiny spinning rubber duck component
function Duck({ rotationSpeed, onClick }: { rotationSpeed: number; onClick: () => void }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += rotationSpeed
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={[-4.5, 0.5, -4.5]}
            onClick={onClick}
            onPointerOut={(e) => {
                e.stopPropagation()
            }}
            castShadow
        >
            <sphereGeometry args={[0.2, 8, 6]} />
            <meshStandardMaterial
                color="#FFD700"
                emissive="#FFA500"
                emissiveIntensity={0.3}
            />
        </mesh>
    )
}

