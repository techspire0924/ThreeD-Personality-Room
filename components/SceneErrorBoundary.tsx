/**
 * 3D Scene Error Boundary with fallback for R3F components.
 * Thought Logic: Catches 3D rendering errors and provides static fallback;
 * prevents WebGL crashes from breaking the entire app.
 */
'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class SceneErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('SceneErrorBoundary caught a 3D rendering error:', error, errorInfo)

        // Log WebGL-specific errors
        if (error.message.includes('WebGL') || error.message.includes('canvas')) {
            console.warn('WebGL/Canvas error detected - falling back to static scene')
        }
    }

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default 3D scene fallback
            return (
                <div className="w-full h-full bg-gray-950 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                        <div className="text-6xl mb-4">🎨</div>
                        <h3 className="text-xl font-semibold mb-2">3D Scene Unavailable</h3>
                        <p className="text-gray-400 mb-4">
                            Your device doesn&apos;t support 3D rendering or there was an error.
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                            Try Again
                        </button>
                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-4 text-left">
                                <summary className="cursor-pointer text-xs text-gray-500 mb-1">
                                    Error Details
                                </summary>
                                <pre className="text-xs bg-gray-800 p-2 rounded overflow-auto">
                                    {this.state.error?.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
