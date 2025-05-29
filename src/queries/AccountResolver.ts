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
      proCastCompleted
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

export const claimProReward = graphql(`
  mutation claimProReward($signerId: String!) {
    claimProReward(signerId: $signerId) {
      id
      amount
    }
  }
`)

export const createApiKey = graphql(`
  mutation createApiKey {
    createApiKey {
      id
      createdAt
      updatedAt
      token
    }
  }
`)

export const getMyApiKeys = graphql(`
  query getMyApiKeys {
    getMyApiKeys {
      id
      createdAt
      updatedAt
      token
      userAgent
      lastUsedAt
    }
  }
`)

export const deleteApiKey = graphql(`
  mutation deleteApiKey($id: String!) {
    deleteApiKey(id: $id)
  }
`)
