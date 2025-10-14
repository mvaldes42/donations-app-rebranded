import { useReducer } from 'react'

export const ORDER_SELECT_OPTIONS = [
  { value: 'reverse:createdAt', label: 'DoneAt descending' },
  { value: 'createdAt', label: 'DoneAt ascending' },
  { value: 'donation.amount', label: 'Amount ascending' },
  { value: 'reverse:donation.amount', label: 'Amount descending' }
]

export const PAYMENT_TYPE_SELECT_OPTIONS = [
  { value: ['Charge', 'Manual'], label: 'All' },
  { value: 'Charge', label: 'Charge' },
  { value: 'Manual', label: 'Manual' }
]

export const PAGINATION_SELECT_OPTIONS = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' }
]

const initialState = {
  order: ORDER_SELECT_OPTIONS[0],
  paymentType: PAYMENT_TYPE_SELECT_OPTIONS[0],
  pagination: PAGINATION_SELECT_OPTIONS[0],
  currentPage: { value: 1, label: '1' },
  search: ''
}

const transactionReducer = (state: typeof initialState, action: any) => {
  return { ...state, ...action.payload }
}

export function useTransactionReducer() {
  const [state, dispatch] = useReducer(transactionReducer, initialState)

  return { state, dispatch }
}
