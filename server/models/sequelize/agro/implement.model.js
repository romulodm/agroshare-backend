const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');
const Coment = require('./comment.model');
const ImplementImage = require('./implement_image.model');
const Transaction = require('./transaction.model');

const Implement = sequelize.define('Implement', {
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
  price: {
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
  images: {
    type: DataTypes.JSON, // Armazena os caminhos das imagens
  },
}, {
  tableName: 'implements',
  timestamps: false,
});

module.exports = Implement;

Implement.hasMany(ImplementImage, { foreignKey: 'implement_id' });
ImplementImage.belongsTo(Implement, { foreignKey: 'implement_id' });

Implement.hasMany(Transaction, { foreignKey: 'implement_id' });
Transaction.belongsTo(Implement, { foreignKey: 'implement_id' });

Implement.hasMany(Coment, { foreignKey: 'implement_id' });
Coment.belongsTo(Implement, { foreignKey: 'implement_id' });
