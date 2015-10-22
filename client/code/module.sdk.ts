/// <reference path="../thirdparty/history/history.d.ts"/>

module sdk {
    export function init() {
        Historyjs.Adapter.bind(window, 'statechange', function () {
            var state: HistoryState = Historyjs.getState();
            var context: StateContext = state.data;

            console.log(state);

            activateState(context)
        });
    }

    export function setLoading() {
        $('#content').html('<img src="img/ajax-loader.gif" />');
    }

    export function changeState(stateName: string, stateData: any = null) {
        var context: StateContext = new StateContext();
        context.stateName = stateName;
        context.stateData = stateData;

        var url: string = "?/" + stateName;

        for (var key in stateData) {
            
        }

        Historyjs.pushState(context, document.title, );
    }
    
    export function serverGet(url: string, callback: RestCallback) {
        $.ajax({
            url: '../' + url,
            dataType: 'json',
            success: callback
        });
    }

    export function serverPost(url: string, data: any, callback: RestCallback) {
        $.ajax({
            type: "POST",
            url: '../' + url,
            data: data,
            dataType: 'json',
            success: callback
        });
    }

    export function parseResult(data: RestResult, acceptedResults: string[], callback) {
        acceptedResults.push('Ok');

        if ($.inArray(data.result, acceptedResults) < 0) {
            if (data.result == "NotLoggedin") {
                sdk.changeState("login")
            }
            else {
                $('#error').html(data.result);
            }
            callback(false);
        }
        else {
            callback(true);
        }
    }

    export function encodeUrl(fileName: string, query: any): string {
        var url: string = "?/" + fileName;

        for (var key in stateData) {

        }

        return url;
    }

    export function activateState(context: StateContext) {
        sdk.setLoading();
        $.getScript('code/states/state.' + context.stateName + '.js');
    }
}
