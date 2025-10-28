/**
 * Realistic 3D room with mood-driven visuals and interactive props.
 * Thought Logic: Inside-out cube room with reflective floor, mood-responsive lighting,
 * decorative props, and signature touches per vibe. Performance optimized.
 * DUCK_MODE: If vibe is 'Chaotic' and intensity > 0.8, spawns a tiny spinning rubber duck.
 */
'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, ContactShadows } from '@react-three/drei'
import { useMoodStore } from '../mood/useMoodStore'
import { pickPreset } from '../mood/moodPresets'
import ProceduralProps from './ProceduralProps'

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

    // Memoize materials for performance
    const wallMaterial = useMemo(() => (
        <meshStandardMaterial
            color={palette.bg}
            side={2} // BackSide for inside-out cube
            roughness={0.8}
            metalness={0.1}
        />
    ), [palette.bg])

    // Calculate mood-driven lighting
    const lightIntensity = useMemo(() => {
        const baseIntensity = 0.6
        return baseIntensity + (intensity * 0.8)
    }, [intensity])

    const lightColor = useMemo(() => {
        return palette.primary
    }, [palette.primary])

    const accentColor = useMemo(() => {
        return palette.accent
    }, [palette.accent])

    // Duck click handler (debounced)
    const handleDuckClick = () => {
        if (duckAudio) {
            duckAudio.volume = 0.3
            duckAudio.play().catch(() => { })
        }
    }

    return (
        <group>
            {/* Inside-out room walls and ceiling */}
            <mesh position={[0, 3, 0]} receiveShadow>
                <boxGeometry args={[10, 6, 10]} />
                {wallMaterial}
            </mesh>

            {/* Reflective floor with MeshReflectorMaterial */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <MeshReflectorMaterial
                    mirror={0.4}
                    blur={[400, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={0.1}
                    roughness={0.8}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color={palette.bg}
                    metalness={0.05}
                />
            </mesh>

            {/* Mood-driven lighting */}
            <ambientLight intensity={lightIntensity * 0.3} color={lightColor} />

            {/* Main area light */}
            <directionalLight
                position={[0, 8, 0]}
                intensity={lightIntensity}
                color={lightColor}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Accent lights */}
            <pointLight
                position={[-3, 2, -3]}
                intensity={lightIntensity * 0.5}
                color={accentColor}
                distance={8}
            />
            <pointLight
                position={[3, 2, 3]}
                intensity={lightIntensity * 0.5}
                color={accentColor}
                distance={8}
            />

            {/* Contact shadows for grounding */}
            <ContactShadows
                position={[0, -0.01, 0]}
                opacity={0.3}
                scale={10}
                blur={2}
                far={4.5}
                resolution={256}
                color={palette.bg}
            />

            {/* Mood-specific signature touches */}
            <MoodEffects />

            {/* Decorative props */}
            <RoomProps />

            {/* Small decorative objects */}
            <SmallObjects />

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

// Decorative room props component
function RoomProps() {
    const { palette, intensity, vibe } = useMoodStore()
    const [lampOn, setLampOn] = useState(true)
    const [plantWiggle, setPlantWiggle] = useState(0)

    // Lamp click handler
    const handleLampClick = () => {
        setLampOn(!lampOn)
    }

    // Plant click handler
    const handlePlantClick = () => {
        setPlantWiggle(1)
        setTimeout(() => setPlantWiggle(0), 500)
    }

    return (
        <group>
            {/* Chair */}
            <mesh position={[-2, 0.4, 2]} castShadow>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial
                    color={palette.primary}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>

            {/* Desk */}
            <mesh position={[2, 0.3, -1]} castShadow>
                <boxGeometry args={[1.5, 0.6, 0.8]} />
                <meshStandardMaterial
                    color={palette.accent}
                    roughness={0.6}
                    metalness={0.2}
                />
            </mesh>

            {/* Lamp */}
            <group position={[2, 1.2, -1]}>
                <mesh castShadow onClick={handleLampClick}>
                    <cylinderGeometry args={[0.1, 0.1, 0.8]} />
                    <meshStandardMaterial
                        color={palette.primary}
                        roughness={0.5}
                        metalness={0.3}
                    />
                </mesh>
                <mesh position={[0, 0.5, 0]} castShadow>
                    <sphereGeometry args={[0.3, 8, 6]} />
                    <meshStandardMaterial
                        color={lampOn ? palette.accent : '#666'}
                        emissive={lampOn ? palette.accent : '#000'}
                        emissiveIntensity={lampOn ? 0.3 : 0}
                    />
                </mesh>
            </group>

            {/* Plant */}
            <group position={[-3, 0.5, -2]}>
                <mesh castShadow onClick={handlePlantClick}>
                    <cylinderGeometry args={[0.2, 0.2, 0.4]} />
                    <meshStandardMaterial
                        color="#8B4513"
                        roughness={0.8}
                    />
                </mesh>
                <mesh
                    position={[0, 0.6, 0]}
                    rotation={[plantWiggle * 0.2, 0, 0]}
                    castShadow
                >
                    <sphereGeometry args={[0.4, 8, 6]} />
                    <meshStandardMaterial
                        color={palette.primary}
                        roughness={0.9}
                    />
                </mesh>
            </group>

            {/* Picture frame */}
            <mesh position={[0, 2.5, -4.9]} castShadow>
                <boxGeometry args={[1.5, 1, 0.1]} />
                <meshStandardMaterial
                    color={palette.accent}
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>
        </group>
    )
}

// Mood-specific signature effects
function MoodEffects() {
    const { vibe, palette, intensity } = useMoodStore()
    const timeRef = useRef(0)

    useFrame(({ clock }) => {
        timeRef.current = clock.elapsedTime
    })

    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    if (prefersReducedMotion) return null

    switch (vibe) {
        case 'Dreamy':
            return (
                <group>
                    {/* Slow particle glimmers */}
                    {Array.from({ length: 8 }, (_, i) => (
                        <mesh
                            key={i}
                            position={[
                                (Math.sin(timeRef.current * 0.5 + i) * 3),
                                Math.sin(timeRef.current * 0.3 + i) * 2 + 2,
                                (Math.cos(timeRef.current * 0.4 + i) * 3)
                            ]}
                        >
                            <sphereGeometry args={[0.05, 4, 4]} />
                            <meshStandardMaterial
                                color={palette.accent}
                                emissive={palette.accent}
                                emissiveIntensity={0.5}
                                transparent
                                opacity={0.6}
                            />
                        </mesh>
                    ))}
                </group>
            )

        case 'Chaotic':
            return (
                <group>
                    {/* Spinning RGB lights */}
                    <pointLight
                        position={[
                            Math.sin(timeRef.current * 2) * 2,
                            2,
                            Math.cos(timeRef.current * 2) * 2
                        ]}
                        intensity={intensity * 0.8}
                        color="#FF0000"
                        distance={6}
                    />
                    <pointLight
                        position={[
                            Math.sin(timeRef.current * 2 + Math.PI * 2 / 3) * 2,
                            2,
                            Math.cos(timeRef.current * 2 + Math.PI * 2 / 3) * 2
                        ]}
                        intensity={intensity * 0.8}
                        color="#00FF00"
                        distance={6}
                    />
                    <pointLight
                        position={[
                            Math.sin(timeRef.current * 2 + Math.PI * 4 / 3) * 2,
                            2,
                            Math.cos(timeRef.current * 2 + Math.PI * 4 / 3) * 2
                        ]}
                        intensity={intensity * 0.8}
                        color="#0000FF"
                        distance={6}
                    />
                </group>
            )

        case 'Calm':
            return (
                <group>
                    {/* Gentle volumetric light rays */}
                    <directionalLight
                        position={[0, 8, 0]}
                        intensity={intensity * 0.3}
                        color={palette.primary}
                        target-position={[0, 0, 0]}
                    />
                </group>
            )

        case 'Cyber':
            return (
                <group>
                    {/* Neon reflections */}
                    <mesh position={[0, 0, -4.9]}>
                        <planeGeometry args={[8, 6]} />
                        <meshStandardMaterial
                            color={palette.accent}
                            emissive={palette.accent}
                            emissiveIntensity={0.2}
                            transparent
                            opacity={0.1}
                        />
                    </mesh>
                </group>
            )

        case 'Cozy':
            return (
                <group>
                    {/* Warm light flicker */}
                    <pointLight
                        position={[0, 1, 0]}
                        intensity={0.5 + Math.sin(timeRef.current * 10) * 0.1}
                        color="#FFA500"
                        distance={4}
                    />
                </group>
            )

        default:
            return null
    }
}

// Many small decorative objects floating in 3D space
function SmallObjects() {
    const { palette, vibe } = useMoodStore()
    const [randomSeed, setRandomSeed] = useState(0)

    // Update random seed when vibe changes to get new positions
    useEffect(() => {
        setRandomSeed(Math.random())
    }, [vibe])

    const objects = useMemo(() => {
        const objectTypes = [
            { type: 'box' as const, size: [0.3, 0.4, 0.2] as [number, number, number] },
            { type: 'box' as const, size: [0.3, 0.35, 0.2] as [number, number, number] },
            { type: 'box' as const, size: [0.3, 0.45, 0.2] as [number, number, number] },
            { type: 'cylinder' as const, size: [0.15, 0.15, 0.3] as [number, number, number] },
            { type: 'sphere' as const, size: 0.15 },
            { type: 'sphere' as const, size: 0.12 },
            { type: 'sphere' as const, size: 0.1 },
            { type: 'sphere' as const, size: 0.08 },
            { type: 'sphere' as const, size: 0.1 },
            { type: 'sphere' as const, size: 0.12 },
            { type: 'box' as const, size: [0.4, 0.4, 0.4] as [number, number, number] },
            { type: 'box' as const, size: [0.35, 0.35, 0.35] as [number, number, number] },
            { type: 'box' as const, size: [0.4, 0.3, 0.3] as [number, number, number] },
            { type: 'box' as const, size: [0.25, 0.3, 0.15] as [number, number, number] },
            { type: 'cylinder' as const, size: [0.15, 0.15, 0.25] as [number, number, number] },
            { type: 'cylinder' as const, size: [0.12, 0.12, 0.3] as [number, number, number] },
            { type: 'sphere' as const, size: 0.15 },
            { type: 'box' as const, size: [0.3, 0.25, 0.3] as [number, number, number] },
            { type: 'cylinder' as const, size: [0.2, 0.2, 0.2] as [number, number, number] },
            { type: 'sphere' as const, size: 0.1 },
            { type: 'box' as const, size: [0.2, 0.2, 0.2] as [number, number, number] },
            { type: 'cylinder' as const, size: [0.1, 0.1, 0.2] as [number, number, number] },
            { type: 'sphere' as const, size: 0.12 },
            { type: 'box' as const, size: [0.25, 0.25, 0.25] as [number, number, number] },
        ]

        // Generate completely random positions within room bounds
        return objectTypes.map((objTemplate, i) => {
            // Random position within room bounds (room is 10x6x10, centered at origin)
            const randomX = (Math.random() - 0.5) * 8 // -4 to +4
            const randomY = Math.random() * 4 + 0.5   // 0.5 to 4.5 (above floor, below ceiling)
            const randomZ = (Math.random() - 0.5) * 8 // -4 to +4

            // Alternate between primary and accent colors
            const color = i % 2 === 0 ? palette.primary : palette.accent

            return {
                ...objTemplate,
                pos: [randomX, randomY, randomZ] as [number, number, number],
                color
            }
        })
    }, [palette, vibe, randomSeed])

    return (
        <group>
            {objects.map((obj, i) => (
                <FloatingObject key={i} obj={obj} index={i} />
            ))}
        </group>
    )
}

// Individual floating object with subtle animation
function FloatingObject({ obj, index }: { obj: any; index: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const { vibe } = useMoodStore()

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            const hasReducedMotionClass = document.documentElement.classList.contains('reduced-motion')

            if (!prefersReducedMotion && !hasReducedMotionClass) {
                const time = clock.elapsedTime
                const speed = vibe === 'Chaotic' ? 1.5 : vibe === 'Dreamy' ? 0.8 : 0.5
                const amplitude = vibe === 'Chaotic' ? 0.1 : vibe === 'Dreamy' ? 0.05 : 0.03

                // Gentle floating motion
                meshRef.current.position.y = obj.pos[1] + Math.sin(time * speed + index * 0.5) * amplitude

                // Subtle rotation
                meshRef.current.rotation.y = time * 0.1 + index * 0.2
                meshRef.current.rotation.x = Math.sin(time * 0.3 + index) * 0.1
            }
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={obj.pos}
            castShadow
        >
            {obj.type === 'sphere' && <sphereGeometry args={[obj.size as number, 8, 6]} />}
            {obj.type === 'cylinder' && (
                <cylinderGeometry args={[obj.size[0], obj.size[1], obj.size[2], 8]} />
            )}
            {obj.type === 'box' && <boxGeometry args={obj.size as [number, number, number]} />}
            <meshStandardMaterial
                color={obj.color}
                roughness={0.7}
                metalness={0.1}
            />
        </mesh>
    )
}

