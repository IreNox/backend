
interface IdCallback {
	(id: string): void;
}

module ui {
    var preloadedHtml: { [s: string]: string; } = {};

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
}