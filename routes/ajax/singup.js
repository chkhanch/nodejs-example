const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const correctTime = require('../../lib/functions/correctTime');

const db = require('../../db').pg;

module.exports = (router, url) => router.post(url, jsonParser, (req, res) => {
    console.log(req.ip, req.body, correctTime('/'));
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.end(JSON.stringify(req.body.password && req.body.login ? 'yaep' : "am"));

});