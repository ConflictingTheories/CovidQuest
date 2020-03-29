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
//   HISTORY DATA API ROUTER      \\
\* ------------------------------ */

// Express Libraroes
var express = require('express');
var router = express.Router();

// Custom Libraries
var DB = require('../lib/Database.lib.js');
var P = require('../lib/Patterns.lib');

/* GET History listing. */
router.get('/', function(req, res, next) {
    res.send('<b>GET</b>: /at/:year/:month/:day<br> ');
});

/* GET Date listing. */
router.get('/at/:year/:month/:day', function(req, res, next) {
    let year = req.param('year');
    let month = req.param('month');
    let day = req.param('day');
    let search = new Date("" + year + "/" + month + "/" + day).getTime();
    let searchQuery = "SELECT * FROM history WHERE timestamp ='" + search + "'";
    console.log(searchQuery);
    DB.query(searchQuery)
        .then((results) => {
            console.log(results);
            let ret = results.results;
            let retArray = [];
            // Return 
            res.json({
                status: 200,
                msg: "Success - Retrieved " + retArray.length + " Entries",
                data: retArray
            });
        })
        .catch((err) => {
            console.error(err);
            res.json({
                status: 500,
                msg: "ERR",
                err: err
            });
        });
});

module.exports = router;