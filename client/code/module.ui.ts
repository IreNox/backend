
interface IdCallback {
	(id: string): void;
}

enum MenuState {
	Invalid,
	Offline,
	Online
}

module ui {
    var preloadedHtml: { [s: string]: string; } = {};
	var menuState: MenuState = MenuState.Invalid;

    export function init() {
        ui.preloadHtml('loading');
    }

	export function preloadHtml(fileName: string): string {
        if (!(fileName in preloadedHtml)) {
            $.ajax({
                url: 'html/' + fileName + '.html',
                async: false,
                success: function (data: string) {
                    preloadedHtml[fileName] = data;
                }
            });
        }

        return preloadedHtml[fileName];
    }

	export function setLoading(id: string = "content") {
        $('#' + id).html(ui.preloadHtml('loading'));
    }

	export function showStatusMessage(message: string) {
		if (Global.stateObject) {
			Global.stateObject.onStatusMessage(message);
		}
	}

	export function showErrorMessage(message: string) {
		if (Global.stateObject) {
			Global.stateObject.onErrorMessage(message);
		}
	}

	export function formatString(text: string, data: any): string {
		var template = Handlebars.compile(text);
		return template(data);
    }

	export function formatFile(filename: string, data: any): string {
		var templateCode: string = ui.preloadHtml(filename);
		return ui.formatString(templateCode, data);
	}

	export function buttonList(parent: JQuery, idPrefix: string, clickCallback: IdCallback): void {
		parent.find("button[id*='" + idPrefix + "']").button().click(function (clickEvent: JQueryEventObject) {
			var item_id: string = $(clickEvent.target).prop('id');
			var regex = new RegExp(idPrefix + '_([0-9a-fA-F]+)');
			var id = regex.exec(item_id)[1];

			clickCallback(id);
		});
	}

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

		$('#menu_editor_entity').button().click(function () {
			sdk.changeState(StateType.EditorEntity);
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

		var getUnreadCountRequest: RestMessageRequest = new RestMessageRequest(RestMessageActions.GetUnreadCount);
		sdk.serverPostAndParse('message', getUnreadCountRequest, [], function (messageCoundData: RestMessageGetUnreadCountResult) {
			$('#menu_messages').button('option', 'label', ui.formatFile('menu_online_message_button', messageCoundData));
		});

		$('#menu_gemsshop').button('option', 'label', ui.formatFile('menu_online_shop_button', Global.user));
	}

	export function refreshMenu(force: boolean = false) {
		if (Global.user == null && (menuState != MenuState.Offline || force)) {
			refreshOfflineMenu();
			menuState = MenuState.Offline;
		}
		else if (Global.user != null && (menuState != MenuState.Online || force)) {
			refreshOnlineMenu();
			menuState = MenuState.Online;
		}
	}
}