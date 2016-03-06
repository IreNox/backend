$('#content').load('html/login.html', function () {
    $('#login_form').submit(function (eventObject) {
        user.login(new RestLoginRequest($('#username').val(), $('#password').val()));
        eventObject.preventDefault();
    });
    $('#login_button').button();
});
//# sourceMappingURL=state.login.js.map