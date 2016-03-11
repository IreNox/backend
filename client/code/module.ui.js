var MenuState;
(function (MenuState) {
    MenuState[MenuState["Invalid"] = 0] = "Invalid";
    MenuState[MenuState["Offline"] = 1] = "Offline";
    MenuState[MenuState["Online"] = 2] = "Online";
})(MenuState || (MenuState = {}));
var ui;
(function (ui) {
    var preloadedHtml = {};
    var menuState = MenuState.Invalid;
    function init() {
        ui.preloadHtml('loading');
    }
    ui.init = init;
    function preloadHtml(fileName) {
        if (!(fileName in preloadedHtml)) {
            $.ajax({
                url: 'html/' + fileName + '.html',
                async: false,
                success: function (data) {
                    preloadedHtml[fileName] = data;
                }
            });
        }
        return preloadedHtml[fileName];
    }
    ui.preloadHtml = preloadHtml;
    function setLoading(id) {
        if (id === void 0) { id = "content"; }
        $('#' + id).html(ui.preloadHtml('loading'));
    }
    ui.setLoading = setLoading;
    function showStatusMessage(message) {
        if (Global.stateObject) {
            Global.stateObject.onStatusMessage(message);
        }
    }
    ui.showStatusMessage = showStatusMessage;
    function showErrorMessage(message) {
        if (Global.stateObject) {
            Global.stateObject.onErrorMessage(message);
        }
    }
    ui.showErrorMessage = showErrorMessage;
    function formatString(text, data) {
        var template = Handlebars.compile(text);
        return template(data);
    }
    ui.formatString = formatString;
    function formatFile(filename, data) {
        var templateCode = ui.preloadHtml(filename);
        return ui.formatString(templateCode, data);
    }
    ui.formatFile = formatFile;
    function buttonList(parent, idPrefix, clickCallback) {
        parent.find("button[id*='" + idPrefix + "']").button().click(function (clickEvent) {
            var item_id = $(clickEvent.target).prop('id');
            var regex = new RegExp(idPrefix + '_([0-9a-fA-F]+)');
            var id = regex.exec(item_id)[1];
            clickCallback(id);
        });
    }
    ui.buttonList = buttonList;
    function refreshOfflineMenu() {
        $('#menu').html(preloadHtml('menu_offline'));
        $('#menu_login').button().click(function () {
            sdk.changeState(StateType.Login);
        });
    }
    function refreshOnlineMenu() {
        $('#menu').html(preloadHtml('menu_online'));
        $('#menu_overview').button().click(function () {
            sdk.changeState(StateType.Overview);
        });
        $('#menu_itemshop').button().click(function () {
            sdk.changeState(StateType.ItemShop);
        });
        $('#menu_gemsshop').button().click(function () {
            sdk.changeState(StateType.GemsShop);
        });
        $('#menu_messages').button().click(function () {
            sdk.changeState(StateType.Message);
        });
        $('#menu_logout').button().click(function () {
            user.logout();
        });
        var getUnreadCountRequest = new RestMessageRequest(RestMessageActions.GetUnreadCount);
        sdk.serverPostAndParse('message', getUnreadCountRequest, [], function (messageCoundData) {
            $('#menu_messages').button('option', 'label', ui.formatFile('menu_online_message_button', messageCoundData));
        });
        $('#menu_shop').button('option', 'label', ui.formatFile('menu_online_shop_button', Global.user));
    }
    function refreshMenu(force) {
        if (force === void 0) { force = false; }
        if (Global.user == null && (menuState != MenuState.Offline || force)) {
            refreshOfflineMenu();
            menuState = MenuState.Offline;
        }
        else if (Global.user != null && (menuState != MenuState.Online || force)) {
            refreshOnlineMenu();
            menuState = MenuState.Online;
        }
    }
    ui.refreshMenu = refreshMenu;
})(ui || (ui = {}));
//# sourceMappingURL=module.ui.js.map