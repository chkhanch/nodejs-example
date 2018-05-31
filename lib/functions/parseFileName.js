const path = require('path');

module.exports = (fileName, addToName) => {
    return {
        ext: path.extname(fileName),
        name: path.basename(fileName, path.extname(fileName)) + '-' + addToName.slice(0, 10)
    };
}