/// <reference path="../../thirdparty/jqueryui/jqueryui.d.ts"/>
$('#content').load('html/overview.html', function () {
    sdk.serverGet('getuser', function (data) {
        sdk.parseResult(data, [], function (ok) {
            if (ok) {
                $('#username').html(data.user.username);
                var html = sdk.formatString(sdk.preloadHtml('general_list_begin'), { id: 'friends_menu' });
                for (var index in data.user.friends) {
                    html += sdk.formatString(sdk.preloadHtml('general_list_entry'), data.user.friends[index]);
                }
                html += sdk.preloadHtml('general_list_end');
                $('#friends_list').html(html);
            }
        });
    });
    $('#logout').button().click(function () {
        user.logout();
    });
    $('#friends_search_form').submit(function (submitEvent) {
        var obj = {};
        obj.username = $('#friends_search_name').val();
        sdk.serverPost('finduser', obj, function (data) {
            sdk.parseResult(data, [], function (ok) {
                if (ok) {
                    var html = sdk.preloadHtml('overview_friends_list_begin');
                    for (var index in data.users) {
                        html += sdk.formatString(sdk.preloadHtml('overview_friends_list_entry'), data.users[index]);
                    }
                    html += sdk.preloadHtml('overview_friends_list_end');
                    $('#friends_search_list').html(html);
                    $("#friends_search_list > div").children('button').click(function (clickEvent) {
                        var item_id = $(clickEvent.target).parent().prop('id');
                        var user_id = /friend_([0-9a-fA-F]+)/.exec(item_id)[1];
                        user.addFriend(user_id, function (ok) {
                            $('#status').html(sdk.preloadHtml('overview_friends_added')).show(0).fadeOut(2000);
                        });
                    });
                    $("#friends_search_list > div").children('a').click(function (clickEvent) {
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
//# sourceMappingURL=state.overview.js.map