const path = require('path');

const parseFileName = require('../../lib/functions/parseFileName');

module.exports = (router, url) => router.post(url, (req, res) => {
    if (!req.files) res.status(404).end('No files send.');
    console.log(req.headers)
    image = req.files.image;
    if (!image) return
    const file = {
        path: path.normalize(__dirname + '/../../NeverSite/public/images/upload/'),
        ...parseFileName(image.name, image.md5)
    };
    file.name = file.name ? file.name : 'random';
    image.mv(file.path + "/" + file.name + file.ext, e => {
        console.log(e);
        if (e) return res.status(500).end(e);
        return res.status(200).end(`/images/upload/${file.name}${file.ext}`);
    })
});