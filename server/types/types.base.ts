import mongoose = require('mongoose');

export interface DatabaseCallback {
    (err: string, data: mongoose.Document): void;
}