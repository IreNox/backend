var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UserInfoState = (function (_super) {
    __extends(UserInfoState, _super);
    function UserInfoState() {
        _super.apply(this, arguments);
    }
    UserInfoState.prototype.onActivate = function (stateData) {
        $('#content').load('html/userinfo.html', function () {
            sdk.serverPostAndParse('getuser', new RestGetUserRequest(stateData.user_id), [], function (data) {
                $('#username').html(data.user.username);
            });
        });
    };
    return UserInfoState;
})(State);
sdk.registerState('userinfo', new UserInfoState());
//# sourceMappingURL=state.userinfo.js.map