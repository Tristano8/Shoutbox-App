const User = require('../user');

module.exports = function(req, res, next) {
    if (req.remoteUser) {
        res.locals.user = req.remoteUser;
    }
    let uid = req.session.uid;
    if (!uid) return next();
    User.findById(uid, function(err, user) { // get logged-in user's data
        if (err) return next(err);
        req.user = res.locals.user = user;
        next();
    }) 
}