const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  transaction_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  implement_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'implements',
      key: 'id',
    },
  },
  service_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'services',
      key: 'id',
    },
  },
  buyer_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  seller_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'transactions',
  timestamps: false,
});

module.exports = Transaction;
