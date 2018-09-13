function parseField(field) {  // Parse entry[name] notation
    return field
        .split(/\[|\]/)
        .filter(s => s)
}

function getField(req, field) { // look up property based on parseField results
    let val = req.body;
    field.forEach(prop => {
        val = val[prop];
    });
    return val;
}

exports.required = function(field) { // Parse field once
    field = parseField(field);
    return function(req, res, next) {
        if (getField(req, field)) { // on each request, check if field has a value. If it does, move on to next middleware.
            next();
        } else {
            res.error(field.join(' ') + ' is required'); // if it doesn't, display an error
            res.redirect('back'); 
        }
    }
};

exports.lengthAbove = function(field, len) {
    field = parseField(field);
    return function(req, res, next) {
        if (getField(req, field).length > len) {
            next();
        } else {
            res.error(field.join(' ') + ' must have more than ' + len + ' characters');
            res.redirect('back');
        }
    }
};