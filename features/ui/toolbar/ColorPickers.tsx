/**
 * Color picker controls for palette customization.
 * Thought Logic: Accepts palette and onChange; allows custom color selection.
 */
'use client'

import type { Palette } from '../../mood/useMoodStore'

interface ColorPickersProps {
    palette: Palette
    onChange: (palette: Palette) => void
}

export default function ColorPickers({ palette, onChange }: ColorPickersProps) {
    const updateColor = (key: keyof Palette, value: string) => {
        onChange({ ...palette, [key]: value })
    }

    return (
        <div className="space-y-3">
            <div>
                <label className="block text-xs text-gray-400 mb-1">Primary</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={palette.primary}
                        onChange={(e) => updateColor('primary', e.target.value)}
                        className="w-8 h-8 rounded border border-gray-600"
                        aria-label="Primary color"
                    />
                    <span className="text-xs text-gray-300">{palette.primary}</span>
                </div>
            </div>
            <div>
                <label className="block text-xs text-gray-400 mb-1">Accent</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={palette.accent}
                        onChange={(e) => updateColor('accent', e.target.value)}
                        className="w-8 h-8 rounded border border-gray-600"
                        aria-label="Accent color"
                    />
                    <span className="text-xs text-gray-300">{palette.accent}</span>
                </div>
            </div>
            <div>
                <label className="block text-xs text-gray-400 mb-1">Background</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={palette.bg}
                        onChange={(e) => updateColor('bg', e.target.value)}
                        className="w-8 h-8 rounded border border-gray-600"
                        aria-label="Background color"
                    />
                    <span className="text-xs text-gray-300">{palette.bg}</span>
                </div>
            </div>
        </div>
    )
}
