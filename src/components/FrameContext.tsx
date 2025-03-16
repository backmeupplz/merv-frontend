import frameSdk, { Context } from '@farcaster/frame-sdk'
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'preact/compat'

export const FrameContext = createContext<Context.FrameContext | null>(null)

export default function FrameContextProvider({ children }: PropsWithChildren) {
  const [context, setContext] = useState<Context.FrameContext | null>(null)
  useEffect(() => {
    async function loadContext() {
      const context = await frameSdk.context
      setContext(context)
    }
    void loadContext()
  }, [])
  return (
    <FrameContext.Provider value={context}>{children}</FrameContext.Provider>
  )
}
