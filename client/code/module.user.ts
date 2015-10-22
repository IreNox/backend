
module user {
    export function login(loginData?: RestLoginRequest) {
        sdk.serverPost('login', loginData, function (data: RestLoginResult) {
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

    export function logout() {
        sdk.serverGet('logout', function () {
            sdk.changeState('login');
        });
    }
}