const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');
const Coment = require('./comment.model');
const Transaction = require('./transaction.model');
const Service = require('./service.model');
const Implement = require('./implement.model');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

User.hasMany(Implement, { foreignKey: 'user_id' });
Implement.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Service, { foreignKey: 'user_id' });
Service.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Coment, { foreignKey: 'user_id' });
Coment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Transaction, { foreignKey: 'buyer_id', as: 'Buyer' });
User.hasMany(Transaction, { foreignKey: 'seller_id', as: 'Seller' });
Transaction.belongsTo(User, { foreignKey: 'buyer_id', as: 'Buyer' });
Transaction.belongsTo(User, { foreignKey: 'seller_id', as: 'Seller' });
  
module.exports = User;

