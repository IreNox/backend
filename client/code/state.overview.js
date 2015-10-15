$(document.body).load('html/overview.html', function () {
	$('#friends_form').submit(function (event) {
		var obj = {};
		obj.username = $('#friends_name');
		
		$.ajax({
			type: "POST",
			url: '../finduser',
			data: obj,
			dataType: 'json',
			success: function (data) {
				sdk.parseResult(data, [], function (ok) {
					if (ok) {
						$('#friends').html(JSON.stringify(data));
					}
				});
			}
		});

		event.preventDefault();
	});
	$('#friends_button').button().click(function () {
		$('#friends_form').submit();
	});
});