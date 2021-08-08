const mongoose = require('mongoose')
const mongooseHidden = require('mongoose-hidden');
const dotenv = require('dotenv').config()
const dbConfig = require('../config/db.config')
const dbURL = process.env.DB_URL;

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.plugin(mongooseHidden({
    defaultHidden: {
        '_id': false,
        password: true,
        pin: true,
        '__v': true
    }
}));

mongoose.connection.on("error", err => {
    console.error("ERROR: Database connection failed", err)
})

mongoose.connection.on("connected", (err, res) => {
    console.error("Database connected successfully")
})

exports.connectDB = (prod=false) => {
    let _dbConfig = null
    if (prod) {
        _dbConfig = dbConfig.prod
    } else {
        _dbConfig = dbConfig.dev
    }
    return mongoose.connect(_dbConfig.databaseURL, {
        dbName: _dbConfig.name,
        useNewUrlParser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        // .then(() => console.log("Connected successful"))
        // .catch((err) => console.log("Can not connect to the db! ", err))
}