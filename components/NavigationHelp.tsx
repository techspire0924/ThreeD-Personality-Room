/**
 * Navigation help overlay showing available controls.
 * Thought Logic: Provides visual guidance for users to discover
 * all available navigation methods and keyboard shortcuts.
 */
'use client'

import { useState, useEffect } from 'react'

export default function NavigationHelp() {
    const [isVisible, setIsVisible] = useState(false)
    const [showKeyboard, setShowKeyboard] = useState(false)

    useEffect(() => {
        // Show help on first visit
        const hasSeenHelp = localStorage.getItem('mood-room-navigation-help')
        if (!hasSeenHelp) {
            setIsVisible(true)
            localStorage.setItem('mood-room-navigation-help', 'true')
        }
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed top-4 right-4 z-50 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 text-white max-w-sm">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold">🎮 Navigation Help</h3>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-gray-400 hover:text-white text-sm"
                    aria-label="Close help"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-2 text-xs">
                <div>
                    <strong>Mouse:</strong>
                    <ul className="ml-2 mt-1 space-y-1">
                        <li>• Left drag: Rotate view</li>
                        <li>• Right drag: Pan view</li>
                        <li>• Scroll: Zoom in/out</li>
                    </ul>
                </div>

                <div>
                    <strong>Keyboard:</strong>
                    <ul className="ml-2 mt-1 space-y-1">
                        <li>• WASD: Move camera (inside room)</li>
                        <li>• Q/E: Move up/down (inside room)</li>
                        <li>• Arrow keys: Rotate X/Y axes</li>
                        <li>• Page Up/Down: Rotate Z axis</li>
                        <li>• R: Reset camera</li>
                    </ul>
                </div>

                <div className="pt-2 border-t border-gray-700">
                    <button
                        onClick={() => setShowKeyboard(!showKeyboard)}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                        {showKeyboard ? 'Hide' : 'Show'} keyboard shortcuts
                    </button>
                </div>

                {showKeyboard && (
                    <div className="mt-2 p-2 bg-gray-800 rounded text-xs">
                        <div className="grid grid-cols-2 gap-1">
                            <div>W: Forward</div>
                            <div>S: Backward</div>
                            <div>A: Left</div>
                            <div>D: Right</div>
                            <div>Q: Up</div>
                            <div>E: Down</div>
                            <div>↑: Rotate X-</div>
                            <div>↓: Rotate X+</div>
                            <div>←: Rotate Y-</div>
                            <div>→: Rotate Y+</div>
                            <div>PgUp: Rotate Z-</div>
                            <div>PgDn: Rotate Z+</div>
                            <div>R: Reset</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
