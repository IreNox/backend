var global = {
	user_id: ""
};

var sdk = {
	login: function (username, password) {
		var obj = {};
		obj.username = username;
		obj.password = password;

		$.ajax({
			type: "POST",
			url: '../login',
			data: obj,
			dataType: 'json',
			success: function (data) {
				sdk.parseResult(data, ['AlreadyLoggedin'], function (ok) {
					if (ok) {
						global.user_id = data.user_id;
						$.getScript('code/state.overview.js');
					}
					else {
						$.getScript('code/state.login.js');
					}				
				});
			}
		});
	},
	parseResult: function (data, acceptedResults, callback) {
		acceptedResults.push('Ok');

		if ($.inArray(data.result, acceptedResults) === false) {
			$('#error').html(data.result);

			callback(false);
		}
		else {
			callback(true);
		}
	}
};

$(document).ready(function () {
	$(document.body).html('Test!<input type="button" id="test" value="Do it!" />');

	sdk.login();
	

	//$('#test').button().click(function () {
	//	$('#test').prop('value', 'Done!');
	//});
});