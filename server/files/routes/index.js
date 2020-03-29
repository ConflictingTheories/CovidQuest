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
//       INDEX API ROUTER         \\
\* ------------------------------ */

var express = require('express');
var router = express.Router();

var DB = require('../lib/Database.lib');

/* POST home page. */
router.post('/', function(req, res, next) {
    let params = req.body;
    let access_code = params.access_code;
    let code_name = params.code_name;
    let pass_phrase = params.pass_phrase;
    let secret = params.secret;
    console.log(params, req);
    if (access_code && code_name && pass_phrase && secret) {
        let query = "SELECT * FROM users WHERE access_code=" + DB.escape(access_code) + " AND code_name=" + DB.escape(code_name) + " AND pass_phrase=" + DB.escape(pass_phrase) + " AND secret=" + DB.escape(secret) + " LIMIT 1"
        console.log(query);
        DB.query(query).then((lookup) => {
            console.log(lookup);
            if (lookup.results.length <= 0) {
                res.render('index', {
                    title: 'CovidQuest : Login',
                    message: 'ERROR - Wrong Entry'
                });
            } else {
                res.render('map', { title: 'CovidQuest: Portal', user: lookup.results });
            }
        });
        // TODO
    } else {
        res.render('index', { title: 'CovidQuest : Login', message: '' });
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'CovidQuest : Login',
        message: ''
    });
});

/* GET home page. */
router.get('/game', function(req, res, next) {
    res.render('game', {
        title: 'CovidQuest : Game'
    });
});

// False
router.get('/secret', function(req, res, next) {
    res.send('<b>Nice Try - Dig Deeper :)<br>');
});

module.exports = router;