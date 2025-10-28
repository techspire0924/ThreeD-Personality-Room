/**
 * Predefined mood configurations with colors, lighting, and atmosphere.
 * Thought Logic: Centralize aesthetic presets for quick mood switching and consistency.
 */
export interface MoodPreset {
    id: string
    label: string
    description: string
    color: string
    lightIntensity: number
    fogColor: string
    fogDensity: number
}

export const moodPresets: MoodPreset[] = [
    {
        id: 'serene',
        label: 'Serene',
        description: 'Calm and peaceful atmosphere',
        color: '#7DD3C0',
        lightIntensity: 0.8,
        fogColor: '#E8F4F2',
        fogDensity: 0.05,
    },
    {
        id: 'energetic',
        label: 'Energetic',
        description: 'Vibrant and dynamic energy',
        color: '#FF6B6B',
        lightIntensity: 1.2,
        fogColor: '#FFF0F0',
        fogDensity: 0.08,
    },
    {
        id: 'focused',
        label: 'Focused',
        description: 'Clear and concentrated mindset',
        color: '#4ECDC4',
        lightIntensity: 1.0,
        fogColor: '#E6F7F5',
        fogDensity: 0.06,
    },
    {
        id: 'cozy',
        label: 'Cozy',
        description: 'Warm and comfortable feeling',
        color: '#FFA07A',
        lightIntensity: 0.6,
        fogColor: '#FFF5E6',
        fogDensity: 0.04,
    },
    {
        id: 'creative',
        label: 'Creative',
        description: 'Inspirational and expressive space',
        color: '#9B59B6',
        lightIntensity: 0.9,
        fogColor: '#F4E8FF',
        fogDensity: 0.07,
    },
]

export function getMoodPresetById(id: string): MoodPreset | undefined {
    return moodPresets.find((preset) => preset.id === id)
}

