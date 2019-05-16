var mongoose = require('mongoose');
const database = require('../util/config').database;

const db_url = 'mongodb+srv://' + database.user + ':' + database.password + '@nodeproject-tu8wo.mongodb.net/test?retryWrites=true';


const connection = mongoose.connect(db_url, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});


module.exports = connection;


//console.log(mongoose.connection.readyState);
