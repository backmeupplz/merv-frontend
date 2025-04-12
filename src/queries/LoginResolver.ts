import { graphql } from 'gql.tada'

export const loginMutation = graphql(`
  mutation login($message: String!, $signature: String!, $nonce: String!) {
    login(message: $message, signature: $signature, nonce: $nonce) {
      token
    }
  }
`)
