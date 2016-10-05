"use strict";
const sdk = require('../sdk');
const typesRest = require('../types/types.rest');
class FriendsPage {
    run(inputData, sessionData, callback) {
        if (!inputData.action || !inputData.userId) {
            callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
        else if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.action == 'add') {
            this.addFriend(inputData.userId, sessionData, callback);
        }
        else if (inputData.action == 'remove') {
            this.removeFriend(inputData.userId, sessionData, callback);
        }
        else {
            callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
    }
    addFriend(userId, sessionData, callback) {
        sdk.user.findUser(sessionData.user.id, function (err, currentUser) {
            if (err || !currentUser) {
                callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
            }
            else {
                sdk.user.findUser(userId, function (err, friendUser) {
                    if (sdk.db.checkError(err, callback)) {
                        var containsFriend = false;
                        currentUser.friends.forEach(function (friendId) {
                            if (friendUser._id.equals(friendId)) {
                                containsFriend = true;
                            }
                        });
                        if (containsFriend) {
                            callback(new typesRest.RestResult(typesRest.RestResultType.AlreadyInList));
                        }
                        else {
                            currentUser.friends.push(friendUser._id);
                            sdk.user.saveUser(currentUser, sessionData, function (result) {
                                if (result != typesRest.RestResultType.Ok) {
                                    callback(new typesRest.RestResult(result));
                                }
                                else {
                                    callback(new typesRest.RestFriendsResult(friendUser.id));
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    removeFriend(userId, sessionData, callback) {
        sdk.user.findUser(sessionData.user.id, function (err, currentUser) {
            if (err || !currentUser) {
                callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
            }
            else {
                var containsFriend = false;
                for (var index = 0; index < currentUser.friends.length; ++index) {
                    if (currentUser.friends[index].toHexString() == userId) {
                        containsFriend = true;
                        currentUser.friends.splice(index, 1);
                        break;
                    }
                }
                if (containsFriend) {
                    sdk.user.saveUser(currentUser, sessionData, function (result) {
                        callback(new typesRest.RestResult(result));
                    });
                }
                else {
                    callback(new typesRest.RestResult(typesRest.RestResultType.NotInList));
                }
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FriendsPage;
//# sourceMappingURL=page.friends.js.map