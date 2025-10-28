/**
 * Analytics event tracking stub. TODO: Integrate with Sentry or preferred service.
 * Thought Logic: Centralized event logging for debugging and user behavior insights.
 */

export interface AnalyticsEvent {
    action: string
    category: string
    label?: string
    value?: number
}

export function trackEvent(event: AnalyticsEvent) {
    if (typeof window === 'undefined') return

    // TODO: Integrate with analytics service
    console.log('[Analytics]', event)

    // Example implementations:
    // - gtag('event', event.action, { event_category: event.category, event_label: event.label })
    // - sentry.captureMessage(`Event: ${event.action}`, { extra: event })
}

export function trackPageView(path: string) {
    trackEvent({
        action: 'pageview',
        category: 'navigation',
        label: path,
    })
}

export function trackMoodChange(moodId: string) {
    trackEvent({
        action: 'mood_change',
        category: 'interaction',
        label: moodId,
    })
}

