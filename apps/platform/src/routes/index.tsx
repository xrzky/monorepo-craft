import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section>
      <h1>Home</h1>
      <p>React + Vite + TanStack Router with file-based routing.</p>
    </section>
  );
}
