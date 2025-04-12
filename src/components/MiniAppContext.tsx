import miniAppSdk, { Context } from '@farcaster/frame-sdk'
import { useSetToken } from 'atoms/tokenAtom'
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'preact/compat'
import { loginMutation } from 'queries/LoginResolver'
import toast from 'react-hot-toast'
import { useMutation } from 'urql'

export const MiniAppContext = createContext<{
  context: Context.FrameContext | null
  ready: boolean
  authenticated: boolean
}>({ context: null, ready: false, authenticated: false })

export default function MiniAppContextProvider({
  children,
}: PropsWithChildren) {
  const [context, setContext] = useState<Context.FrameContext | null>(null)
  const [ready, setReady] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [, login] = useMutation(loginMutation)
  const setToken = useSetToken()
  useEffect(() => {
    async function loginToMerv(context?: Context.FrameContext) {
      if (!context?.user.fid) {
        return
      }
      const nonce = Math.random().toString(36).substring(2, 17)
      try {
        const { signature, message } = await miniAppSdk.actions.signIn({
          nonce,
        })
        const { data, error } = await login({
          nonce,
          signature,
          message,
        })
        if (error) {
          throw new Error(error.message)
        }
        if (!data) {
          throw new Error('No data returned from login')
        }
        setToken(data.login.token)
        setAuthenticated(true)
      } catch (error) {
        console.error('Error signing in:', error)
        toast.error(`Error signing in: ${error.message}`)
        setAuthenticated(false)
      } finally {
        setReady(true)
        await miniAppSdk.actions.ready()
      }
    }
    async function loadContext() {
      const context = await miniAppSdk.context
      await loginToMerv(context)
      setContext(context)
    }
    void loadContext()
  }, [login, setToken])
  return (
    <MiniAppContext.Provider value={{ context, ready, authenticated }}>
      {children}
    </MiniAppContext.Provider>
  )
}
