const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/sequelize');

const ImplementImage = sequelize.define('ImplementImage', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  implement_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'implements',
      key: 'id',
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'implement_images',
  timestamps: false,
});

module.exports = ImplementImage;
