"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Application Error Boundary caught:", error);
  }, [error]);

  return (
    <main className="flex-1 flex items-center justify-center py-20 lg:py-32">
      <Container className="text-center flex flex-col items-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          System Notice
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md text-sm text-text-secondary leading-relaxed">
          We encountered an unexpected issue while preparing this view. Our team has been notified.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary">
            Try Again
          </Button>
          <Button href="/" variant="outline">
            Return Home
          </Button>
        </div>
      </Container>
    </main>
  );
}
