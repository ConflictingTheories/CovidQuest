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
//      LIVE DATA API ROUTER      \\
\* ------------------------------ */

var express = require('express');
var router = express.Router();

// Miner Libraries
var request = require('request-promise');
var htmlParser = require('htmlparser2');

// Custom Libraries
var DB = require('../lib/Database.lib.js');
var P = require('../lib/Patterns.lib');

// ---- ROUTES
//
// Listing
router.get('/', function(req, res, next) {
    res.send('<b>GET</b>: /???????');
});

// False
router.get('/secret', function(req, res, next) {
    res.send('<b>Sorry , not here :)<br>');
});

module.exports = router;