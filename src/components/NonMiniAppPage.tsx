import { useContext } from 'preact/hooks'
import { MiniAppContext } from './MiniAppContext'

export default function NonMiniAppPage() {
  const { ready } = useContext(MiniAppContext)
  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center p-4 bg-primary
    "
    >
      <p className="font-extrabold text-4xl">merv</p>
      <p className="text-primary-content">the farcaster client</p>
      {ready && (
        <button
          className="btn btn-secondary mt-4"
          onClick={() => {
            window.open(
              'https://farcaster.xyz/miniapps/5HjQbj18YBrE/merv',
              '_blank'
            )
          }}
        >
          Launch the Mini App
        </button>
      )}
    </div>
  )
}
