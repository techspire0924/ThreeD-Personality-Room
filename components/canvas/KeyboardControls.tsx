/**
 * Keyboard controls for precise 3D navigation.
 * Thought Logic: Provides WASD + QE + Arrow keys for precise camera movement
 * and rotation around all three axes (X, Y, Z).
 */
'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export function KeyboardControls() {
    const { camera } = useThree()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Don't trigger if typing in input
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return
            }

            const speed = 0.05 // Slower movement for better control
            const rotationSpeed = 0.02 // Slower rotation

            // Strict room boundaries (room is 10x6x10, centered at origin)
            const roomBounds = {
                minX: -3.5, // Keep well inside walls
                maxX: 3.5,
                minY: 0.5,  // Above floor
                maxY: 4.5, // Below ceiling
                minZ: -3.5,
                maxZ: 3.5
            }

            switch (event.key.toLowerCase()) {
                // Movement (WASD + QE) with room boundaries
                case 'w':
                    camera.position.z = Math.max(roomBounds.minZ, camera.position.z - speed)
                    break
                case 's':
                    camera.position.z = Math.min(roomBounds.maxZ, camera.position.z + speed)
                    break
                case 'a':
                    camera.position.x = Math.max(roomBounds.minX, camera.position.x - speed)
                    break
                case 'd':
                    camera.position.x = Math.min(roomBounds.maxX, camera.position.x + speed)
                    break
                case 'q':
                    camera.position.y = Math.min(roomBounds.maxY, camera.position.y + speed)
                    break
                case 'e':
                    camera.position.y = Math.max(roomBounds.minY, camera.position.y - speed)
                    break

                // Arrow keys for rotation (very limited to keep camera stable)
                case 'arrowup':
                    camera.rotation.x = Math.max(-Math.PI / 4, camera.rotation.x - rotationSpeed)
                    break
                case 'arrowdown':
                    camera.rotation.x = Math.min(Math.PI / 4, camera.rotation.x + rotationSpeed)
                    break
                case 'arrowleft':
                    camera.rotation.y -= rotationSpeed
                    break
                case 'arrowright':
                    camera.rotation.y += rotationSpeed
                    break

                // Z-axis rotation (very limited)
                case 'pageup':
                    camera.rotation.z = Math.max(-Math.PI / 12, camera.rotation.z - rotationSpeed)
                    break
                case 'pagedown':
                    camera.rotation.z = Math.min(Math.PI / 12, camera.rotation.z + rotationSpeed)
                    break

                // Reset camera to exact center of room
                case 'r':
                    camera.position.set(0, 1.6, 0)
                    camera.rotation.set(0, 0, 0)
                    camera.lookAt(0, 1.6, 0)
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [camera])

    return null
}
