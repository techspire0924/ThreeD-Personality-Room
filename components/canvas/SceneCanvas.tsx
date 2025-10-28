/**
 * R3F Canvas wrapper with environment lighting and controls.
 * Thought Logic: Central 3D render target; drei helpers for quality lighting and intuitive navigation.
 */
'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Room from '@/features/room/Room'

export default function SceneCanvas() {
    return (
        <Canvas
            camera={{ position: [5, 5, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Room />

            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={3}
                maxDistance={20}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
            />

            <Environment preset="sunset" />
        </Canvas>
    )
}

