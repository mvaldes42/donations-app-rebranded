import { TransactionType } from '../customTypes'
import { useGetTransactions } from '../graphql/useGetTransactions.graphql'
import { TransactionRow } from './transactionRow'
import {
  useTransactionReducer,
  ORDER_SELECT_OPTIONS,
  PAYMENT_TYPE_SELECT_OPTIONS
} from '../useTransactionReducer'
import Select from 'react-select'

export function TransactionPage() {
  const { state, dispatch } = useTransactionReducer()

  const { data, loading, error, refetch } = useGetTransactions({
    order: state.order.value,
    where: {
      type: state.paymentType.value
    }
  })

  if (loading) {
    return <div>Loading...</div>
  }

  // with the filters on the top
  function TransactionHeader() {
    return (
      <div className="flex flex-row pa2" style={{ gap: 8 }}>
        <Select
          options={ORDER_SELECT_OPTIONS}
          value={state.order}
          onChange={option => {
            console.log('option', option)
            if (!option) return
            dispatch({
              payload: { order: option }
            })
            refetch({ order: option.value })
          }}
        />
        <Select
          options={PAYMENT_TYPE_SELECT_OPTIONS}
          value={state.paymentType}
          onChange={option => {
            dispatch({ payload: { paymentType: option } })
            refetch({ where: { type: option.value } })
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-column w-100 h-100 pa4">
      <TransactionHeader />
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
