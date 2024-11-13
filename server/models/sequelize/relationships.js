const User = require('./user.model');
const Implement = require('./implement.model');
const ImplementImage = require('./implement_image.model');
const Service = require('./service.model');
const Transaction = require('./transaction.model');

User.hasMany(Implement, { foreignKey: 'user_id' });
Implement.belongsTo(User, { foreignKey: 'user_id' });

Implement.hasMany(ImplementImage, { foreignKey: 'implement_id' });
ImplementImage.belongsTo(Implement, { foreignKey: 'implement_id' });

User.hasMany(Service, { foreignKey: 'user_id' });
Service.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Transaction, { foreignKey: 'buyer_id', as: 'Buyer' });
User.hasMany(Transaction, { foreignKey: 'seller_id', as: 'Seller' });
Transaction.belongsTo(User, { foreignKey: 'buyer_id', as: 'Buyer' });
Transaction.belongsTo(User, { foreignKey: 'seller_id', as: 'Seller' });

Implement.hasMany(Transaction, { foreignKey: 'implement_id' });
Transaction.belongsTo(Implement, { foreignKey: 'implement_id' });

Service.hasMany(Transaction, { foreignKey: 'service_id' });
Transaction.belongsTo(Service, { foreignKey: 'service_id' });
