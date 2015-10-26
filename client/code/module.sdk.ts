/// <reference path="../thirdparty/history/history.d.ts"/>
/// <reference path="../thirdparty/urijs/urijs.d.ts"/>

module sdk {
    var preloadedHtml: { [s: string]: string; } = {};
    
    export function init() {
        preloadHtml('loading');

        Historyjs.Adapter.bind(window, 'statechange', function () {
            sdk.activateState();
        });
    }

    export function setLoading() {
        $('#content').html(preloadHtml('loading'));
    }

    export function changeState(stateName: string, stateData: any = null) {
        var url: string = encodeUrl({ state_name: stateName }, stateData);
        Historyjs.pushState(null, document.title, url);
    }

    export function getStateData(): any {
        var state: HistoryState = Historyjs.getState();
        var context: StateContext = state.data;

        return context.stateData;
    }
    
    export function serverGet(url: string, callback: RestCallback) {
        $.ajax({
            url: '../' + url,
            async: true,
            dataType: 'json',
            success: callback
        });
    }

    export function serverPost(url: string, data: any, callback: RestCallback) {
        $.ajax({
            type: "POST",
            url: '../' + url,
            async: true,
            data: data,
            dataType: 'json',
            success: callback
        });
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

    export function parseResult(data: RestResult, acceptedResults: string[], callback: ResultCallback) {
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

    export function encodeUrl(firstQuery: any, secondQuery: any): string {
        var url: uri.URI = new URI("").addQuery(firstQuery).addQuery(secondQuery);
        return url.href();
    }

    export function decodeUrl(url: string): any {
        var query: uri.URI = new URI(url);
        return query.search(true);
    }

    export function formatString(text: string, data: any): string {
        var result: string = text;
        for (var key in data) {
            result = result.replace('{' + key + '}', data[key]);
        }

        return result;
    }

    export function activateState(): boolean {
        var state: HistoryState = Historyjs.getState();

        var stateData: any = decodeUrl(state.url);
        var stateName: string = stateData.state_name;
        delete stateData.state_name;

        if (!stateName) {
            return false;
        }

        var context: StateContext = new StateContext();
        context.stateName = stateName;
        context.stateData = stateData;

        global.stateName = stateName;
        global.stateData = stateData;

        sdk.setLoading();
        $.getScript('code/states/state.' + context.stateName + '.js');

        return true;
    }
}
