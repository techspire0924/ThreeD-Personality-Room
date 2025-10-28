/**
 * Procedurally generated room objects with subtle animations by vibe.
 * Thought Logic: Low-poly props (spheres/cylinders) with motion variance per mood;
 * uses frame loop for lightweight animations. Respects reduced motion.
 */
'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMoodStore, type Vibe } from '../mood/useMoodStore'

const vibeAnimations: Record<Vibe, { speed: number; amplitude: number; rotationSpeed: number }> = {
    Calm: { speed: 0.5, amplitude: 0.1, rotationSpeed: 0.3 },
    Chaotic: { speed: 2.0, amplitude: 0.3, rotationSpeed: 1.5 },
    Dreamy: { speed: 0.8, amplitude: 0.2, rotationSpeed: 0.5 },
    Cyber: { speed: 1.5, amplitude: 0.15, rotationSpeed: 2.0 },
    Cozy: { speed: 0.6, amplitude: 0.1, rotationSpeed: 0.4 },
}

export default function ProceduralProps() {
    const { vibe, palette } = useMoodStore()
    const propsRef = useRef<THREE.Group>(null)

    const animConfig = vibeAnimations[vibe]

    const props = useMemo(() => {
        return [
            // Plant - sphere
            { type: 'sphere' as const, pos: [-2, 0.5, -2] as [number, number, number], size: 0.4, id: 0 },
            // Lamp - cylinder
            { type: 'cylinder' as const, pos: [2, 1, -2] as [number, number, number], size: [0.3, 0.3, 1] as [number, number, number], id: 1 },
            // Table - small box
            { type: 'box' as const, pos: [0, 0.3, -1] as [number, number, number], size: [1, 0.3, 1] as [number, number, number], id: 2 },
        ]
    }, [vibe])

    useFrame(({ clock }) => {
        if (propsRef.current) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            const hasReducedMotionClass = document.documentElement.classList.contains('reduced-motion')

            if (!prefersReducedMotion && !hasReducedMotionClass) {
                propsRef.current.children.forEach((child, i) => {
                    const mesh = child as THREE.Mesh
                    const time = clock.elapsedTime
                    const config = animConfig

                    // Floating animation based on vibe
                    mesh.position.y = props[i].pos[1] + Math.sin(time * config.speed) * config.amplitude

                    // Rotation animation
                    mesh.rotation.y = time * config.rotationSpeed
                })
            }
        }
    })

    return (
        <group ref={propsRef}>
            {props.map((prop) => (
                <mesh
                    key={prop.id}
                    position={prop.pos}
                    castShadow
                >
                    {prop.type === 'sphere' && <sphereGeometry args={[prop.size as number, 8, 6]} />}
                    {prop.type === 'cylinder' && (
                        <cylinderGeometry args={[prop.size[0], prop.size[1], prop.size[2], 8]} />
                    )}
                    {prop.type === 'box' && <boxGeometry args={prop.size as [number, number, number]} />}
                    <meshStandardMaterial
                        color={palette.accent}
                        emissive={palette.accent}
                        emissiveIntensity={0.2}
                        roughness={0.7}
                        metalness={0.1}
                    />
                </mesh>
            ))}
        </group>
    )
}

