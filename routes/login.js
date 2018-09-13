exports.form = function(req, res) {
    res.render('login', { title: 'Login'});
};

exports.submit = function(req, res, next) {
    let data = req.body.user;
    User.find({name: data.username}, function(err, user) {
        if (err) return next(err);
        
        if (user.exists()) {
            user.comparePassword(data.password, function(err, isMatch) {
                if (err) return next(err);

                if (isMatch) {
                    req.session.uid = user._id;
                    res.redirect('/');
                } else {
                    res.error("Sorry! invalid credentials.");
                    res.redirect('back');
                }
            });
        };

    });
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        if (err) throw err;
        res.redirect('/');
    });
};