import { TransactionType } from '../customTypes'
import { useGetTransactions } from '../graphql/useGetTransactions.graphql'
import { TransactionRow } from './transactionRow'
import { useTransactionReducer } from '../useTransactionReducer'
import { TransactionHeader } from './transactionHeader'

export function TransactionPage() {
  const { state, dispatch } = useTransactionReducer()

  const { data, loading, error, refetch } = useGetTransactions({
    order: state.order.value,
    where: {
      type: state.paymentType.value,
      donation: {
        firstName: {
          like: `%${state.search}%`
        }
      }
    },
    limit: state.pagination.value,
    offset: state.pagination.value * (state.currentPage.value - 1)
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-column w-100 h-100 pa4">
      <TransactionHeader
        transactionsCount={data?.transactionsCount}
        state={state}
        dispatch={dispatch}
        refetch={refetch}
      />
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
