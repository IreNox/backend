/// <reference path="../../thirdparty/jqueryui/jqueryui.d.ts"/>

class OverviewState extends State {
	public onActivate() {
		var stateObject = this;

		$('#content').load('html/overview.html', function () {
			if (Global.user) {
				stateObject.onRefreshUser(Global.user);
			}

			stateObject.refreshScoreLists();

			$('#friends_search_form').submit(function (submitEvent: JQueryEventObject) {
				var obj: any = {};
				obj.username = $('#friends_search_name').val();

				sdk.serverPostAndParse('finduser', obj, [], function (data: RestFindUserResult) {
					var friendList = $('#friends_search_list').html(ui.formatFile('overview_friend_search_list', data));

					ui.buttonList(friendList, 'friend_add', function (id: string) {
						user.addFriend(id, function (data: RestFriendsResult) {
							ui.showStatusMessage(ui.preloadHtml('overview_friend_added'));
							user.refreshUser();
						});
					});

					ui.buttonList(friendList, 'friend_name', function (id: string) {
						sdk.changeState(StateType.UserInfo, { user_id: id });
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

	public onRefreshUser(user: RestUser) {
		var stateObject = this;

		$('#username').html(user.username);

		stateObject.refreshFriendList();
	}

	private refreshFriendList() {
		var stateObject = this;

		ui.setLoading('friends_list');
		user.getFriends(Global.user, function (friendsData: RestGetUsersResult) {
			var friendList = $('#friends_list').html(ui.formatFile('overview_friend_list', friendsData));

			ui.buttonList(friendList, 'friend_remove', function (id: string) {
				user.removeFriend(id, function (data: RestFriendsResult) {
					ui.showStatusMessage(ui.preloadHtml('overview_friend_removed'));
					user.refreshUser();
				});				
			});

			ui.buttonList(friendList, 'friend_name', function (id: string) {
				sdk.changeState(StateType.UserInfo, { user_id: id });
			});
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

sdk.registerState(StateType.Overview, new OverviewState());