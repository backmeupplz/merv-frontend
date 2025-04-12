import { createRootRoute, Outlet } from '@tanstack/react-router'
import Navbar from 'components/Navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="container prose mx-auto max-w-prose pt-4 pb-16 px-3">
        <Outlet />
      </div>
      {/* <Dock /> */}
    </>
  ),
})
