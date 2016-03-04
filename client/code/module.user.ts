
module user {
    export function login(loginData?: RestLoginRequest) {
        sdk.serverPost('login', loginData, function (data: RestLoginResult) {
            sdk.parseResult(data, ['AlreadyLoggedin'], function (ok) {
                if (ok) {
                    Global.userId = data.user_id;

                    var hasValidState: boolean = sdk.activateState();
                    if (hasValidState && Global.stateName == 'login') {
                        hasValidState = false;
                    }

                    if (!hasValidState) {
                        sdk.changeState('overview');
                    }
                }
                else {
                    sdk.changeState('login');
                }
            });
        });
    }

    export function logout() {
        sdk.serverGet('logout', function () {
            sdk.changeState('login');
        });
    }

    export function addFriend(userId: string, callback: ResultCallback) {
        var request: RestFriendsRequest = new RestFriendsRequest(RestFriendsActions.Add, userId);
        sdk.serverPost('friends', request, function (result: RestFriendsResult) {
            sdk.parseResult(result, [], callback);
        });
    }
}