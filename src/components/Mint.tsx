import frameSdk, { Context } from '@farcaster/frame-sdk'
import mervAbi from 'helpers/mervAbi'
import { useState } from 'preact/hooks'
import toast from 'react-hot-toast'
import { parseUnits } from 'viem'
import { base } from 'viem/chains'
import { useWriteContract } from 'wagmi'

export default function Mint({
  frameContext,
}: {
  frameContext: Context.FrameContext
}) {
  const [amount, setAmount] = useState(0)
  const { writeContractAsync } = useWriteContract()
  return (
    <>
      {!frameContext.client.added && (
        <>
          <p>
            add frame to get notified when <b>merv</b> launches
          </p>
          <button
            className="btn btn-primary mb-8"
            onClick={() => {
              return frameSdk.actions.addFrame()
            }}
          >
            add frame
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
      <button
        className="btn btn-primary"
        onClick={async () => {
          try {
            const accounts = await frameSdk.wallet.ethProvider.request({
              method: 'eth_requestAccounts',
            })
            const account = accounts[0]
            if (!account) {
              throw new Error('No account found')
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
    </>
  )
}
