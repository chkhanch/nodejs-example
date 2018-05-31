const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

module.exports = (router, url) => router.post(url, jsonParser, (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=UTF-8')
    let message
    console.log('  t ', req.body)
    if (req.body.id) {
        console.log('  t ', req.body)
        const db = require('../../db').pg
        db.edit(req.body)
        message = true
    } else {
        message = false
    }
    res.end(JSON.stringify(message))
})