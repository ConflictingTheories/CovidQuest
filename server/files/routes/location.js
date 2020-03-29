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
//      LOCATION API ROUTER      \\
\* ------------------------------ */

var express = require('express');
var router = express.Router();

// Custom Libraries
var DB = require('../lib/Database.lib.js');
var P = require('../lib/Patterns.lib');

// ---- ROUTES
//
// Listing
router.get('/', function(req, res, next) {
    res.send('<b>GET</b>: /earth <br> \
        <b>GET</b>: /air <br> \
        <b>GET</b>: /fire <br> \
        <b>GET</b>: /water <br> \
        <b>GET</b>: /?????? <br> \
        <b>GET</b>: /?????? <br>');
});
// EARTH LOCATIONS
router.get('/earth', function(req, res, next) {
    // Fetch earth Location Data
});
// AIR LOCATIONS
router.get('/air', function(req, res, next) {
    // Fetch air Location Data
});
// FIRE LOCATIONS
router.get('/fire', function(req, res, next) {
    // Fetch fire Location Data
});
// WATER LOCATIONS
router.get('/water', function(req, res, next) {
    // Fetch water Location Data
});
// SECRET LOCATION
router.get('/secret', function(req, res, next) {
    // The Ultimate Locations
});
// GET SPIRIT DATA
router.get('/spirit', function(req, res, next) {
    // Fetch all Location Data
});
module.exports = router;