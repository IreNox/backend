/// <reference path="../../thirdparty/jqueryui/jqueryui.d.ts"/>
$('#content').load('html/overview.html', function () {
    sdk.serverGet('getuser', function (data) {
        sdk.parseResult(data, [], function (ok) {
            if (ok) {
                $('#username').html(data.user.username);
                var html = sdk.formatString(sdk.preloadHtml('html/general_list_begin.html'), { id: 'friends_menu' });
                for (var index in data.user.friends) {
                    html += sdk.formatString(sdk.preloadHtml('html/general_list_entry.html'), data.user.friends[index]);
                }
                html += sdk.preloadHtml('html/general_list_end.html');
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
                    var html = sdk.formatString(sdk.preloadHtml('html/general_list_begin.html'), { id: 'friends_search_menu' });
                    for (var index in data.users) {
                        html += sdk.formatString(sdk.preloadHtml('html/overview_friends_list_entry.html'), data.users[index]);
                    }
                    html += sdk.preloadHtml('html/general_list_end.html');
                    $('#friends_search_list').html(html);
                    $("#friends_search_menu").menu().on("menuselect", function (selectEvent, ui) {
                        var item_id = $(ui.item).prop('id');
                        var user_id = /friend_([0-9a-fA-F]+)/.exec(item_id)[1];
                        sdk.changeState("userinfo", { user_id: user_id });
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