var user;
(function (user_1) {
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
    user_1.login = login;
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
    user_1.signUp = signUp;
    function logout() {
        sdk.serverGet('logout', function () {
            sdk.changeState('login');
        });
    }
    user_1.logout = logout;
    function addFriend(userId, okCallback, failedCallback) {
        var request = new RestFriendsRequest(RestFriendsActions.Add, userId);
        sdk.serverPostAndParse('friends', request, [], okCallback, failedCallback);
    }
    user_1.addFriend = addFriend;
    function removeFriend(userId, okCallback, failedCallback) {
        var request = new RestFriendsRequest(RestFriendsActions.Remove, userId);
        sdk.serverPostAndParse('friends', request, [], okCallback, failedCallback);
    }
    user_1.removeFriend = removeFriend;
    function getFriends(user, okCallback, failedCallback) {
        sdk.serverPostAndParse('getusers', new RestGetUsersRequest(user.friends), [], okCallback, failedCallback);
    }
    user_1.getFriends = getFriends;
})(user || (user = {}));
//# sourceMappingURL=module.user.js.map