export default function LaunchMiniApp() {
  return (
    <>
      <p>
        for now <b>merv</b> is mini-app-first and can only be used on farcaster
      </p>
      <button
        className="btn btn-primary"
        onClick={() => {
          window.open(
            'https://warpcast.com/~/mini-apps/launch?domain=merv.fun',
            '_blank'
          )
        }}
      >
        launch merv
      </button>
    </>
  )
}
