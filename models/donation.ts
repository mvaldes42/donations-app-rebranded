import { DataTypes } from 'sequelize'

export default function Donation(sequelize: any) {
  var Donation = sequelize.define(
    'donation',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
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
      }
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: 'donation',
      paranoid: true,
      timestamps: true
    }
  )

  Donation.associate = (models: any) => {
    models.donation.hasMany(models.transaction, {
      foreignKey: 'donationId',
      as: 'transactions',
      targetKey: 'id'
    })
  }

  return Donation
}
