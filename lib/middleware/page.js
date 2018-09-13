module.exports = function(perpage) {
    perpage = perpage || 10;
    return function(req, res, next) { // return middleware function
        let page = Entry.paginate({}, { limit: perpage }, function(err) {
            if (err) return next(err);

            req.page = res.locals.page = page; // Store page properties for future reference
                
            next();
        });
    };
};