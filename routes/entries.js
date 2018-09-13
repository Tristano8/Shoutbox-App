const Entry = require('../lib/entry');

exports.list = function(req, res, next) {
    Entry.find({}, {sort: dateCreated}, function(err, entries) {
        if (err) return next(err);

        res.render('entries', {
            title: 'Entries',
            entries: entries
        });
    });
};

exports.form = function(req, res) {
    res.render('post', { title: 'Post' });
}

exports.submit = function(req, res, next) {
    let data = req.body.entry;

    let entry = new Entry({
        "username": res.locals.user.username,
        "title": data.title,
        "body": data.body,
        "dateCreated": Date.now()
    });

    entry.save(function(err) {
        if (err) return next(err);
        if (req.remoteUser) {
            res.json({message: 'Entry added.'});
        } else {
        res.redirect('/');
        }
    });
};