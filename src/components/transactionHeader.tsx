import { useEffect, useState } from 'react'
import {
  ORDER_SELECT_OPTIONS,
  PAYMENT_TYPE_SELECT_OPTIONS,
  PAGINATION_SELECT_OPTIONS
} from '../useTransactionReducer'
import Select from 'react-select'

export function TransactionHeader({
  transactionsCount,
  state,
  dispatch,
  refetch
}: {
  transactionsCount: number
  state: any
  dispatch: any
  refetch: any
}) {
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const totalPages = Math.ceil(transactionsCount / state.pagination.value)
    setTotalPages(totalPages)
  }, [transactionsCount, state.pagination.value])

  return (
    <div className="flex flex-row pa2" style={{ gap: 8 }}>
      <input
        type="text"
        placeholder="Search by donation first name"
        value={state.search}
        onChange={e => dispatch({ payload: { search: e.target.value } })}
      />
      <Select
        options={ORDER_SELECT_OPTIONS}
        value={state.order}
        onChange={option => {
          if (!option) return
          dispatch({
            payload: { order: option }
          })
          refetch({
            order: option.value,
            limit: state.pagination.value,
            offset: state.pagination.value * (state.currentPage.value - 1)
          })
        }}
      />
      <Select
        options={PAYMENT_TYPE_SELECT_OPTIONS}
        value={state.paymentType}
        onChange={option => {
          dispatch({ payload: { paymentType: option } })
          refetch({
            where: { type: option.value },
            limit: state.pagination.value,
            offset: state.pagination.value * (state.currentPage.value - 1)
          })
        }}
      />
      <Select
        options={PAGINATION_SELECT_OPTIONS}
        value={state.pagination}
        onChange={option => {
          dispatch({
            payload: {
              pagination: option,
              currentPage: { value: 1, label: '1' }
            }
          })
          refetch({
            limit: option.value,
            offset: 1
          })
        }}
      />
      <Select
        options={Array.from({ length: totalPages }, (_, i) => ({
          value: i + 1,
          label: (i + 1).toString()
        }))}
        value={state.currentPage}
        onChange={option => {
          dispatch({ payload: { currentPage: option } })
          refetch({
            limit: state.pagination.value,
            offset: state.pagination.value * (option.value - 1)
          })
        }}
      />
    </div>
  )
}
