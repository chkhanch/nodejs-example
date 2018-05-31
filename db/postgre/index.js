const add = require('./add')

const db = new require('pg').Pool({
    host: 'localhost',
    port: 5432,
    user: 'nw-admin',
    password: 123,
    database: 'nw'
});

db.add = (title, text, image = '', callback) => db.connect((err, client, done) => {
    if (arguments.slice(-1) === 'function') throw new Error('Need use callback whit last param');
    if (err) return errorCallback(err, callback);
    client.query('INSERT INTO posts (title, text, image) VALUES ($1, $2, $3)', [title, text, image], (error, result) => {
        done();
        if (error) return errorCallback(error, callback);
        if (result) {
            console.log('seccusse add new post');
            return callback(null, result);
        }
    });
})

db.delete = callback => db.connect((err, client, done) => {
    if (err) return errorCallback(err, callback);
    client.query('DELETE FROM posts', (error, result) => {
        done();
        if (error) return errorCallback(error, callback);
        if (result) console.log('delete seccusse all posts');
    })
})

db.deleteByID = (ids, callback) => db.connect((err, client, done) => {
    ids.forEach(id => client.query('DELETE FROM posts WHERE id=$1', [id], (error, result) => {
        done();
        if (error) return errorCallback(error, callback);
        else if (result) console.log('delete seccusse', id, 'post.');
    }));
})

db.getList = callback => db.connect((err, client, done) => {
    if (err) return errorCallback(err, callback, 'error with connection to db: ');
    client.query('SELECT id, text, title, image FROM posts', (err, req) => {
        done();
        if (err) return errorCallback(err, callback);
        return callback(req.rows.reverse());
    });
});
db.edit = edit => db.connect((err, client, done) => {
    if (err) return errorCallback(err, callback, 'error with connection to db: ');
    client.query('UPDATE posts SET image=$1 WHERE id=$2', [edit.image, edit.id], (err, req) => {
        done();
        if (err)
            return errorCallback(err, callback);
        else
            return //callback(req.rows.reverse());
    });
});

function errorCallback(err, callback, module = 'default: ') {
    callback(err);
    console.log(module, err);
    return false;
};

module.exports = db;