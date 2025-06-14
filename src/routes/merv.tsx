import { createFileRoute } from '@tanstack/react-router'
import { MiniAppContext } from 'components/MiniAppContext'
import Mint from 'components/Mint'
import { useContext } from 'preact/hooks'

export const Route = createFileRoute('/merv')({
  component: RouteComponent,
})

function RouteComponent() {
  const { context } = useContext(MiniAppContext)

  return (
    <div className="prose">
      <p>hi frens! @borodutch here. You may know me as warpcastadmin.eth too</p>
      <p>
        i'm working on <b>merv</b>, a mini-app-first farcaster client for power
        users; the goal is for it to be the primary way of consuming farcaster,
        but no auth or anything required: launch warpcast, then launch{' '}
        <b>merv</b> right away as a mini app
      </p>
      <ul>
        <li>multiaccount-first</li>
        <li>scheduled casts</li>
        <li>anoncasting</li>
        <li>no downtime</li>
        <li>keyword search/subs</li>
        <li>meaningful notifs</li>
        <li>coin/nft alpha</li>
        <li>anything else a power user might want</li>
      </ul>
      <p>you guys know i can build stuff, and this is no different</p>
      <p>
        expand-bags-to-use model requiring users to purchase more $merv every
        month to keep using merv, first 2 months worth of <b>$merv</b>{' '}
        airdropped to top-10k farcaster users
      </p>
      <h3>
        your honor, <b>$merv</b> is a memecoin without any intrinsic value
        besides acting as a collectible
      </h3>
      <p>
        here's the tl;dr of <b>$merv</b>
      </p>
      <ul>
        <li>
          there're 6,942,000 <b>$merv</b> to be minted
        </li>
        <li>
          1,000,000 <b>$merv</b> is pre-minted to go into lp when <b>merv</b>{' '}
          launches
        </li>
        <li>
          you get 8925 <b>$merv</b> for 1 eth
        </li>
        <li>
          50% of eth goes into lp when <b>merv</b> launches
        </li>
        <li>
          2 months worth of <b>$merv</b> will be airdropped to top-10k farcaster
          users when <b>merv</b> launches
        </li>
        <li>
          1 month will cost $10 worth of <b>$merv</b> (this can change)
        </li>
        <li>
          if you sold <b>$merv</b> you lose access to <b>merv</b> until you buy
          back (the threshold will always be in <b>$merv</b>, increasing monthly
          by the current value of $10 in <b>$merv</b>)
        </li>
      </ul>
      <h2>
        Mint <b>$merv</b>
      </h2>
      {context && <Mint miniAppContext={context} />}
    </div>
  )
}
