var user;
(function (user_1) {
    function onLogin(userId) {
        Global.userId = userId;
        var hasValidState = sdk.activateState();
        if (hasValidState && Global.stateName == 'login') {
            hasValidState = false;
        }
        user.refreshUser(function (user) {
            if (!hasValidState) {
                sdk.changeState('overview');
            }
        });
    }
    function login(loginData) {
        sdk.serverPostAndParse('login', loginData, ['AlreadyLoggedin'], function (data) {
            onLogin(data.userId);
        }, function () {
            ui.refreshMenu();
            sdk.changeState('login');
        });
    }
    user_1.login = login;
    function signUp(loginData) {
        sdk.serverPostAndParse('signup', loginData, [], function (data) {
            onLogin(data.userId);
        }, function () {
            sdk.changeState('login');
        });
    }
    user_1.signUp = signUp;
    function logout() {
        sdk.serverGet('logout', function () {
            Global.userId = null;
            Global.user = null;
            ui.refreshMenu();
            sdk.changeState('login');
        });
    }
    user_1.logout = logout;
    function refreshUser(callback, force) {
        if (force === void 0) { force = false; }
        sdk.serverGetAndParse('getuser', [], function (getUserData) {
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
    user_1.refreshUser = refreshUser;
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