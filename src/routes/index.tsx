import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import useURQLClient from 'hooks/useURQLClient'
import { useCallback } from 'preact/hooks'
import { getMeQuery } from 'queries/UserResolver'

export const Route = createFileRoute('/')({
  component: Main,
})

function Main() {
  const client = useURQLClient()
  const fetchMe = useCallback(
    () => client.query(getMeQuery, {}).toPromise(),
    [client]
  )
  const { data } = useQuery({
    queryKey: ['getMe'],
    queryFn: fetchMe,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: 10_000,
  })
  return (
    <div className="flex flex-col p-3 w-full items-center">
      <p className="font-bold text-2xl">Your $merv rewards:</p>
      <p className="font-extrabold text-6xl -mt-6">
        {data?.data?.getMe.unclaimedMerv === undefined
          ? '🤔'
          : Math.round(data?.data?.getMe.unclaimedMerv || 0)}
      </p>
      <p className="font-extrabold text-3xl -mt-20">$merv</p>
      <div className="flex flex-row flex-wrap gap-2">
        <Link to="/accounts">
          <button className="btn btn-primary">Get more $merv for free</button>
        </Link>
        <Link to="/merv">
          <button className="btn btn-primary">Mint $merv</button>
        </Link>
      </div>
    </div>
  )
}
