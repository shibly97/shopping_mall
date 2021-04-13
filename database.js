require('dotenv').config()

const {Pool} = require('pg');

    const pool = new Pool({
    user : process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: 'shopping_mall',
    max: 10,
    idleTimeoutMillis: 20,
    // connectionTimeoutMillis: '10s'
    })

module.exports.pool = pool