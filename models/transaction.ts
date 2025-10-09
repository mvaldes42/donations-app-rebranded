import { DataTypes, Sequelize } from 'sequelize'

export default function Transaction(sequelize: Sequelize) {
  const Transaction = sequelize.define(
    'transaction',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Charge'
      },
      refundedAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      donationId: {
        type: DataTypes.INTEGER,
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
    },
    {
      freezeTableName: true,
      tableName: 'transaction',
      paranoid: true
    }
  )

  return Transaction
}
