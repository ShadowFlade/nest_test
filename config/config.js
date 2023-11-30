const dotenv = require('dotenv');
dotenv.config();

module.exports =  {
    dialect: 'postgres',
    username: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database:process.env.DB_NAME,
    port: process.env.DB_PORT,
    seederStorage: 'sequelize',
    migrationStorage: 'sequelize',
    seederStorageTableName: 'YWSeeds',
    migrationStorageTableName: 'YWMigrations',
    sync: false,
 };
