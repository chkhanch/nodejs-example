const db = require('../../db').pg;
const correctTime = require('../../lib/functions/correctTime')

module.exports = (router, url) => router.get(url, (req, res) => {
    console.log(req.ip, req.url, correctTime('/'));
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    try {
        db.getList(posts => {
            const leftSide = posts.map(post => {
                const highline = post.title || 'empty title';
                const fullText = post.text || 'empty content';
                const image = post.image || '/images/Background/createArticle2.jpg';
                return {
                    highline: highline,
                    fullText: fullText,
                    image: image,
                    id: post.id
                }
            });

            const rightSide = [{
                    highline: 'Hey there!',
                    //shortText: 'I love Zhenya...',
                    fullText: 'I love Zhenya very much!'
                },
                {
                    highline: 'Hey there!',
                    //shortText: 'Zhenya love Masha...',
                    fullText: 'Zhenya love Masha very much!'
                }
            ];

            res.end(JSON.stringify({
                leftSide: leftSide,
                rightSide: rightSide
            }));

        })
    } catch (e) {
        console.log('posts.js, page: 37: ', e);
        res.end(JSON.stringify("Can not get posts."));
    }
});