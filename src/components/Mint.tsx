import frameSdk, { Context } from '@farcaster/frame-sdk'
import mervAbi from 'helpers/mervAbi'
import { useState } from 'preact/hooks'
import toast from 'react-hot-toast'
import { parseUnits } from 'viem'
import { base } from 'viem/chains'
import {
  useAccount,
  useChainId,
  useConnect,
  useSwitchChain,
  useWriteContract,
} from 'wagmi'

export default function Mint({
  miniAppContext,
}: {
  miniAppContext: Context.FrameContext
}) {
  const [amount, setAmount] = useState(0)
  const { writeContractAsync } = useWriteContract()
  const account = useAccount()
  const { connectors, connectAsync } = useConnect()
  const chainId = useChainId()
  const { switchChainAsync } = useSwitchChain()
  return (
    <>
      {!miniAppContext.client.added && (
        <>
          <p>
            add mini app to get notified when <b>merv</b> launches
          </p>
          <button
            className="btn btn-primary mb-8"
            onClick={() => {
              return frameSdk.actions.addFrame()
            }}
          >
            add mini app
          </button>
        </>
      )}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          How much <b>ETH</b> to spend
        </legend>
        <input
          type="number"
          className="input"
          placeholder="42690"
          value={amount}
          onInput={(e) => setAmount(+(e.target as HTMLInputElement).value)}
        />
        <p className="fieldset-label">
          It will get you <b>{Math.floor(amount * 10500)} $merv</b>
        </p>
      </fieldset>
      <div className="flex flex-row gap-2">
        <button
          className="btn btn-primary"
          disabled={!amount}
          onClick={async () => {
            try {
              if (!connectors[0]) {
                toast.error('No connector found')
                return
              }
              if (!account.isConnected) {
                const connectResult = await connectAsync({
                  connector: connectors[0],
                  chainId: base.id,
                })

                if (!connectResult.accounts.length) {
                  toast.error('Unable to connect: no addresses')
                  return
                }
              }
              if (chainId !== base.id) {
                await switchChainAsync({ chainId: base.id })
              }
              await writeContractAsync({
                abi: mervAbi,
                address: '0xdf65A4E7DAE495Cb42F5A1E9A7f89032542684Ba',
                functionName: 'mint',
                value: parseUnits(amount.toString(), 18),
                chain: base,
              })
              toast.success(`Minted ${amount} $merv`, { duration: 5000 })
            } catch (error) {
              console.error(error)
              toast.error(`Failed to mint: ${error.message}`)
            }
          }}
        >
          Mint
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            const encodedText = encodeURIComponent("It's merving time!")
            const encodedUrl = encodeURIComponent('https://merv.fun')
            const warpcastUrl = `https://farcaster.xyz/~/compose?text=${encodedText}&embeds[]=${encodedUrl}`
            return frameSdk.actions.openUrl(warpcastUrl)
          }}
        >
          merv it?
        </button>
      </div>
    </>
  )
}
