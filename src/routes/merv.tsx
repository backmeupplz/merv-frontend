import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/merv')({
  component: Main,
})

function Main() {
  return <div>Hello "/merv"!</div>
}
