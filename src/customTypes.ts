export interface DonationType {
  id: string
  firstName: string
  lastName: string
  amount: number
  thankYouComment: string | null
  isAnonymous: boolean
  companyName: string | null
  createdAt: string
}

export interface TransactionType {
  id: string
  type: string
  refundedAmount: number
  donationId: string
  donation: DonationType
  createdAt: string
}
