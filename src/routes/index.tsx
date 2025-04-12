import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Main,
})

function Main() {
  return <div>Hello "/merv"!</div>
}
