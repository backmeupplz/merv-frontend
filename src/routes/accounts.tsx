import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/accounts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="font-extrabold text-6xl">Soon</div>
}
