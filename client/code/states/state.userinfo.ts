
class UserInfoState extends State {
	public onActivate(stateData: any): void {
		$('#content').load('html/userinfo.html', function () {
			sdk.serverPostAndParse('getuser', new RestGetUserRequest(stateData.user_id), [], function (userData: RestGetUserResult) {
				$('#username').html(userData.user.username);

				ui.setLoading('friends_list');
				user.getFriends(userData.user, function (friendsData: RestGetUserResult) {
					var friendList = $('#friends_list').html(ui.formatFile('userinfo_friend_list', friendsData));
					friendList.find("button[id*='friend_name']").button().click(function (clickEvent: JQueryEventObject) {
						var item_id = $(clickEvent.target).prop('id');
						var user_id = /friend_name_([0-9a-fA-F]+)/.exec(item_id)[1];

						sdk.changeState("userinfo", { user_id: user_id });
					});
				});

				$('#message_write_form').submit(function (eventObject: JQueryEventObject) {
					var sendRequest: RestMessageRequest = new RestMessageRequest(
						RestMessageActions.Send,
						userData.user.id,
						$('#message_write_subject').val(),
						$('#message_write_message').val()
					);
					sdk.serverPostAndParse('message', sendRequest, [], function (sentData: RestResult) {
						ui.showStatusMessage(ui.preloadHtml('userinfo_message_sent'));
					});
					
					eventObject.preventDefault();
				});
				$('#message_write_button').button();
			});
		});
	}
}

sdk.registerState('userinfo', new UserInfoState());
