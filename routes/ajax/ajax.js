const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

module.exports = (router, url) => router.post(url, jsonParser, (req, res) => {
    console.log(req.ip, req.body, correctTime('/'))
    res.setHeader('Content-Type', 'application/json; charset=UTF-8')
    let message
    const { title, content, image } = req.body
    if (title && content) {
        const db = require('../../db').pg
        db.add(title, content, image, (err, result) => {
            if (err) message = err
            else message = req.body.title + ' add new post.'
            res.end(JSON.stringify(message))
        })
    } else {
        message = 'You cannot add empty post.'
        res.end(JSON.stringify(message))
    }
})

function correctTime(space, time = new Date(), ...params) {
    const correctNumber = number => {
        if (number < 10) number = '0' + number
        return number
    }

    const t = params.map(param => correctNumber(time[param]()))
    t.forEach(s => {
        console.log(s)
    })

    const hours = correctNumber(time.getHours())
    const minuts = correctNumber(time.getMinutes())
    const seconds = correctNumber(time.getSeconds())

    return hours + space + minuts + space + seconds
}