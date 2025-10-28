/**
 * Accessibility utilities for keyboard navigation and screen readers.
 * Thought Logic: Centralize a11y helpers to ensure consistent focus management and ARIA patterns.
 */

export function trapFocus(element: HTMLElement) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )

    const firstFocusable = focusableElements[0] as HTMLElement
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

    function handleTab(e: KeyboardEvent) {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus()
                e.preventDefault()
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus()
                e.preventDefault()
            }
        }
    }

    element.addEventListener('keydown', handleTab)

    return () => {
        element.removeEventListener('keydown', handleTab)
    }
}

export function announceToScreenReader(message: string) {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 1000)
}

