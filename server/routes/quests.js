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
//        QUEST API ROUTER         \\
\* ------------------------------ */

var express = require('express');
var router = express.Router();

/* GET quest listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
// get All Quests
router.get('/all', function(req, res, next) {
    res.send('<b>Sorry , not here :)<br>');
});

// get Quests
router.get('/query', function(req, res, next) {
    res.send('<b>Sorry , not here :)<br>');
});

module.exports = router;