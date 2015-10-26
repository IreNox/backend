import models = require('../models');
import sdk = require('../sdk');
import typesRest = require('../types/types.rest')
import typesPage = require('../types/types.page')

enum FriendsActions {
    Add,
    Remove
}

class FriendsPage implements typesPage.Page {
    run(inputData: any, sessionData: any, callback: typesPage.RestCallback): void {
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
    }

    private addFriend(userId: string, sessionData: any, callback: typesPage.RestCallback): void {
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
                            sdk.user.saveUser(currentUser, sessionData, function (result: typesRest.RestResultType) {
                                var obj: typesRest.RestFriendsResult = new typesRest.RestFriendsResult(result, friendUser._id);
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
    }

    private removeFriend(userId: string, sessionData: any, callback: typesPage.RestCallback) {
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
    }
}
export = FriendsPage;
