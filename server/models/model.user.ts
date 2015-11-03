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
    name: string;
    login_token: string;
    username: string;
    password: string;
    password_salt: string;
    friends: User[];
    points: Number;
}

export var model = mongoose.model('user', userSchema);
