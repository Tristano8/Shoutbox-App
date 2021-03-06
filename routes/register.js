let User = require('../lib/user');

exports.form = function(req, res) {
    res.render('register', { title: 'Register'})
};

exports.submit = function(req, res, next) {
    let data = req.body.user;
    User.find({name: data.username}, function(err, user) {
        if (err) return next(err);

        if (user) {
            res.error("Username already taken!");
            res.redirect('back');
        } else {
            user = new User({
                name: data.username,
                password: data.password
            });

            user.save(function(err) {
                if (err) return next(err);
                req.session.uid = user._id; 
                res.redirect('/');
            });
        };
    });
};