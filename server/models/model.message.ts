import * as mongoose from 'mongoose';

var messageSchema = new mongoose.Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	subject: String,
	message: String,
	read: Boolean,
	sent_time: Date
});

export interface Message extends mongoose.Document {
    sender_id: mongoose.Types.ObjectId,
	receiver_id: mongoose.Types.ObjectId,
	subject: string,
	message: string,
	read: boolean,
	sent_time: Date
}

export var model = mongoose.model<Message>('message', messageSchema);
