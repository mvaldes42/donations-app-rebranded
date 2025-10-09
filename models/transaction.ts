import { DataTypes } from 'sequelize'

export default function Transaction(sequelize: any) {
  var Transaction = sequelize.define(
    'transaction',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        in: [['Charge', 'Manual']]
      },
      refundedAmount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      donationId: {
        type: DataTypes.UUID,
        allowNull: true,
        reference: {
          model: 'donation',
          key: 'id'
        },
        defaultValue: null
      }
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'transaction',
      paranoid: true,
      timestamps: true
    }
  )

  Transaction.associate = (models: any) => {
    models.transaction.belongsTo(models.donation, {
      foreignKey: 'donationId',
      as: 'donation',
      targetKey: 'id'
    })
  }
  return Transaction
}
