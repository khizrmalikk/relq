'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'always',
      capture_pageview: true,
      capture_pageleave: true,
      debug: true, // Enable debug mode to see events in console
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          // Log when PostHog is loaded
          console.log('PostHog loaded successfully');
        }
      }
    });

    // Test event to verify PostHog is working
    posthog.capture('posthog_initialized', {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      // Capture pageview with additional properties
      posthog.capture('$pageview', {
        '$current_url': url,
        '$pathname': pathname,
        '$host': window.location.hostname,
        timestamp: new Date().toISOString()
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('Pageview captured:', url);
      }
    }
  }, [pathname, searchParams, posthog])

  return null
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
} 