import mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    login_token: String,
    username: { type: String, unique: true },
    password: String,
    password_salt: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    points: Number
});

export interface User extends mongoose.Document {
    name: String;
    login_token: String;
    username: String;
    password: String;
    password_salt: String;
    friends: mongoose.Types.ObjectId[];
    points: Number;
}

export var modelUser = mongoose.model('user', userSchema);
