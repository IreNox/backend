/// <reference path="../../thirdparty/jqueryui/jqueryui.d.ts"/>

$('#content').load('html/overview.html', function () {
    sdk.serverGet('getuser', function (getUserData: RestGetUserResult) {
		sdk.parseResult(getUserData, [], function (ok) {
			if (ok) {
                $('#username').html(getUserData.user.username);

				sdk.setLoading('friends_list');
				sdk.serverPostAndParse('getusers', new RestGetUsersRequest(getUserData.user.friends), [], function (friendsData: RestGetUsersResult) {
					var html: string = sdk.formatString(sdk.preloadHtml('general_list_begin'), { id: 'friends_menu' });
					friendsData.users.forEach(function (friend: User) {
						html += sdk.formatString(sdk.preloadHtml('general_list_entry'), friend);
					});
					html += sdk.preloadHtml('general_list_end');

					$('#friends_list').html(html);
				});
			}
		});
	});

	$('#logout').button().click(function () {
		user.logout();
	});

	$('#friends_search_form').submit(function (submitEvent) {
		var obj: any = {};
		obj.username = $('#friends_search_name').val();
		
        sdk.serverPost('finduser', obj, function (data: RestFindUserResult) {
			sdk.parseResult(data, [], function (ok) {
                if (ok) {
                    var html: string = sdk.preloadHtml('overview_friends_list_begin');
					data.users.forEach(function (user) {
						html += sdk.formatString(sdk.preloadHtml('overview_friends_list_entry'), user);
					});
                    html += sdk.preloadHtml('overview_friends_list_end');

                    $('#friends_search_list').html(html);
                    $("#friends_search_list > div").children('button').click(function (clickEvent: JQueryEventObject) {
                        var item_id = $(clickEvent.target).parent().prop('id');
                        var user_id = /friend_([0-9a-fA-F]+)/.exec(item_id)[1];

						user.addFriend(user_id, function (ok: boolean) {
							if (ok) {
								$('#status').html(sdk.preloadHtml('overview_friends_added')).show(0).fadeOut(2000);
							}
                        });
                    });

                    $("#friends_search_list > div").children('a').click(function (clickEvent: JQueryEventObject) {
                        var item_id = $(clickEvent.target).parent().prop('id');
                        var user_id = /friend_([0-9a-fA-F]+)/.exec(item_id)[1];

                        sdk.changeState("userinfo", { user_id: user_id });

                        clickEvent.preventDefault();
                    });
				}
			});
		});

		submitEvent.preventDefault();
	});
	$('#friends_search_button').button().click(function () {
        $('#friends_search_form').submit();
	});
});