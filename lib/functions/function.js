exports.testWithOptions = (what, ...exporessions) => {
    return exporessions.reduce(function check(is, expression) {
        return is ? is : expression.test(what);
    }, false);
};

exports.checkAccess = (exporessions) => {
    return function access(req, res, next) {
        const is = exports.testWithOptions(req.ip, ...exporessions);
        if (is) next();
        else res.redirect('/');
    };
};