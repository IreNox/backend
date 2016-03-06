var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoginState = (function (_super) {
    __extends(LoginState, _super);
    function LoginState() {
        _super.apply(this, arguments);
    }
    LoginState.prototype.onActivate = function () {
        $('#content').load('html/login.html', function () {
            $('#login_form').submit(function (eventObject) {
                user.login(new RestLoginRequest($('#login_username').val(), $('#login_password').val()));
                eventObject.preventDefault();
            });
            $('#login_button').button();
            $('#signup_form').submit(function (eventObject) {
                user.signUp(new RestLoginRequest($('#signup_username').val(), $('#signup_password').val()));
                eventObject.preventDefault();
            });
            $('#signup_button').button();
        });
    };
    return LoginState;
})(State);
sdk.registerState('login', new LoginState());
//# sourceMappingURL=state.login.js.map