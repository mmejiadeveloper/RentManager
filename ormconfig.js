require('dotenv').config();
const compilationFolder = process.env.NODE_ENV == "development" ? process.env.DB_COMPILED_FOLDER : process.env.DB_COMPILED_FOLDER_SERVER;
console.log(process.env.NODE_ENV, compilationFolder)
module.exports = {
    "type": "mysql",
    "host": process.env.NODE_ENV == "development" ? process.env.DB_HOST : process.env.DB_HOST_SERVER,
    "port": 3306,
    "username": process.env.NODE_ENV == "development" ? process.env.DB_USER : process.env.DB_USER_SERVER,
    "password": process.env.NODE_ENV == "development" ? process.env.DB_PASSWORD : process.env.DB_PASSWORD_SERVER,
    "database": process.env.NODE_ENV == "development" ? process.env.DB_NAME : process.env.DB_NAME_SERVER,
    "synchronize": true,
    "logging": false,
    "entities": [
        "dist/entity/**/*.js"
    ],
}