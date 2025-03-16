import { base } from 'viem/chains'
import { http, createConfig } from 'wagmi'

export default createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})
