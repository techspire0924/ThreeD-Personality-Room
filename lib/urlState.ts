/**
 * URL search params sync for shareable mood configurations.
 * Thought Logic: Keep URL in sync with mood store for deep linking; serialize/deserialize on change.
 */
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function useURLState(key: string) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentValue = searchParams.get(key)

    const setURLValue = (value: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    return [currentValue, setURLValue] as const
}

/**
 * Hook to sync a value with URL search params.
 */
export function useSyncWithURL(
    key: string,
    value: string | undefined,
    setValue: (v: string) => void
) {
    const searchParams = useSearchParams()

    useEffect(() => {
        const urlValue = searchParams.get(key)
        if (urlValue && urlValue !== value) {
            setValue(urlValue)
        }
    }, [searchParams, key, value, setValue])
}

