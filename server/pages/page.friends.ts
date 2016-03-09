import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../types/types.rest';
import * as typesPage from '../types/types.page';

export default class FriendsPage implements typesPage.Page {
    run(inputData: typesRest.RestFriendsRequest, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
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

    private addFriend(userId: string, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
        sdk.user.findUser(sessionData.user.id, function (err, currentUser: modelUser.User) {
            if (err || !currentUser) {
                callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
            }
            else {
                sdk.user.findUser(userId, function (err, friendUser: modelUser.User) {
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
                            sdk.user.saveUser(currentUser, sessionData, function (result: typesRest.RestResultType) {
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

    private removeFriend(userId: string, sessionData: typesPage.SessionData, callback: typesPage.RestCallback) {
        sdk.user.findUser(sessionData.user.id, function (err, currentUser: modelUser.User) {
            if (err || !currentUser) {
                callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));
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
