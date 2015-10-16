var global = {
	user_id: ""
};

/*var cache = {
	code: [],
	html: []
};*/

var sdk = {
	setLoading: function () {
		$('#content').html('<img src="img/ajax-loader.gif" />');
	},
	/*loadCached: function (target, fileName, callback) {
		var cachedHtml = cache.html[fileName];
		if (cachedHtml)
		{
			$(target).html(cachedHtml);
			callback(cachedHtml);
		}
		else
		{
			$.get(fileName, function (data) {
				cache.html[fileName] = data;

				$(target).html(data);
				callback(data);
			});
		}
	},*/
	changeState: function (stateName) {
		sdk.setLoading();
		$.getScript('code/state.' + stateName + '.js');
	},
	serverGet: function (url, callback) {
		$.ajax({
			url: '../' + url,
			dataType: 'json',
			success: callback
		});
	},
	serverPost: function (url, data, callback) {
		$.ajax({
			type: "POST",
			url: '../' + url,
			data: data,
			dataType: 'json',
			success: callback
		});
	},
	parseResult: function (data, acceptedResults, callback) {
		acceptedResults.push('Ok');

		if ($.inArray(data.result, acceptedResults) < 0) {
			$('#error').html(data.result);

			callback(false);
		}
		else {
			callback(true);
		}
	}
};

var user = {
	login: function (username, password) {
		var obj = {};
		obj.username = username;
		obj.password = password;

		sdk.serverPost('login', obj, function (data) {
			sdk.parseResult(data, ['AlreadyLoggedin'], function (ok) {
				if (ok) {
					global.user_id = data.user_id;
					sdk.changeState('overview');
				}
				else {
					sdk.changeState('login');
				}
			});
		});
	},
	logout: function () {
		sdk.serverGet('logout', function () {
			sdk.changeState('login');
		});
	}
};

$(document).ready(function () {
	sdk.setLoading();
	user.login();
});