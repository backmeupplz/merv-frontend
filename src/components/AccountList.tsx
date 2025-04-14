import { useQuery } from '@tanstack/react-query'
import useURQLClient from 'hooks/useURQLClient'
import { useCallback, useState } from 'preact/hooks'
import { claimMervReward, getMySigners } from 'queries/AccountResolver'
import toast from 'react-hot-toast'
import { useMutation } from 'urql'

export default function AccountList() {
  const client = useURQLClient()
  const fetchSigners = useCallback(
    () => client.query(getMySigners, {}).toPromise(),
    [client]
  )

  const { data: signersData, refetch } = useQuery({
    queryKey: ['mySigners'],
    queryFn: fetchSigners,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 10,
  })

  const [, claimMervRewardMutation] = useMutation(claimMervReward)
  const [claiming, setClaiming] = useState(false)

  return (
    <div className="flex flex-col w-full mt-4">
      {signersData?.data?.getMySigners?.map((signer) => (
        <span key={signer.id}>
          <div className="flex flex-row gap-2 justify-between items-center w-full ">
            <span className="font-extrabold">{signer.username}</span>
            <button
              className="btn btn-secondary btn-sm"
              disabled={signer.castCompleted || claiming}
              onClick={async () => {
                setClaiming(true)
                try {
                  const reward = await claimMervRewardMutation({
                    signerId: signer.id,
                  })
                  toast.success(
                    `You got +${reward.data?.claimMervReward.amount} $merv!`
                  )
                } catch (error) {
                  toast.error(`Error claiming reward: ${error.message}`)
                } finally {
                  setClaiming(false)
                }
              }}
            >
              {signer.castCompleted
                ? 'Reward claimed!'
                : claiming
                  ? 'Claiming'
                  : 'Claim reward'}
            </button>
          </div>
          <div className="divider w-full my-1" />
        </span>
      ))}
    </div>
  )
}
