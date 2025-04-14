import { graphql } from 'gql.tada'

export const requestSignerDeepLink = graphql(`
  mutation requestSignerDeepLink {
    requestSignerDeepLink {
      id
      deepLink
    }
  }
`)

export const getSignerRequest = graphql(`
  query getSignerRequest($id: String!) {
    getSignerRequest(id: $id) {
      id
      status
    }
  }
`)

export const getMySignerRequests = graphql(`
  query getMySignerRequests {
    getMySignerRequests {
      id
      status
      createdAt
      updatedAt
    }
  }
`)

export const getMySigners = graphql(`
  query getMySigners {
    getMySigners {
      id
      fid
      username
      castCompleted
    }
  }
`)

export const claimMervReward = graphql(`
  mutation claimMervReward($signerId: String!) {
    claimMervReward(signerId: $signerId) {
      id
      amount
    }
  }
`)
