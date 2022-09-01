const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 1024
        },
    },
    {
        collection: 'users',
        versionKey: false,
    }
);

module.exports = mongoose.model("User", userSchema);