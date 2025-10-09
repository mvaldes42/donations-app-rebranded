'use strict'

module.exports = {
  up: async function(queryInterface, DataTypes) {
    await queryInterface.createTable('transaction', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        enum: ['Charge', 'Manual'],
        defaultValue: 'Charge'
      },
      refundedAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      donationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'donation',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    })
    await queryInterface.createTable('donation', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      thankYouComment: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isAnonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    })
  },
  down: function() {}
}
