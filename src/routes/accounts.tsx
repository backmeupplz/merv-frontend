import { createFileRoute } from '@tanstack/react-router'
import { needsNewSignerAtom } from 'atoms/signerRequestAtom'
import AccountList from 'components/AccountList'
import { ModalName, showModal } from 'components/modals'
import { useSetAtom } from 'jotai'

export const Route = createFileRoute('/accounts')({
  component: RouteComponent,
})

function RouteComponent() {
  const setNeedsNewSigner = useSetAtom(needsNewSignerAtom)
  return (
    <div className="flex flex-col items-center h-full gap-2">
      <div>
        <span className="font-extrabold">Earn $merv</span> by adding more
        accounts below, and casting "it's merving time" from them!
      </div>
      <button
        className="btn btn-primary w-full"
        onClick={() => {
          setNeedsNewSigner(true)
          return showModal(ModalName.SignerRequest)
        }}
      >
        Add Account
      </button>
      <AccountList />
    </div>
  )
}
