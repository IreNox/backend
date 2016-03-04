﻿$('#content').load('html/userinfo.html', function () {
    var getuserData: RestGetUserRequest = new RestGetUserRequest(Global.stateData.user_id);
    sdk.serverPost('getuser', getuserData, function (data: RestGetUserResult) {
        sdk.parseResult(data, [], function (ok) {
            if (ok) {
                $('#username').html(data.user.username);
            }
        });
    });
});