const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for(let coll of collections){
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user1, user2, admin] = await User.create({
    username: 'user1',
    password: 'password1',
    token: nanoid(),
    displayName: 'Albert Wesker',
  }, {
    username: 'user2',
    password: 'password2',
    token: nanoid(),
    displayName: 'William Birkin',
  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    token: nanoid(),
    displayName: 'Admin Adminov',
  });

  mongoose.connection.close();
};

run().catch(error => {
  mongoose.connection.close();
  throw error;
});