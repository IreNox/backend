var user;
(function (user) {
    function login(loginData) {
        sdk.serverPostAndParse('login', loginData, ['AlreadyLoggedin'], function (data) {
            Global.userId = data.user_id;
            var hasValidState = sdk.activateState();
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
    user.login = login;
    function signUp(loginData) {
        sdk.serverPostAndParse('signup', loginData, [], function (data) {
            Global.userId = data.user_id;
            var hasValidState = sdk.activateState();
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
    user.signUp = signUp;
    function logout() {
        sdk.serverGet('logout', function () {
            sdk.changeState('login');
        });
    }
    user.logout = logout;
    function addFriend(userId, okCallback, failedCallback) {
        var request = new RestFriendsRequest(RestFriendsActions.Add, userId);
        sdk.serverPostAndParse('friends', request, [], okCallback, failedCallback);
    }
    user.addFriend = addFriend;
    function removeFriend(userId, okCallback, failedCallback) {
        var request = new RestFriendsRequest(RestFriendsActions.Remove, userId);
        sdk.serverPostAndParse('friends', request, [], okCallback, failedCallback);
    }
    user.removeFriend = removeFriend;
})(user || (user = {}));
//# sourceMappingURL=module.user.js.map