const {
    home,
    e404
} = require('./config');

module.exports = {
    home: [
        home,
        require("./home")
    ],
    e404: [
        e404,
        require("./404"),
    ]
}