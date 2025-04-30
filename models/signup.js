//defining our schema
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,

    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['director', 'salesAgent', 'manager'],
        required: true
    },
    branch: {
        type: String,
        enum: ['Maganjo', 'Matugga'],
        required: true
    },

});
signupSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});
module.exports = mongoose.model('signup', signupSchema);

