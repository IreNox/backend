var user;
(function (user) {
    function login(loginData) {
        sdk.serverPost('login', loginData, function (data) {
            sdk.parseResult(data, ['AlreadyLoggedin'], function (ok) {
                if (ok) {
                    global.userId = data.user_id;
                    if (!sdk.activateState()) {
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
})(user || (user = {}));
//# sourceMappingURL=module.user.js.map