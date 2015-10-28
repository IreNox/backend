import mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    name: String
});

export interface Test extends mongoose.Document {
	name: string;
}

export var model = mongoose.model('test', testSchema);
