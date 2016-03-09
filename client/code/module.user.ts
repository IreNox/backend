
interface UserCallback {
	(user: RestUser): void;
}

module user {
	function onLogin(userId: string) {
		Global.userId = userId;

		var hasValidState: boolean = sdk.activateState();
		if (hasValidState && Global.stateName == 'login') {
			hasValidState = false;
		}

		user.refreshUser(function (user: RestUser) {
			if (!hasValidState) {
				sdk.changeState('overview');
			}
		});
	}

    export function login(loginData?: RestLoginRequest) {
        sdk.serverPostAndParse('login', loginData, ['AlreadyLoggedin'], function (data: RestLoginResult) {
			onLogin(data.userId);
        }, function () {
			sdk.changeState('login');
		});
    }

	export function signUp(loginData: RestLoginRequest) {
		sdk.serverPostAndParse('signup', loginData, [], function (data: RestLoginResult) {
            onLogin(data.userId);
        }, function () {
			sdk.changeState('login');
		});
	}

    export function logout() {
        sdk.serverGet('logout', function () {
			Global.userId = null;
			Global.user = null;

            sdk.changeState('login');
        });
    }

	export function refreshUser(callback?: UserCallback, force: boolean = false) {
		sdk.serverGetAndParse('getuser', [], function (getUserData: RestGetUserResult) {
			Global.user = getUserData.user;

			ui.refreshMenu(force);

			if (Global.stateObject) {
				Global.stateObject.onRefreshUser(getUserData.user);
			}

			if (callback) {
				callback(getUserData.user);
			}
		});
	}

    export function addFriend(userId: string, okCallback: RestCallback, failedCallback?: RestCallback) {
        var request: RestFriendsRequest = new RestFriendsRequest(RestFriendsActions.Add, userId);
        sdk.serverPostAndParse('friends', request, [], okCallback, failedCallback);
    }

	export function removeFriend(userId: string, okCallback: RestCallback, failedCallback?: RestCallback) {
        var request: RestFriendsRequest = new RestFriendsRequest(RestFriendsActions.Remove, userId);
        sdk.serverPostAndParse('friends', request, [], okCallback, failedCallback);
	}

	export function getFriends(user: RestUser, okCallback: RestCallback, failedCallback?: RestCallback) {
		sdk.serverPostAndParse('getusers', new RestGetUsersRequest(user.friends), [], okCallback, failedCallback);
	}
}