const User = require('./User');
const Garden = require('./Garden');


User.hasMany(Garden, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Garden.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Garden };
