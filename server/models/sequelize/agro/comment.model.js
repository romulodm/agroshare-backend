const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const Coment = sequelize.define('Coment', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
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
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'comments',
  timestamps: false,
});

module.exports = Coment;
