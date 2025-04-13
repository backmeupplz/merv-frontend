import { createRootRoute, Outlet } from '@tanstack/react-router'
import Dock from 'components/Dock'
import { MiniAppContext } from 'components/MiniAppContext'
import Navbar from 'components/Navbar'
import NonMiniAppPage from 'components/NonMiniAppPage'
import { useContext } from 'preact/hooks'

function Root() {
  const miniAppContext = useContext(MiniAppContext)
  return miniAppContext.context?.user.fid ? (
    <>
      <Navbar />
      <div className="container prose mx-auto max-w-prose pt-4 pb-16 px-3">
        <Outlet />
      </div>
      <Dock />
    </>
  ) : (
    <NonMiniAppPage />
  )
}

export const Route = createRootRoute({
  component: () => <Root />,
})
