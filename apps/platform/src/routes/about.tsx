import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <p>
        This route lives at <code>src/routes/about.tsx</code> and is picked up
        automatically by the TanStack Router Vite plugin.
      </p>
    </section>
  );
}
