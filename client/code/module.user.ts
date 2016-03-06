
module user {
    export function login(loginData?: RestLoginRequest) {
        sdk.serverPostAndParse('login', loginData, ['AlreadyLoggedin'], function (data: RestLoginResult) {
            Global.userId = data.user_id;

            var hasValidState: boolean = sdk.activateState();
            if (hasValidState && Global.stateName == 'login') {
                hasValidState = false;
            }

            if (!hasValidState) {
                sdk.changeState('overview');
            }
        }, function () {
			sdk.changeState('login');
		});
    }

	export function signUp(loginData: RestLoginRequest) {
		sdk.serverPostAndParse('signup', loginData, [], function (data: RestLoginResult) {
            Global.userId = data.user_id;

            var hasValidState: boolean = sdk.activateState();
            if (hasValidState && Global.stateName == 'login') {
                hasValidState = false;
            }

            if (!hasValidState) {
                sdk.changeState('overview');
            }
        }, function () {
			sdk.changeState('login');
		});
	}

    export function logout() {
        sdk.serverGet('logout', function () {
            sdk.changeState('login');
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