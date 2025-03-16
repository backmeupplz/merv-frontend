import { graphql } from 'gql.tada'

export const loginWithPasswordMutation = graphql(`
  mutation loginWithPassword($password: String!) {
    loginWithPassword(password: $password)
  }
`)
