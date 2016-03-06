/// <reference path="../../thirdparty/jqueryui/jqueryui.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OverviewState = (function (_super) {
    __extends(OverviewState, _super);
    function OverviewState() {
        _super.apply(this, arguments);
    }
    OverviewState.prototype.onActivate = function () {
        var stateObject = this;
        $('#content').load('html/overview.html', function () {
            stateObject.refreshUser();
            $('#logout').button().click(function () {
                user.logout();
            });
            $('#friends_search_form').submit(function (submitEvent) {
                var obj = {};
                obj.username = $('#friends_search_name').val();
                sdk.serverPostAndParse('finduser', obj, [], function (data) {
                    var html = sdk.preloadHtml('overview_friend_seach_list_begin');
                    data.users.forEach(function (user) {
                        html += sdk.formatString(sdk.preloadHtml('overview_friend_seach_list_entry'), user);
                    });
                    html += sdk.preloadHtml('overview_friend_seach_list_end');
                    var friendList = $('#friends_search_list').html(html);
                    friendList.find("button[id*='friend_add']").button().click(function (clickEvent) {
                        var item_id = $(clickEvent.target).prop('id');
                        var user_id = /friend_add_([0-9a-fA-F]+)/.exec(item_id)[1];
                        user.addFriend(user_id, function (data) {
                            sdk.showStatusMessage(sdk.preloadHtml('overview_friend_added'));
                            stateObject.refreshUser();
                        });
                    });
                    friendList.find("button[id*='friend_name']").button().click(function (clickEvent) {
                        var item_id = $(clickEvent.target).prop('id');
                        var user_id = /friend_name_([0-9a-fA-F]+)/.exec(item_id)[1];
                        sdk.changeState("userinfo", { user_id: user_id });
                        clickEvent.preventDefault();
                    });
                });
                submitEvent.preventDefault();
            });
            $('#friends_search_button').button();
        });
    };
    OverviewState.prototype.refreshUser = function () {
        var stateObject = this;
        sdk.serverGetAndParse('getuser', [], function (getUserData) {
            stateObject.user = getUserData.user;
            $('#username').html(getUserData.user.username);
            stateObject.refreshFriendList();
        });
    };
    OverviewState.prototype.refreshFriendList = function () {
        var stateObject = this;
        sdk.setLoading('friends_list');
        sdk.serverPostAndParse('getusers', new RestGetUsersRequest(stateObject.user.friends), [], function (friendsData) {
            var html = sdk.formatString(sdk.preloadHtml('general_list_begin'), { id: 'friends_menu' });
            friendsData.users.forEach(function (friend) {
                html += sdk.formatString(sdk.preloadHtml('overview_friend_list_entry'), friend);
            });
            html += sdk.preloadHtml('general_list_end');
            var friendList = $('#friends_list').html(html);
            friendList.find("button[id*='friend_remove']").button().click(function (clickEvent) {
                var item_id = $(clickEvent.target).prop('id');
                var user_id = /friend_remove_([0-9a-fA-F]+)/.exec(item_id)[1];
                user.removeFriend(user_id, function (data) {
                    sdk.showStatusMessage(sdk.preloadHtml('overview_friend_removed'));
                    stateObject.refreshUser();
                });
            });
            friendList.find("button[id*='friend_name']").button().click(function (clickEvent) {
                var item_id = $(clickEvent.target).prop('id');
                var user_id = /friend_name_([0-9a-fA-F]+)/.exec(item_id)[1];
                sdk.changeState("userinfo", { user_id: user_id });
            });
        });
    };
    return OverviewState;
})(State);
sdk.registerState('overview', new OverviewState());
//# sourceMappingURL=state.overview.js.map