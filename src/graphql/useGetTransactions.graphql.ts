import { gql, useQuery } from '@apollo/client'

const fetchTransactions = gql`
  query transactions(
    $where: SequelizeJSON
    $limit: Int
    $offset: Int
    $order: String
  ) {
    transactions: transaction(
      where: $where
      limit: $limit
      offset: $offset
      order: $order
    ) {
      id
      type
      createdAt
      donation {
        id
        firstName
        lastName
        amount
        createdAt
      }
    }
  }
`
export function useGetTransactions({
  where = {},
  limit = undefined,
  offset = undefined,
  order = 'reverse:createdAt'
}: {
  where?: any
  limit?: number
  offset?: number
  order?: string
}) {
  return useQuery(fetchTransactions, {
    variables: {
      where,
      limit,
      offset,
      order
    }
  })
}
