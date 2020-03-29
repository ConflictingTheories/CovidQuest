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
//       SPY API ROUTER         \\
\* ------------------------------ */

// Express Libraries
var express = require('express');
var router = express.Router();

// Miner Libraries
var request = require('request-promise');
var htmlParser = require('htmlparser2');

// Custom Libraries
var DB = require('../lib/Database.lib.js');
var P = require('../lib/Patterns.lib');

// Globals
var Stack = {};
var Status = {};
var Schedule = P.scheduler(Stack);
var StopSchedule = P.stopper(Stack);

// Listing
router.get('/', function(req, res, next) {
    res.send('<b>GET</b>: /run <br> \
        <b>GET</b>: /stop <br> \
        <b>GET</b>: /hide <br>');
});
// Run CRON Job
router.get('/run', function(req, res, next) {
    console.log(Object.keys(Stack).indexOf('runningJob'))
    if (Object.keys(Stack).indexOf('runningJob') < 0) {
        console.log(Object.keys(Stack));
        Schedule('runningJob', "* * * * *", ScheduleSpy)
            .then((response) => {
                console.info("STARTED::", Stack);
                res.json({ status: 200, msg: "Started!" })
            })
            .catch((err) => {
                console.error(err)
                res.json(err);
            });
    } else {
        res.json({ status: 200, msg: "Already Running!" });
    }
});
// Stop CRON Job
router.get('/stop', function(req, res, next) {
    if (Object.keys(Stack).indexOf('runningJob') >= 0 && Stack['runningJob']) {
        StopSchedule('runningJob').then((response) => {
                console.info("STOPPED::", Stack);
                delete Stack.runningJob;
                res.json({ status: 200, msg: "Stopped!" });
            })
            .catch((err) => {
                console.error(err);
                res.json(err);
            });
    } else {
        res.json({ status: 200, msg: "Not Running!" });
    }
});
// CRON Status
router.get('/hide', function(req, res, next) {
    res.json(Status);
});
// False
router.get('/secret', function(req, res, next) {
    res.send('<b>Sorry , not here :)<br>');
});
// ---- FUNCTIONS
//
// Schedule Function for Scheduler
function ScheduleSpy() {
    return new Promise((resolve, reject) => {
        // Do something Funky Here....
        // but what?
        resolve(null);
    });
}

module.exports = router;