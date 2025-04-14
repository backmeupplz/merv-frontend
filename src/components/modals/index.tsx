import SignerRequest from 'components/modals/SignerRequest'

export enum ModalName {
  SignerRequest = 'signer_request_modal',
}

export function showModal(name: ModalName) {
  const modalElement = document.getElementById(name)
  if (!modalElement) {
    throw new Error(`Modal ${name} element not found`)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (modalElement as any).showModal()
}

export default function Modals() {
  return (
    <>
      <SignerRequest />
    </>
  )
}
