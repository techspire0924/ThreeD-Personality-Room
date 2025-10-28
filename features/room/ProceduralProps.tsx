/**
 * Procedurally generated room objects that respond to mood state.
 * Thought Logic: Abstract decoration logic; generates varied arrangements per mood without runtime allocation.
 */
'use client'

import { useMemo } from 'react'
import { useMoodStore } from '../mood/useMoodStore'

export default function ProceduralProps() {
    const { currentMood } = useMoodStore()

    const props = useMemo(() => {
        const count = 5
        return Array.from({ length: count }, (_, i) => ({
            position: [
                -4 + (i * 2) + Math.random() * 0.5,
                0.5,
                -3 + Math.random() * 0.5,
            ] as [number, number, number],
            scale: 0.3 + Math.random() * 0.4,
            rotation: Math.random() * Math.PI * 2,
        }))
    }, [currentMood.id])

    return (
        <group>
            {props.map((prop, i) => (
                <mesh
                    key={i}
                    position={prop.position}
                    scale={prop.scale}
                    rotation={[0, prop.rotation, 0]}
                    castShadow
                >
                    <boxGeometry args={[0.5, 1, 0.5]} />
                    <meshStandardMaterial
                        color={currentMood.color}
                        emissive={currentMood.color}
                        emissiveIntensity={0.2}
                    />
                </mesh>
            ))}
        </group>
    )
}

