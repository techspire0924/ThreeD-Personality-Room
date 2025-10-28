/**
 * Curated mood presets with hex colors and defaults.
 * Thought Logic: Centralize aesthetic presets for quick mood switching; exports pickPreset helper
 * to map vibes to palette/music combinations.
 */
import type { Vibe, Music, Palette } from './useMoodStore'

export interface MoodPreset {
    vibe: Vibe
    palette: Palette
    music: Music
    lightIntensity: number
    lightTint: string
}

export const moodPresets: Record<Vibe, MoodPreset> = {
    Calm: {
        vibe: 'Calm',
        palette: {
            primary: '#A8D5BA',
            accent: '#5B8E9D',
            bg: '#F5F8F7',
        },
        music: 'nature',
        lightIntensity: 0.6,
        lightTint: '#E8F4F0',
    },
    Chaotic: {
        vibe: 'Chaotic',
        palette: {
            primary: '#FF6B9D',
            accent: '#FF1744',
            bg: '#1A0B0F',
        },
        music: 'synthwave',
        lightIntensity: 1.2,
        lightTint: '#FFF0F0',
    },
    Dreamy: {
        vibe: 'Dreamy',
        palette: {
            primary: '#C8A2C8',
            accent: '#9370DB',
            bg: '#2D1B3D',
        },
        music: 'lofi',
        lightIntensity: 0.8,
        lightTint: '#F4E8FF',
    },
    Cyber: {
        vibe: 'Cyber',
        palette: {
            primary: '#00FFFF',
            accent: '#00E5FF',
            bg: '#001122',
        },
        music: 'synthwave',
        lightIntensity: 1.1,
        lightTint: '#E0FFFF',
    },
    Cozy: {
        vibe: 'Cozy',
        palette: {
            primary: '#FFB347',
            accent: '#FF8C42',
            bg: '#2C1810',
        },
        music: 'lofi',
        lightIntensity: 0.7,
        lightTint: '#FFF5E6',
    },
}

export function pickPreset(vibe: Vibe): MoodPreset {
    return moodPresets[vibe]
}

