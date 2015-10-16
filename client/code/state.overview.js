$('#content').load('html/overview.html', function () {
	sdk.serverGet('getuser', function (data) {
		sdk.parseResult(data, [], function (ok) {
			if (ok) {
				$('#username').html(data.user.username);
			}
		});
	});

	$('#logout').button().click(function () {
		user.logout();
	});

	$('#friends_form').submit(function (event) {
		var obj = {};
		obj.username = $('#friends_name').val();
		
		sdk.serverPost('finduser', obj, function (data) {
			sdk.parseResult(data, [], function (ok) {
				if (ok) {
					var html = '<ul id="friends_list">';
					for (var index in data.users) {
						html += '<li id="friend_' + index + '">' + data.users[index].username + '</li>';
					}
					html += '</ul>';

					$('#friends').html(html);
					$("#friends_list").menu({
						select: function (event, ui) {
							console.log(event);
							console.log(ui);
						}
					});
				}
			});
		});

		event.preventDefault();
	});
	$('#friends_button').button().click(function () {
		$('#friends_form').submit();
	});
});