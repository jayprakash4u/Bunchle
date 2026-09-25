import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="flex-1 py-12">
      <Container>
        {/* Hero skeleton */}
        <div className="skeleton-shimmer h-[380px] w-full rounded-2xl mb-12" />

        {/* Section title skeleton */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="skeleton-shimmer h-4 w-32 rounded" />
          <div className="skeleton-shimmer h-8 w-64 rounded" />
        </div>

        {/* Cards skeleton grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3 rounded-card border border-border p-4 bg-surface">
              <div className="skeleton-shimmer aspect-square w-full rounded-lg" />
              <div className="skeleton-shimmer h-4 w-2/3 rounded" />
              <div className="skeleton-shimmer h-3 w-full rounded" />
              <div className="skeleton-shimmer h-8 w-full rounded mt-2" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
