var sdk = require('../sdk');
var typesRest = require('../types/types.rest');
var FriendsActions;
(function (FriendsActions) {
    FriendsActions[FriendsActions["Add"] = 0] = "Add";
    FriendsActions[FriendsActions["Remove"] = 1] = "Remove";
})(FriendsActions || (FriendsActions = {}));
var FriendsPage = (function () {
    function FriendsPage() {
    }
    FriendsPage.prototype.run = function (inputData, sessionData, callback) {
        if (!inputData.action || !inputData.user_id) {
            callback(200, new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
        else if (!sessionData.user) {
            callback(200, { result: 'NotLoggedin' });
        }
        else if (inputData.action == 'add') {
            this.addFriend(inputData.user_id, sessionData, callback);
        }
        else if (inputData.action == 'remove') {
            this.removeFriend(inputData.user_id, sessionData, callback);
        }
        else {
            callback(200, new typesRest.RestResult(typesRest.RestResultType.InvalidCall));
        }
    };
    FriendsPage.prototype.addFriend = function (userId, sessionData, callback) {
        sdk.user.findUser(sessionData.user._id, function (err, currentUser) {
            if (err || !currentUser) {
                callback(200, { result: 'DatabaseError' });
            }
            else {
                sdk.user.findUser(userId, function (err, friendUser) {
                    if (err || !friendUser) {
                        callback(200, { result: 'DatabaseError' });
                    }
                    else {
                        var containsFriend = false;
                        for (var index in currentUser.friends) {
                            if (friendUser._id.equals(currentUser.friends[index]._id)) {
                                containsFriend = true;
                                break;
                            }
                        }
                        if (containsFriend) {
                            callback(200, { result: 'AlreadyInList' });
                        }
                        else {
                            currentUser.friends.push(friendUser._id);
                            sdk.user.saveUser(currentUser, sessionData, function (result) {
                                var obj = new typesRest.RestFriendsResult(result, friendUser._id);
                                if (result == typesRest.RestResultType.Ok) {
                                    obj.user_id = friendUser._id;
                                }
                                callback(200, obj);
                            });
                        }
                    }
                });
            }
        });
    };
    FriendsPage.prototype.removeFriend = function (userId, sessionData, callback) {
        sdk.user.findUser(sessionData.user._id, function (err, currentUser) {
            if (err || !currentUser) {
                callback(200, { result: 'DatabaseError' });
            }
            else {
                var containsFriend = false;
                for (var index in currentUser.friends) {
                    if (currentUser.friends[index]._id.equals(userId)) {
                        containsFriend = true;
                        currentUser.friends.splice(index, 1);
                        break;
                    }
                }
                if (containsFriend) {
                    callback(200, { result: 'Ok' });
                }
                else {
                    callback(200, { result: 'NotInList' });
                }
            }
        });
    };
    return FriendsPage;
})();
module.exports = FriendsPage;
//# sourceMappingURL=page.friends.js.map