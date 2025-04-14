import miniAppSdk from '@farcaster/frame-sdk'
import { useQuery } from '@tanstack/react-query'
import {
  needsNewSignerAtom,
  signerRequestIdAtom,
} from 'atoms/signerRequestAtom'
import { ModalName } from 'components/modals'
import useURQLClient from 'hooks/useURQLClient'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'preact/hooks'
import {
  getSignerRequest,
  requestSignerDeepLink,
} from 'queries/AccountResolver'
import toast from 'react-hot-toast'
import QRCode from 'react-qr-code'
import { useMutation } from 'urql'

export default function SignerRequest() {
  const [, requestSigner] = useMutation(requestSignerDeepLink)
  const [deepLink, setDeepLink] = useState<string | null>(null)
  const client = useURQLClient()
  const [needsNewSigner, setNeedsNewSigner] = useAtom(needsNewSignerAtom)
  const [signerRequestId, setSignerRequestId] = useAtom(signerRequestIdAtom)
  useEffect(() => {
    async function request() {
      try {
        const { data, error } = await requestSigner({})
        if (error) {
          throw new Error(error.message)
        }
        if (!data) {
          throw new Error('No data returned when requesting a signer')
        }
        const { deepLink, id } = data.requestSignerDeepLink
        setDeepLink(deepLink)
        setSignerRequestId(id)
      } catch (error) {
        toast.error(`Error requesting signer deep link: ${error.message}`)
      }
    }
    if (needsNewSigner) {
      setSignerRequestId(null)
      setDeepLink(null)
      setNeedsNewSigner(false)
      void request()
    }
  }, [requestSigner, needsNewSigner, setNeedsNewSigner, setSignerRequestId])

  const fetchSignerRequestStatus = useCallback(
    () =>
      client
        .query(getSignerRequest, { id: signerRequestId || 'invalid' })
        .toPromise(),
    [client, signerRequestId]
  )

  const { data: signerRequestData } = useQuery({
    queryKey: ['signerRequestStatus', signerRequestId || ''],
    queryFn: fetchSignerRequestStatus,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 5,
    enabled: !!signerRequestId,
  })

  const signerSigned =
    signerRequestData?.data?.getSignerRequest.status === 'SIGNED'

  return (
    <dialog id={ModalName.SignerRequest} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add an account</h3>
        <p className="py-4">
          Scan the QR code below or use the link to add any account to merv. In
          fact, add as many accounts as you want!
        </p>
        {!!deepLink && !signerSigned ? (
          <div className="flex flex-col items-center gap-2">
            <QRCode value={deepLink} />
            <p>
              Or{' '}
              <a
                onClick={() => miniAppSdk.actions.openUrl(deepLink)}
                className="cursor-pointer underline"
              >
                open this URL
              </a>{' '}
              if you're on mobile.
            </p>
          </div>
        ) : !signerSigned ? (
          <p>Loading...</p>
        ) : (
          <p>Successfully added the account! You can close this popup.</p>
        )}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
