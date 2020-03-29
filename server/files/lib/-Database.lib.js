/* ----------------------------- *\
//                               \\
//  CovidQuest - Community Tool  \\
// ----------------------------- \\
//      Copyright (c) 2020       \\
//      Kyle Derby MacInnis      \\
// ----------------------------- \\
// All Rights Reserved. Any Un-  \\
// authorized disribution and/or \\
// sale of this work is strictly \\
// prohibited.                   \\
\* ----------------------------- */

/* ------------------------------ *\
//      DATABASE OBJECT / CONF    \\
\* ------------------------------ */

// MySQL Libary
var SQL = require('mysql');

// Environment Variables
const ENV = require('../etc/Env.conf.js');

// CONFIGURATION
const DB_HOST = ENV.DB_HOST;
const DB_USER = ENV.DB_USER;
const DB_PASS = ENV.DB_PASS;
const DB_NAME = ENV.DB_NAME;

// Connection
const DB_CLIENT = SQL.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});

// OBJECT
function Database() {
    let status = "closed";
    // Return Status
    function statusDB() {
        return status;
    }
    // Client
    function clientDB() {
        return DB_CLIENT;
    }
    // Connect
    function connectDB() {
        if (status == "closed") {
            status = "open";
            DB_CLIENT.connect();
        }
    };
    // Close
    function closeDB() {
        if (status == "open") {
            status = "closed";
            DB_CLIENT.close();
        }
    };
    // Query (General)
    function queryDB(query) {
        return new Promise((resolve, reject) => {
            if (status == "closed") {
                reject("Database Disconnected")
            } else {
                DB_CLIENT.query(query, function(error, results, fields) {
                    if (error)
                        reject(error);
                    else
                        resolve({ results: results, fields: fields });
                });
            }
        });
    };
    connectDB();
    // Object Returned
    return {
        status: statusDB,
        client: clientDB,
        connect: connectDB,
        query: queryDB,
        close: closeDB
    };
}

// Export
module.exports = Database();