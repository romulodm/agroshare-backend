const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');
const Transaction = require('./transaction.model');
const Coment = require('./comment.model');


const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price_per_hour: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  availability_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
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
  tableName: 'services',
  timestamps: false,
});

Service.hasMany(Transaction, { foreignKey: 'service_id' });
Transaction.belongsTo(Service, { foreignKey: 'service_id' });

Service.hasMany(Coment, { foreignKey: 'service_id' });
Coment.belongsTo(Service, { foreignKey: 'service_id' });

module.exports = Service;

