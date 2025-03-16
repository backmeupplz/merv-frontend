import UserCount from 'components/UserCount'
import { Suspense } from 'preact/compat'

export default function () {
  return (
    <div className="container prose mx-auto max-w-prose p-10">
      <h1>Merv</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UserCount />
      </Suspense>
    </div>
  )
}
