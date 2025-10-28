/**
 * Intensity slider control component.
 * Thought Logic: Reusable slider for intensity control (0-1); accepts onChange prop.
 */
'use client'

interface IntensityControlProps {
    value: number
    onChange: (value: number) => void
}

export default function IntensityControl({ value, onChange }: IntensityControlProps) {
    return (
        <div>
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                aria-label="Adjust mood intensity"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Low</span>
                <span>High</span>
            </div>
        </div>
    )
}
