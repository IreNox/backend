/// <reference path="../../thirdparty/jqueryui/jqueryui.d.ts"/>

class OverviewState extends State {
	public user: RestUser;

	public onActivate(): void {
		var stateObject = this;

		$('#content').load('html/overview.html', function () {
			stateObject.refreshUser();

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

					friendList.find("button[id*='friend_add']").button().click(function (clickEvent: JQueryEventObject) {
						var item_id = $(clickEvent.target).prop('id');
						var user_id = /friend_add_([0-9a-fA-F]+)/.exec(item_id)[1];

						user.addFriend(user_id, function (data: RestFriendsResult) {
							ui.showStatusMessage(ui.preloadHtml('overview_friend_added'));
							stateObject.refreshUser();
						});
					});

					friendList.find("button[id*='friend_name']").button().click(function (clickEvent: JQueryEventObject) {
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
	}

	private refreshUser(): void {
		var stateObject = this;

		sdk.serverGetAndParse('getuser', [], function (getUserData: RestGetUserResult) {
			stateObject.user = getUserData.user;

			$('#username').html(getUserData.user.username);

			stateObject.refreshFriendList();
			stateObject.refreshMessages();
		});
	}

	private refreshFriendList(): void {
		var stateObject = this;

		ui.setLoading('friends_list');
		user.getFriends(stateObject.user, function (friendsData: RestGetUsersResult) {
			var friendList = $('#friends_list').html(ui.formatFile('overview_friend_list', friendsData));
			friendList.find("button[id*='friend_remove']").button().click(function (clickEvent: JQueryEventObject) {
				var item_id = $(clickEvent.target).prop('id');
				var user_id = /friend_remove_([0-9a-fA-F]+)/.exec(item_id)[1];

				user.removeFriend(user_id, function (data: RestFriendsResult) {
					ui.showStatusMessage(ui.preloadHtml('overview_friend_removed'));
					stateObject.refreshUser();
				});				
			});

			friendList.find("button[id*='friend_name']").button().click(function (clickEvent: JQueryEventObject) {
				var item_id = $(clickEvent.target).prop('id');
				var user_id = /friend_name_([0-9a-fA-F]+)/.exec(item_id)[1];

				sdk.changeState("userinfo", { user_id: user_id });
			});
		});
	}

	private refreshMessages(): void {
		var getUnreadCountRequest: RestMessageRequest = new RestMessageRequest(RestMessageActions.GetUnreadCount);
		sdk.serverPostAndParse('message', getUnreadCountRequest, [], function (messageCoundData: RestMessageGetUnreadCountResult) {
			$('#messages').button('option', 'label', ui.formatString(ui.preloadHtml('overview_message_count_button'), messageCoundData));
		});
	}
}

sdk.registerState('overview', new OverviewState());