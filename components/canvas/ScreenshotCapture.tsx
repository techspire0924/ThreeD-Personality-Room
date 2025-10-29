/**
 * Enhanced screenshot functionality for R3F scenes.
 * Thought Logic: Uses R3F's built-in screenshot capabilities and WebGL pixel reading
 * for reliable screenshot capture of 3D scenes.
 */
'use client'

import { useThree } from '@react-three/fiber'
import { useRef } from 'react'

interface ScreenshotProps {
    onScreenshot?: (dataURL: string) => void
}

export function ScreenshotCapture({ onScreenshot }: ScreenshotProps) {
    const { gl, scene, camera } = useThree()
    const screenshotRef = useRef<HTMLCanvasElement>(null)

    const captureScreenshot = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            try {
                // Render the scene to ensure it's up to date
                gl.render(scene, camera)

                // Get the canvas and WebGL context
                const canvas = gl.domElement
                const webglContext = canvas.getContext('webgl') || canvas.getContext('webgl2')

                if (!webglContext) {
                    reject(new Error('WebGL context not found'))
                    return
                }

                const width = canvas.width
                const height = canvas.height

                // Create a temporary canvas for processing
                const tempCanvas = document.createElement('canvas')
                tempCanvas.width = width
                tempCanvas.height = height
                const tempCtx = tempCanvas.getContext('2d')

                if (!tempCtx) {
                    reject(new Error('Could not create 2D context'))
                    return
                }

                // Read pixels from WebGL
                const pixels = new Uint8Array(width * height * 4)
                webglContext.readPixels(0, 0, width, height, webglContext.RGBA, webglContext.UNSIGNED_BYTE, pixels)

                // Flip the image vertically (WebGL has Y-axis flipped)
                const flippedPixels = new Uint8ClampedArray(width * height * 4)
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const srcIndex = (y * width + x) * 4
                        const dstIndex = ((height - 1 - y) * width + x) * 4
                        flippedPixels[dstIndex] = pixels[srcIndex]     // R
                        flippedPixels[dstIndex + 1] = pixels[srcIndex + 1] // G
                        flippedPixels[dstIndex + 2] = pixels[srcIndex + 2] // B
                        flippedPixels[dstIndex + 3] = pixels[srcIndex + 3] // A
                    }
                }

                // Create ImageData and put it on the temporary canvas
                const imageData = new ImageData(flippedPixels, width, height)
                tempCtx.putImageData(imageData, 0, 0)

                // Convert to data URL
                const dataURL = tempCanvas.toDataURL('image/png')
                resolve(dataURL)
            } catch (error) {
                reject(error)
            }
        })
    }

    // Expose the capture function globally for the toolbar to use
    if (typeof window !== 'undefined') {
        ; (window as any).captureScreenshot = captureScreenshot
    }

    return null
}
