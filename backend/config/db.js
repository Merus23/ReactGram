const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// DB connection
// mongodb+srv://mateussilvadeveloper2:<password>@cluster0.0pdfilm.mongodb.net/

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.oypumdo.mongodb.net/`)
        console.log('Conectou no MongoDB Atlas');
        return dbConn;
    }catch (error) {
        console.log(error);
    }
}

conn();

module.exports = conn;