import { graphql } from 'gql.tada'

export const getMeQuery = graphql(`
  query getMe {
    getMe {
      fid
      unclaimedMerv
    }
  }
`)
