const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let db = mongoose.createConnection('mongodb://localhost/shoutbox_app');
SALT_WORK_FACTOR = 12;

const UserSchema = mongoose.Schema({
    name: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true }
});

UserSchema.pre('save', function(cb) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return cb();

    // generates a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return cb(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return cb(err);
            
            // override the cleartext password with the hashed one
            user.password = hash;
            cb();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserShema.methods.toJSON = function() { // This hides unwanted extra data from appearing in api calls
    return {
        id: this._id,
        name: this.name
    }
}

const User = db.model('User', UserSchema);

module.exports = User;