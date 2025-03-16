export default function () {
  return (
    <>
      <p>
        for now <b>merv</b> is frame-first and can only be used on farcaster
      </p>
      <button
        className="btn btn-primary"
        onClick={() => {
          window.open(
            'https://warpcast.com/~/frames/launch?domain=merv.fun',
            '_blank'
          )
        }}
      >
        launch merv
      </button>
    </>
  )
}
