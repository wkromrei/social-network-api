const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/networtDB';

connect(connectionString);

module.exports = connection;