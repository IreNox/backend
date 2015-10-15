$(document.body).load('html/login.html', function () {
	$('#login_form').submit(function (event) {
		sdk.login($('#username').val(), $('#password').val());
		event.preventDefault();
	});
	$('#login_button').button().click(function () {
		$('#login_form').submit();
	});
});