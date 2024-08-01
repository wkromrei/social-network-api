const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData.json');
const thoughtData = require('./thoughtsData.json');

connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }
})

const seedDB = async () => {
 
    const user = await User.create(userData);
    console.log(user);

    const thought = await Thought.create(thoughtData);

    process.exit(0);
}

seedDB();