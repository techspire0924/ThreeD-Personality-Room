/**
 * Main 3D room mesh with procedural props based on mood.
 * Thought Logic: Renders basic room geometry; ProceduralProps add mood-driven decorations and atmosphere.
 */
'use client'

import { useMoodStore } from '../mood/useMoodStore'
import ProceduralProps from './ProceduralProps'

export default function Room() {
    const { currentMood } = useMoodStore()

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={currentMood.color} />
            </mesh>

            {/* Back wall */}
            <mesh position={[0, 3, -5]} receiveShadow>
                <planeGeometry args={[10, 6]} />
                <meshStandardMaterial color={currentMood.color} />
            </mesh>

            {/* Left wall */}
            <mesh
                position={[-5, 3, 0]}
                rotation={[0, Math.PI / 2, 0]}
                receiveShadow
            >
                <planeGeometry args={[10, 6]} />
                <meshStandardMaterial color={currentMood.color} />
            </mesh>

            {/* Right wall */}
            <mesh
                position={[5, 3, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                receiveShadow
            >
                <planeGeometry args={[10, 6]} />
                <meshStandardMaterial color={currentMood.color} />
            </mesh>

            {/* Ceiling */}
            <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={currentMood.color} />
            </mesh>

            <ProceduralProps />
        </group>
    )
}

