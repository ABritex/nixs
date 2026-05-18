import { createFileRoute } from '@tanstack/react-router'
import { Contact } from "@/features/contact"

export const Route = createFileRoute('/contact-me')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-20">
      <Contact />
    </main>
  )
}
