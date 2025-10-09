import { TransactionType } from '../customTypes'

function TransactionCell({ children }: { children: React.ReactNode }) {
  return <div className="w-20">{children}</div>
}

export function TransactionRow({
  transaction
}: {
  transaction: TransactionType
}) {
  const donation = transaction.donation

  return (
    <div className="flex flex-row ba pa2 ba" style={{ gap: 8 }}>
      <TransactionCell>{donation.firstName}</TransactionCell>
      <TransactionCell>{donation.lastName}</TransactionCell>
      <TransactionCell>{(donation.amount / 100).toFixed(2)} €</TransactionCell>
      <TransactionCell>{transaction.type}</TransactionCell>
      <TransactionCell>
        {new Date(transaction.createdAt).toLocaleDateString('fr-FR')}
      </TransactionCell>
    </div>
  )
}
