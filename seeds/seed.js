const sequelize = require('../config/connection');
const { User, Garden } = require('../models');

const userData = require('./userData.json');
const gardenData = require('./gardenData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const garden of gardenData) {
    await Garden.create({
      ...garden,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
