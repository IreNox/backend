import sdk = require("../sdk");
import modelMessage = require("../models/model.message");
import modelUser = require("../models/model.user");
import typesRest = require('../../shared/types/types.rest');
import typesPage = require('../types/types.page');

class MessagePage implements typesPage.Page {
    run(inputData: typesRest.RestMessageRequest, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
		var messagePage = this;

        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.action == 'getunreadcount') {
			modelMessage.model.find({ receiver_id: sessionData.user.id, read: false }, function (err, messages: modelMessage.Message[]) {
				if (err) {
					callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
				}
				else {
					callback(new typesRest.RestMessageGetUnreadCountResult(messages.length));
				}
			});
		}
		else if (inputData.action == 'getlist') {
			modelMessage.model.find({ receiver_id: sessionData.user.id }, function (err, messages: modelMessage.Message[]) {
				if (err) {
					callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
				}
				else {
					var user_ids = messages.map(message => message.sender_id);
					modelUser.model.find({ '_id': { $in: user_ids } }).exec(function (err, users: modelUser.User[]) {
						if (err) {
							callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
						}
						else {
							var results = messages.map(message => messagePage.exportMessageHeader(message, users.filter(user => user._id.equals(message.sender_id))[0]));
							callback(new typesRest.RestMessageGetListResult(results));
						}
					});
				}
			});
		}
		else if (inputData.action == 'get' && inputData.id) {
			modelMessage.model.findById(inputData.id, function (err, message: modelMessage.Message) {
				if (err) {
					callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
				}
				else {
					modelUser.model.findById(message.sender_id.toHexString(), function (err, user: modelUser.User) {
						if (err) {
							callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
						}
						else {
							if (!message.read) {
								message.read = true;
								message.save();
							}

							var restMessage: typesRest.RestMessage = messagePage.exportMessage(message, user);
							callback(new typesRest.RestMessageGetResult(restMessage));
						}
					});
				}
			});
		}
		else if (inputData.action == 'send' && inputData.id && inputData.subject && inputData.message) {
			var message: modelMessage.Message = <modelMessage.Message>new modelMessage.model();
			message.sender_id = sdk.db.toId(sessionData.user.id);
			message.receiver_id = sdk.db.toId(inputData.id);
			message.subject = inputData.subject;
			message.message = inputData.message;
			message.read = false;
			message.sent_time = new Date(Date.now());

			message.save(function (err) {
				if (err) {
					callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
				}
				else {
					callback(new typesRest.RestResult(typesRest.RestResultType.Ok));
				}
			});
		}
		else {
			callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
		}
    }

	private fillMessageHeader(header: typesRest.RestMessageHeader, message: modelMessage.Message, sender: modelUser.User): void {
		header.id = message._id.toHexString();
		header.sender = sdk.user.exportUser(sender);
		header.subject = message.subject;
		header.read = message.read;
		header.sent_time = message.sent_time;
	}

	private exportMessageHeader(message: modelMessage.Message, sender: modelUser.User): typesRest.RestMessageHeader {
		var result: typesRest.RestMessageHeader = new typesRest.RestMessageHeader();
		this.fillMessageHeader(result, message, sender);

		return result;
	}

	private exportMessage(message: modelMessage.Message, sender: modelUser.User): typesRest.RestMessage {
		var result: typesRest.RestMessage = new typesRest.RestMessage();
		this.fillMessageHeader(result, message, sender);

		result.message = message.message;

		return result;
	}

}
export = MessagePage;