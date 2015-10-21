/// <reference path="../thirdparty/dep/jqueryui/jqueryui.d.ts"/>
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
    $('#friends_form').submit(function (submitEvent) {
        var obj = {};
        obj.username = $('#friends_name').val();
        sdk.serverPost('finduser', obj, function (data) {
            sdk.parseResult(data, [], function (ok) {
                if (ok) {
                    var html = '<ul id="friends_list">';
                    for (var index in data.users) {
                        html += '<li id="friend_' + data.users[index]._id + '">' + data.users[index].username + '</li>';
                    }
                    html += '</ul>';
                    $('#friends').html(html);
                    $("#friends_list").menu().on("menuselect", function (selectEvent, ui) {
                        var item_id = $(ui.item).prop('id');
                        var user_id = /friend_([0-9a-fA-F]+)/.exec(item_id)[1];
                        console.log(user_id);
                    });
                }
            });
        });
        submitEvent.preventDefault();
    });
    $('#friends_button').button().click(function () {
        $('#friends_form').submit();
    });
});
//# sourceMappingURL=state.overview.js.map