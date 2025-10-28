import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
    title: 'Mood Room - 3D Personality Configurator',
    description: 'Visualize and configure your personality in 3D space',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    )
}

