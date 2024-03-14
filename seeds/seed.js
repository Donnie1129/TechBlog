const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const userData = require('./userData.json');
const postData = require('./Posts.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const createdUsers = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Promise.all(postData.map(async (post) => {
      await Post.create(post);
    }));

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
