/// <reference path="../../thirdparty/jqueryui/jqueryui.d.ts"/>

class OverviewState extends State {
	public user: RestUser;

	public onActivate() {
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
			
			$('#friends_search_form').submit(function (submitEvent: JQueryEventObject) {
				var obj: any = {};
				obj.username = $('#friends_search_name').val();

				sdk.serverPostAndParse('finduser', obj, [], function (data: RestFindUserResult) {
					var friendList = $('#friends_search_list').html(ui.formatFile('overview_friend_search_list', data));

					ui.buttonList(friendList, 'friend_add', function (id: string) {
						user.addFriend(id, function (data: RestFriendsResult) {
							ui.showStatusMessage(ui.preloadHtml('overview_friend_added'));
							stateObject.refreshUser();
						});
					});

					ui.buttonList(friendList, 'friend_name', function (id: string) {
						sdk.changeState("userinfo", { user_id: id });
					});
				});

				submitEvent.preventDefault();
			});
			$('#friends_search_button').button();

			$('#highscore_form').submit(function (submitEvent: JQueryEventObject) {
				var sendRequest = new RestHighscoreRequest(RestHighscoreActions.Send, $('#highscore_list_name').val(), $('#highscore_points').val());
				sdk.serverPostAndParse('highscore', sendRequest, [], function (data: RestFindUserResult) {
					stateObject.refreshScoreLists();
				});

				submitEvent.preventDefault();
			});
			$('#highscore_button').button();
		});
	}

	private refreshUser() {
		var stateObject = this;

		sdk.serverGetAndParse('getuser', [], function (getUserData: RestGetUserResult) {
			stateObject.user = getUserData.user;

			$('#username').html(getUserData.user.username);
			$('#shop').button('option', 'label', ui.formatFile('overview_shop_button', getUserData.user));

			stateObject.refreshFriendList();
			stateObject.refreshMessages();
		});
	}

	private refreshFriendList() {
		var stateObject = this;

		ui.setLoading('friends_list');
		user.getFriends(stateObject.user, function (friendsData: RestGetUsersResult) {
			var friendList = $('#friends_list').html(ui.formatFile('overview_friend_list', friendsData));

			ui.buttonList(friendList, 'friend_remove', function (id: string) {
				user.removeFriend(id, function (data: RestFriendsResult) {
					ui.showStatusMessage(ui.preloadHtml('overview_friend_removed'));
					stateObject.refreshUser();
				});				
			});

			ui.buttonList(friendList, 'friend_name', function (id: string) {
				sdk.changeState("userinfo", { user_id: id });
			});
		});
	}

	private refreshMessages() {
		var getUnreadCountRequest: RestMessageRequest = new RestMessageRequest(RestMessageActions.GetUnreadCount);
		sdk.serverPostAndParse('message', getUnreadCountRequest, [], function (messageCoundData: RestMessageGetUnreadCountResult) {
			$('#messages').button('option', 'label', ui.formatFile('overview_message_count_button', messageCoundData));
		});
	}

	private refreshScoreLists() {
		var getListsRequest = new RestHighscoreRequest(RestHighscoreActions.GetLists);
		sdk.serverPostAndParse('highscore', getListsRequest, [], function (getListsData: RestHighscoreGetListsResult) {
			var highscoreList = $('#highscore_list').html(ui.formatFile('overview_highscore_list', getListsData));
			ui.buttonList(highscoreList, 'scorelist_name', function (id: string) {
			});
		});
	}
}

sdk.registerState('overview', new OverviewState());