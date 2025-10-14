import { useReducer } from 'react'

export const ORDER_SELECT_OPTIONS = [
  { value: 'reverse:createdAt', label: 'DoneAt descending' },
  { value: 'createdAt', label: 'DoneAt ascending' }
]

export const PAYMENT_TYPE_SELECT_OPTIONS = [
  { value: ['Charge', 'Manual'], label: 'All' },
  { value: 'Charge', label: 'Charge' },
  { value: 'Manual', label: 'Manual' }
]

const initialState = {
  order: ORDER_SELECT_OPTIONS[0],
  paymentType: PAYMENT_TYPE_SELECT_OPTIONS[0]
}

const transactionReducer = (state: typeof initialState, action: any) => {
  return { ...state, ...action.payload }
}

export function useTransactionReducer() {
  const [state, dispatch] = useReducer(transactionReducer, initialState)

  return { state, dispatch }
}
