export interface DonationType {
  id: number
  firstName: string
  lastName: string
  amount: number
  thankYouComment: string | null
  isAnonymous: boolean
  companyName: string | null
  createdAt: string
}

export interface TransactionType {
  id: number
  type: string
  refundedAmount: number
  donationId: number
  createdAt: string
}
