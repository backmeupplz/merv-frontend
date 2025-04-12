import { base } from 'viem/chains'
import { createConfig, http } from 'wagmi'

export default createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})
