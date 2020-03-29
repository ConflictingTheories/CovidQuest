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
//       ADMIN API ROUTER         \\
\* ------------------------------ */

var express = require('express');
var router = express.Router();

// Custom Libraries
var DB = require('../lib/Database.lib.js');
var P = require('../lib/Patterns.lib');

// Listing
router.get('/', function(req, res, next) {
    res.send('<b>GET</b>: /access/grant <br> \
        <b>GET</b>: /access/revoke <br>');
});
// Connect DB (PART OF THE TRICK)
router.get('/access/grant', function(req, res, next) {
    try {
        console.log(DB.status())
        if (DB.status() == "closed") {
            console.log("OPENING CONNECTION::")
            DB.connect();
        }
        res.json({ status: 200, msg: "Access Granted!" });
    } catch (e) {
        res.json({ status: 500, msg: "Error", error: e });
    }
});
// Close DB (JUST A COURTESY)
router.get('/access/revoke', function(req, res, next) {
    try {
        console.log(DB.status())
        if (DB.status() == "closed") {
            console.log("CLOSING CONNECTION::")
            DB.close();
        }
        res.json({ status: 200, msg: "Access Revoked!" });
    } catch (e) {
        console.log(e);
        res.json({ status: 500, msg: "Error", error: e });
    }
});
// False
router.get('/secret', function(req, res, next) {
    res.send('<b>Sorry , not here :)<br>');
});

module.exports = router;