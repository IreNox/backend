﻿$('#content').load('html/login.html', function () {
    $('#login_form').submit(function (eventObject: JQueryEventObject) {
        user.login(new RestLoginRequest($('#username').val(), $('#password').val()));
        eventObject.preventDefault();
    });
    $('#login_button').button().click(function () {
        $('#login_form').submit();
    });
});