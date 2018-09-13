const basicAuth = require('basic-auth'); // CHeck this is the npm module name
const User = require('../lib/user');
const Entry = require('../lib/entry');

exports.auth = basicAuth(User.checkPassword);

exports.user = function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        if (!user._id) return res.send(404);
        res.json(user);
    });
}

exports.entries = function(req, res, next) {
    res.json(page.docs); // TODO Check this is the correct parameter
}