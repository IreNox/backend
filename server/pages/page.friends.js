var models = require('../models.js');
var sdk = require('../sdk');

module.exports = {
	run: function (inputData, sessionData, callback) {
		if (!inputData.action || !inputData.user_id) {
			callback(200, { result: 'InvalidCall' });
		}
		else if (!sessionData.user) {
			callback(200, { result: 'NotLoggedin' });
		}
		else if (inputData.action == 'add') {
			sdk.user.findUser(sessionData.user._id, function (err, currentUser) {
				if (err || !currentUser) {
					callback(200, { result: 'DatabaseError' });
				}
				else {
					sdk.user.findUser(inputData.user_id, function (err, friendUser) {
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
									var obj = { result: result };
									if (result == 'Ok') {
										obj.user_id = friendUser._id;
									}
									obj.user = currentUser;

									callback(200, obj);
								});
							}
						}
					});
				}
			});
		}
		else if (inputData.action == 'remove') {
			sdk.user.findUser(sessionData.user._id, function (err, currentUser) {
				if (err || !currentUser) {
					callback(200, { result: 'DatabaseError' });
				}
				else {
					var containsFriend = false;
					for (var index in currentUser.friends) {
						if (friendUser._id.equals(currentUser.friends[index]._id)) {
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
		else {
			obj.result = 'InvalidCall';
			callback(200, obj);
		}
	}
};
