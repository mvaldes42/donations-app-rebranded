const lastTransactions = require('./json/100-last-donations.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const donations = []
    const transactions = []

    for (const t of lastTransactions) {
      if (!t) {
        continue
      }

      const donation = t.donation

      if (donation && !donations.some(d => d?.id === donation?.id)) {
        donations.push({
          id: donation.id,
          firstName: donation.firstName,
          lastName: donation.lastName,
          amount: donation.amount,
          thankYouComment: donation.thankYouComment,
          isAnonymous: donation.isAnonymous,
          companyName: donation.companyName,
          createdAt: new Date(donation.createdAtUtc),
          updatedAt: new Date()
        })
      }

      if (!transactions.some(tr => tr.id === t.id)) {
        transactions.push({
          id: t.id,
          type: t.type,
          refundedAmount: t.refundedAmount,
          donationId: donation?.id,
          createdAt: new Date(donation.createdAtUtc),
          updatedAt: new Date()
        })
      }
    }

    await queryInterface.bulkInsert('donation', donations)
    await queryInterface.bulkInsert('transaction', transactions)
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('donation', {})
    await queryInterface.bulkDelete('transaction', {})
  }
}
