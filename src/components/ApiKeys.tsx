import miniAppSdk from '@farcaster/frame-sdk'
import { useQuery } from '@tanstack/react-query'
import useURQLClient from 'hooks/useURQLClient'
import { useCallback, useState } from 'preact/hooks'
import {
  createApiKey,
  deleteApiKey,
  getMyApiKeys,
} from 'queries/AccountResolver'
import toast from 'react-hot-toast'
import { useMutation } from 'urql'

export default function ApiKeys() {
  const [, createApiKeyMutation] = useMutation(createApiKey)
  const [createApiKeyLoading, setCreateApiKeyLoading] = useState(false)
  const [, deleteApiKeyMutation] = useMutation(deleteApiKey)
  const [deleteApiKeyLoading, setDeleteApiKeyLoading] = useState(false)

  const client = useURQLClient()
  const fetchApiKeys = useCallback(
    () => client.query(getMyApiKeys, {}).toPromise(),
    [client]
  )

  const { data: apiKeysData, refetch: refetchApiKeys } = useQuery({
    queryKey: ['myApiKeys'],
    queryFn: fetchApiKeys,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 10,
  })

  return (
    <div className="flex flex-col  w-full">
      <p className="font-bold text-xl mb-2">API Keys</p>
      <button
        className="btn btn-primary w-full"
        disabled={createApiKeyLoading}
        onClick={async () => {
          setCreateApiKeyLoading(true)
          try {
            const { data, error } = await createApiKeyMutation({})
            if (error) {
              throw new Error(error.message)
            }
            if (!data) {
              throw new Error('No data returned when creating API key')
            }
            const { token } = data.createApiKey
            void navigator.clipboard.writeText(token)
            toast.success('API key created and copied to clipboard!')
            await refetchApiKeys()
          } catch (error) {
            toast.error(`Error creating API key: ${error.message}`)
          } finally {
            setCreateApiKeyLoading(false)
          }
        }}
      >
        Add API key
      </button>
      <div className="flex flex-col w-full mt-4">
        {apiKeysData?.data?.getMyApiKeys?.map((apiKey) => (
          <span key={apiKey.id}>
            <div className="flex flex-row gap-2 justify-between items-center w-full ">
              <div className="flex flex-col">
                <div
                  className="cursor-pointer "
                  onClick={() => {
                    void navigator.clipboard.writeText(apiKey.token)
                    toast.success('API key copied to clipboard!')
                  }}
                >
                  ...{apiKey.token.slice(-5)}
                </div>
                <div className="font-light text-sm">
                  Last used: {apiKey.lastUsedAt || 'never'}
                </div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                disabled={deleteApiKeyLoading}
                onClick={async () => {
                  setDeleteApiKeyLoading(true)
                  try {
                    await deleteApiKeyMutation({
                      id: apiKey.id,
                    })
                    toast.success(`API key deleted successfully!`)
                    await refetchApiKeys()
                  } catch (error) {
                    toast.error(`Error claiming reward: ${error.message}`)
                  } finally {
                    setDeleteApiKeyLoading(false)
                  }
                }}
              >
                Delete
              </button>
            </div>
            <div className="divider w-full my-1" />
          </span>
        ))}
      </div>
      <p className="font-bold text-xl mb-2">Using API keys</p>
      <p>
        You can use your API key to authenticate with the API at{' '}
        <span
          className="underline font-semibold"
          onClick={() => miniAppSdk.actions.openUrl('https://backend.merv.fun')}
        >
          backend.merv.fun
        </span>
        . To do this, add the following header to your requests:
      </p>
      <code className="my-1">authorization: 123</code>
      <p>
        where "123" is your token. You can then copy the query you're trying to
        run and ask AI to translate it into a language of your choice!
      </p>
    </div>
  )
}
