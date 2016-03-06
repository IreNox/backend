var sdk = require('../sdk');
var typesRest = require('../types/types.rest');
var FriendsPage = (function () {
    function FriendsPage() {
    }
    FriendsPage.prototype.run = function (inputData, sessionData, callback) {
        if (!inputData.action || !inputData.user_id) {
            callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
        else if (!sessionData.user) {
            callback(new typesRest.RestFriendsResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.action == 'add') {
            this.addFriend(inputData.user_id, sessionData, callback);
        }
        else if (inputData.action == 'remove') {
            this.removeFriend(inputData.user_id, sessionData, callback);
        }
        else {
            callback(new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
    };
    FriendsPage.prototype.addFriend = function (userId, sessionData, callback) {
        sdk.user.findUser(sessionData.user.id, function (err, currentUser) {
            if (err || !currentUser) {
                callback(new typesRest.RestFriendsResult(typesRest.RestResultType.DatabaseError));
            }
            else {
                sdk.user.findUser(userId, function (err, friendUser) {
                    if (err || !friendUser) {
                        callback(new typesRest.RestFriendsResult(typesRest.RestResultType.DatabaseError));
                    }
                    else {
                        var containsFriend = false;
                        for (var index in currentUser.friends) {
                            if (friendUser._id.equals(currentUser.friends[index])) {
                                containsFriend = true;
                                break;
                            }
                        }
                        if (containsFriend) {
                            callback(new typesRest.RestFriendsResult(typesRest.RestResultType.AlreadyInList, typesRest.RestUserId.fromDatabase(friendUser)));
                        }
                        else {
                            currentUser.friends.push(friendUser._id);
                            sdk.user.saveUser(currentUser, sessionData, function (result) {
                                var obj = new typesRest.RestFriendsResult(result);
                                if (result == typesRest.RestResultType.Ok) {
                                    obj.user_id = friendUser._id.toHexString();
                                }
                                callback(obj);
                            });
                        }
                    }
                });
            }
        });
    };
    FriendsPage.prototype.removeFriend = function (userId, sessionData, callback) {
        sdk.user.findUser(sessionData.user.id, function (err, currentUser) {
            if (err || !currentUser) {
                callback(new typesRest.RestFriendsResult(typesRest.RestResultType.DatabaseError));
            }
            else {
                var containsFriend = false;
                for (var index in currentUser.friends) {
                    if (currentUser.friends[index].toHexString() == userId) {
                        containsFriend = true;
                        currentUser.friends.splice(index, 1);
                        break;
                    }
                }
                if (containsFriend) {
                    sdk.user.saveUser(currentUser, sessionData, function (result) {
                        callback(new typesRest.RestFriendsResult(result));
                    });
                }
                else {
                    callback(new typesRest.RestFriendsResult(typesRest.RestResultType.NotInList));
                }
            }
        });
    };
    return FriendsPage;
})();
module.exports = FriendsPage;
//# sourceMappingURL=page.friends.js.map