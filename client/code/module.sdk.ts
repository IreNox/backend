/// <reference path="../thirdparty/history/history.d.ts"/>
/// <reference path="../thirdparty/urijs/urijs.d.ts"/>

interface RestCallback {
	(data: RestResult): void;
}

module sdk {
    var serverUrl: string = ""; //'https://localhost/';
	var states: { [s: number]: State } = {};
    
    export function init() {
        Historyjs.Adapter.bind(window, 'statechange', function () {
            sdk.activateState();
        });
    }
	
    export function changeState(stateType: StateType, stateData: any = null) {
		var stateName: string = StateType[stateType];
        var url: string = encodeUrl({ state_type: stateName }, stateData);
		var currentUrl: string = '?' + new URI(Historyjs.getState().url).query();

		if (url == currentUrl) {
			sdk.activateState();
		}
		else {
			Historyjs.pushState(null, document.title, url);
		}
    }

    export function serverGet(url: string, callback: RestCallback) {
        $.ajax({
            url: serverUrl + url,
            dataType: 'json',
            success: callback
        });
    }

    export function serverPost(url: string, data: any, callback: RestCallback) {
		if (data && data.constructor) {
			data.constructor = undefined;
		}

		$.ajax({
            method: "POST",
            url: serverUrl + url,
            contentType: 'application/json',
			data: JSON.stringify(data),
            success: callback
        });
    }

	export function serverGetAndParse(url: string, acceptedResults: string[], okCallback: RestCallback, failedCallback?: RestCallback) {
		serverGet(url, function (data: RestResult) {
			parseResult(data, acceptedResults, function (ok: boolean) {
				if (ok) {
					okCallback(data);
				}
				else if (failedCallback) {
					failedCallback(data);
				}
			});
		});
	}

	export function serverPostAndParse(url: string, data: any, acceptedResults: string[], okCallback: RestCallback, failedCallback?: RestCallback) {
		serverPost(url, data, function (data: RestResult) {
			parseResult(data, acceptedResults, function (ok: boolean) {
				if (ok) {
					okCallback(data);
				}
				else if (failedCallback) {
					failedCallback(data);
				}
			});
		});
	}

    export function parseResult(data: RestResult, acceptedResults: string[], callback: ResultCallback) {
        acceptedResults.push('Ok');

        if ($.inArray(data.result, acceptedResults) < 0) {
            if (data.result == "NotLoggedin") {
                sdk.changeState(StateType.Login);
            }
            else {
				ui.showErrorMessage(data.result);
            }
            callback(false);
        }
        else {
            callback(true);
        }
    }
    export function encodeUrl(firstQuery: any, secondQuery: any): string {
        var url: uri.URI = new URI("").addQuery(firstQuery).addQuery(secondQuery);
        return url.href();
    }

    export function decodeUrl(url: string): any {
        var query: uri.URI = new URI(url);
        return query.search(true);
    }

	export function registerState(stateType: StateType, stateObject: State): void {
		states[stateType] = stateObject;
	}

    export function activateState(): boolean {
        var state: HistoryState = Historyjs.getState();

        var stateData: any = decodeUrl(state.url);
        var stateName: string = stateData.state_type;
		var stateType: StateType = StateType[stateName];
        delete stateData.state_type;

        if (!stateName) {
            return false;
        }

		if (Global.stateObject) {
			Global.stateObject.onDeactivate();
		}

		ui.setLoading();

		var startState = function () {
			if (stateType in states) {
				var stateObject: State = states[stateType];

				Global.stateType = stateType;
				Global.stateData = stateData;
				Global.stateObject = stateObject;

				stateObject.onActivate(stateData);
			}
		}

		if (!(stateType in states)) {
			$.ajax({
				url: 'code/states/state.' + stateName.toLowerCase() + '.js',
				dataType: 'script',
				success: function (data: string) {
					eval(data);
					startState();
				}
			});
		}
		else {
			startState();
		}

        return true;
    }
}
