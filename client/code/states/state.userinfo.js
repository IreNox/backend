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
            sdk.serverPostAndParse('getuser', new RestGetUserRequest(stateData.user_id), [], function (userData) {
                $('#username').html(userData.user.username);
                ui.setLoading('friends_list');
                user.getFriends(userData.user, function (friendsData) {
                    var friendList = $('#friends_list').html(ui.formatFile('userinfo_friend_list', friendsData));
                    friendList.find("button[id*='friend_name']").button().click(function (clickEvent) {
                        var item_id = $(clickEvent.target).prop('id');
                        var user_id = /friend_name_([0-9a-fA-F]+)/.exec(item_id)[1];
                        sdk.changeState("userinfo", { user_id: user_id });
                    });
                });
                $('#message_write_form').submit(function (eventObject) {
                    var sendRequest = new RestMessageRequest(RestMessageActions.Send, userData.user.id, $('#message_write_subject').val(), $('#message_write_message').val());
                    sdk.serverPostAndParse('message', sendRequest, [], function (sentData) {
                        ui.showStatusMessage(ui.preloadHtml('userinfo_message_sent'));
                    });
                    eventObject.preventDefault();
                });
                $('#message_write_button').button();
            });
        });
    };
    return UserInfoState;
})(State);
sdk.registerState('userinfo', new UserInfoState());
//# sourceMappingURL=state.userinfo.js.map