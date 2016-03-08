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
            stateObject.refreshScoreLists();
            $('#shop').button().click(function () {
                sdk.changeState('shop');
            });
            $('#messages').button().click(function () {
                sdk.changeState('message');
            });
            $('#logout').button().click(function () {
                user.logout();
            });
            $('#friends_search_form').submit(function (submitEvent) {
                var obj = {};
                obj.username = $('#friends_search_name').val();
                sdk.serverPostAndParse('finduser', obj, [], function (data) {
                    var friendList = $('#friends_search_list').html(ui.formatFile('overview_friend_search_list', data));
                    ui.buttonList(friendList, 'friend_add', function (id) {
                        user.addFriend(id, function (data) {
                            ui.showStatusMessage(ui.preloadHtml('overview_friend_added'));
                            stateObject.refreshUser();
                        });
                    });
                    ui.buttonList(friendList, 'friend_name', function (id) {
                        sdk.changeState("userinfo", { user_id: id });
                    });
                });
                submitEvent.preventDefault();
            });
            $('#friends_search_button').button();
            $('#highscore_form').submit(function (submitEvent) {
                var sendRequest = new RestHighscoreRequest(RestHighscoreActions.Send, $('#highscore_list_name').val(), $('#highscore_points').val());
                sdk.serverPostAndParse('highscore', sendRequest, [], function (data) {
                    stateObject.refreshScoreLists();
                });
                submitEvent.preventDefault();
            });
            $('#highscore_button').button();
        });
    };
    OverviewState.prototype.refreshUser = function () {
        var stateObject = this;
        sdk.serverGetAndParse('getuser', [], function (getUserData) {
            stateObject.user = getUserData.user;
            $('#username').html(getUserData.user.username);
            $('#shop').button('option', 'label', ui.formatFile('overview_shop_button', getUserData.user));
            stateObject.refreshFriendList();
            stateObject.refreshMessages();
        });
    };
    OverviewState.prototype.refreshFriendList = function () {
        var stateObject = this;
        ui.setLoading('friends_list');
        user.getFriends(stateObject.user, function (friendsData) {
            var friendList = $('#friends_list').html(ui.formatFile('overview_friend_list', friendsData));
            ui.buttonList(friendList, 'friend_remove', function (id) {
                user.removeFriend(id, function (data) {
                    ui.showStatusMessage(ui.preloadHtml('overview_friend_removed'));
                    stateObject.refreshUser();
                });
            });
            ui.buttonList(friendList, 'friend_name', function (id) {
                sdk.changeState("userinfo", { user_id: id });
            });
        });
    };
    OverviewState.prototype.refreshMessages = function () {
        var getUnreadCountRequest = new RestMessageRequest(RestMessageActions.GetUnreadCount);
        sdk.serverPostAndParse('message', getUnreadCountRequest, [], function (messageCoundData) {
            $('#messages').button('option', 'label', ui.formatFile('overview_message_count_button', messageCoundData));
        });
    };
    OverviewState.prototype.refreshScoreLists = function () {
        var getListsRequest = new RestHighscoreRequest(RestHighscoreActions.GetLists);
        sdk.serverPostAndParse('highscore', getListsRequest, [], function (getListsData) {
            var highscoreList = $('#highscore_list').html(ui.formatFile('overview_highscore_list', getListsData));
            ui.buttonList(highscoreList, 'scorelist_name', function (id) {
            });
        });
    };
    return OverviewState;
}(State));
sdk.registerState('overview', new OverviewState());
//# sourceMappingURL=state.overview.js.map