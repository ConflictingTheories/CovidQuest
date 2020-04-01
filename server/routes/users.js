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
//        USER API ROUTER         \\
\* ------------------------------ */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
// False
router.get('/:secret/:lat/:lng', function(req, res, next) {
    let secret = req.params.secret;
    let lat = req.params.lat;
    let lng = req.params.lng;

    console.log({user:{location:{lat,lng},secret}});
    
    res.json({msg:"success"});
});

module.exports = router;