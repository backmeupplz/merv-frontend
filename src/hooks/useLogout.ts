import { useNavigate } from '@tanstack/react-router'
import { useSetToken } from 'atoms/tokenAtom'
import { useCallback } from 'preact/hooks'

export default function useLogout() {
  const setToken = useSetToken()
  const navigate = useNavigate()
  const logout = useCallback(async () => {
    setToken('')
    await navigate({
      to: '/',
    })
  }, [navigate, setToken])
  return logout
}
