const router = require('express').Router();
const {
    posts,
    ajax,
    singup,
    login,
    upload,
    edit
} = require('./config');

module.exports = {
    posts: [
        posts,
        require(`./posts`)(router, posts)
    ],
    ajax: [
        ajax,
        require(`./ajax`)(router, ajax)
    ],
    singup: [
        singup,
        require(`./singup`)(router, singup)
    ],
    login: [
        login,
        require(`./login`)(router, login)
    ],
    upload: [
        upload,
        require(`./upload`)(router, upload)
    ],
    edit: [
        edit,
        require('./edit')(router, edit)
    ]

}