var user;
(function (user) {
    function login(loginData) {
        sdk.serverPost('login', loginData, function (data) {
            sdk.parseResult(data, ['AlreadyLoggedin'], function (ok) {
                if (ok) {
                    Global.userId = data.user_id;
                    var hasValidState = sdk.activateState();
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
    user.login = login;
    function logout() {
        sdk.serverGet('logout', function () {
            sdk.changeState('login');
        });
    }
    user.logout = logout;
    function addFriend(userId, callback) {
        var request = new RestFriendsRequest(RestFriendsActions.Add, userId);
        sdk.serverPost('friends', request, function (result) {
            sdk.parseResult(result, [], callback);
        });
    }
    user.addFriend = addFriend;
})(user || (user = {}));
//# sourceMappingURL=module.user.js.map