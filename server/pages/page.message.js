"use strict";
const sdk = require('../sdk');
const modelMessage = require('../models/model.message');
const modelUser = require('../models/model.user');
const typesRest = require('../types/types.rest');
class MessagePage {
    run(inputData, sessionData, callback) {
        var messagePage = this;
        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.action == typesRest.RestMessageActions.GetUnreadCount) {
            modelMessage.model.find({ receiver_id: sessionData.user.id, read: false }, function (err, messages) {
                if (err) {
                    callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
                }
                else {
                    callback(new typesRest.RestMessageGetUnreadCountResult(messages.length));
                }
            });
        }
        else if (inputData.action == typesRest.RestMessageActions.GetList) {
            modelMessage.model.find({ receiver_id: sessionData.user.id }, function (err, messages) {
                if (err) {
                    callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
                }
                else {
                    var user_ids = messages.map(message => message.sender_id);
                    modelUser.model.find({ '_id': { $in: user_ids } }).exec(function (err, users) {
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
        else if (inputData.action == typesRest.RestMessageActions.Get && inputData.id) {
            modelMessage.model.findById(inputData.id, function (err, message) {
                if (err) {
                    callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
                }
                else {
                    modelUser.model.findById(message.sender_id.toHexString(), function (err, user) {
                        if (err) {
                            callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
                        }
                        else {
                            if (!message.read) {
                                message.read = true;
                                message.save();
                            }
                            var restMessage = messagePage.exportMessage(message, user);
                            callback(new typesRest.RestMessageGetResult(restMessage));
                        }
                    });
                }
            });
        }
        else if (inputData.action == typesRest.RestMessageActions.Send && inputData.id && inputData.subject && inputData.message) {
            var message = new modelMessage.model();
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
    fillMessageHeader(header, message, sender) {
        header.id = message.id;
        header.sender = sdk.user.exportUser(sender);
        header.subject = message.subject;
        header.read = message.read;
        header.sent_time = message.sent_time;
    }
    exportMessageHeader(message, sender) {
        var result = new typesRest.RestMessageHeader();
        this.fillMessageHeader(result, message, sender);
        return result;
    }
    exportMessage(message, sender) {
        var result = new typesRest.RestMessage();
        this.fillMessageHeader(result, message, sender);
        result.message = message.message;
        return result;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessagePage;
//# sourceMappingURL=page.message.js.map