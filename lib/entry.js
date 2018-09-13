const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const db = mongoose.createConnection('mongodb://localhost/shoutbox_app');

module.exports = Entry;

const EntrySchema = mongoose.Schema({
    username: String,
    title: String,
    body: String,
    dateCreated: Date
});

EntrySchema.plugin(mongoosePaginate);

const Entry = mongoose.model('Entry', EntrySchema);
