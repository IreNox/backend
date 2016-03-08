import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../types/types.rest';
import * as typesPage from '../types/types.page';

export default class FriendsPage implements typesPage.Page {
    run(inputData: any, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
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
    }

    private addFriend(userId: string, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        sdk.user.findUser(sessionData.user.id, function (err, currentUser: modelUser.User) {
            if (err || !currentUser) {
                callback(new typesRest.RestFriendsResult(typesRest.RestResultType.DatabaseError));
            }
            else {
                sdk.user.findUser(userId, function (err, friendUser: modelUser.User) {
                    if (err || !friendUser) {
                        callback(new typesRest.RestFriendsResult(typesRest.RestResultType.DatabaseError));
                    }
                    else {
                        var containsFriend = false;
						currentUser.friends.forEach(function (friendId) {
                            if (friendUser._id.equals(friendId)) {
                                containsFriend = true;
                            }
						});

                        if (containsFriend) {
                            callback(new typesRest.RestFriendsResult(typesRest.RestResultType.AlreadyInList, sdk.user.getIdFromDatabase(friendUser)));
                        }
                        else {
                            currentUser.friends.push(friendUser._id);
                            sdk.user.saveUser(currentUser, sessionData, function (result: typesRest.RestResultType) {
                                var obj: typesRest.RestFriendsResult = new typesRest.RestFriendsResult(result);
                                if (result == typesRest.RestResultType.Ok) {
                                    obj.user_id = friendUser.id;
                                }

                                callback(obj);
                            });
                        }
                    }
                });
            }
        });
    }

    private removeFriend(userId: string, sessionData: typesPage.SessionData, callback: typesPage.RestCallback) {
        sdk.user.findUser(sessionData.user.id, function (err, currentUser: modelUser.User) {
            if (err || !currentUser) {
                callback(new typesRest.RestFriendsResult(typesRest.RestResultType.DatabaseError));
            }
            else {
                var containsFriend = false;
                for (var index: number = 0; index < currentUser.friends.length; ++index) {
                    if (currentUser.friends[index].toHexString() == userId) {
                        containsFriend = true;
                        currentUser.friends.splice(index, 1);
                        break;
                    }
                }

                if (containsFriend) {
					sdk.user.saveUser(currentUser, sessionData, function (result: typesRest.RestResultType) {
						callback(new typesRest.RestFriendsResult(result));
					});
				}
                else {
                    callback(new typesRest.RestFriendsResult(typesRest.RestResultType.NotInList));
                }
            }
        });
    }
}
