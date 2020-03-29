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
//       LOG API ROUTER         \\
\* ------------------------------ */

var express = require('express');
var router = express.Router();

// Custom Libraries
var DB = require('../lib/Database.lib.js');
var P = require('../lib/Patterns.lib');

// Listing
router.get('/', function(req, res, next) {
    res.send('<b>GET</b>: /??????? <br> \
        <b>GET</b>: /?????? <br>');
});
// False
router.get('/secret', function(req, res, next) {
    res.send('<b>Sorry , not here :)<br>');
});
module.exports = router;