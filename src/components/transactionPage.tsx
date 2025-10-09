import { TransactionType } from '../customTypes'
import { useGetTransactions } from '../graphql/useGetTransactions.graphql'
import { TransactionRow } from './transactionRow'

export function TransactionPage() {
  const { data, loading, error } = useGetTransactions({
    order: 'reverse:createdAt'
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-column w-100 h-100 pa4">
      <div className="flex flex-row pa2" style={{ gap: 8 }}>
        <div className="w-20">First Name</div>
        <div className="w-20">Last Name</div>
        <div className="w-20">Amount</div>
        <div className="w-20">Type</div>
        <div className="w-20">Done At</div>
      </div>
      {!error &&
        data?.transactions?.map((transaction: TransactionType) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
    </div>
  )
}
