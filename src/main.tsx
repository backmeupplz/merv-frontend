import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import MiniAppContextProvider from 'components/MiniAppContext'
import queryClient from 'helpers/reactQueryConfig'
import useURQLClient from 'hooks/useURQLClient'
import { render } from 'preact'
import { Toaster } from 'react-hot-toast'
import { routeTree } from 'routeTree.gen'
import { Provider as UrqlProvider } from 'urql'

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

// Register things for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function RootGQLWrapper({ children }: { children: React.ReactNode }) {
  const client = useURQLClient()

  return <UrqlProvider value={client}>{children}</UrqlProvider>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  render(
    <RootGQLWrapper>
      <QueryClientProvider client={queryClient}>
        <MiniAppContextProvider>
          <Toaster />
          <RouterProvider router={router} />
        </MiniAppContextProvider>
      </QueryClientProvider>
    </RootGQLWrapper>,
    rootElement
  )
}
