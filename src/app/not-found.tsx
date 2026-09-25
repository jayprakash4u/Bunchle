import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-20 lg:py-32">
      <Container className="text-center flex flex-col items-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          404 Error
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md text-base text-text-secondary leading-relaxed">
          The formulation or page you are searching for might have been moved, renamed, or is currently out of stock.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary" rightIcon={<ArrowRightIcon className="h-4 w-4" />}>
            Back to Homepage
          </Button>
          <Button href="/#bestsellers" variant="outline">
            Browse Bestsellers
          </Button>
        </div>
      </Container>
    </main>
  );
}
