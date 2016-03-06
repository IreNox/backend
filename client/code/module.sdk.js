/// <reference path="../thirdparty/history/history.d.ts"/>
/// <reference path="../thirdparty/urijs/urijs.d.ts"/>
var sdk;
(function (sdk) {
    var serverUrl = 'https://localhost/';
    var states = {};
    function init() {
        Historyjs.Adapter.bind(window, 'statechange', function () {
            sdk.activateState();
        });
    }
    sdk.init = init;
    function changeState(stateName, stateData) {
        if (stateData === void 0) { stateData = null; }
        var url = encodeUrl({ state_name: stateName }, stateData);
        var currentUrl = '?' + new URI(Historyjs.getState().url).query();
        if (url == currentUrl) {
            sdk.activateState();
        }
        else {
            Historyjs.pushState(null, document.title, url);
        }
    }
    sdk.changeState = changeState;
    function serverGet(url, callback) {
        $.ajax({
            url: serverUrl + url,
            dataType: 'json',
            success: callback
        });
    }
    sdk.serverGet = serverGet;
    function serverPost(url, data, callback) {
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
    sdk.serverPost = serverPost;
    function serverGetAndParse(url, acceptedResults, okCallback, failedCallback) {
        serverGet(url, function (data) {
            parseResult(data, acceptedResults, function (ok) {
                if (ok) {
                    okCallback(data);
                }
                else if (failedCallback) {
                    failedCallback(data);
                }
            });
        });
    }
    sdk.serverGetAndParse = serverGetAndParse;
    function serverPostAndParse(url, data, acceptedResults, okCallback, failedCallback) {
        serverPost(url, data, function (data) {
            parseResult(data, acceptedResults, function (ok) {
                if (ok) {
                    okCallback(data);
                }
                else if (failedCallback) {
                    failedCallback(data);
                }
            });
        });
    }
    sdk.serverPostAndParse = serverPostAndParse;
    function parseResult(data, acceptedResults, callback) {
        acceptedResults.push('Ok');
        if ($.inArray(data.result, acceptedResults) < 0) {
            if (data.result == "NotLoggedin") {
                sdk.changeState("login");
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
    sdk.parseResult = parseResult;
    function encodeUrl(firstQuery, secondQuery) {
        var url = new URI("").addQuery(firstQuery).addQuery(secondQuery);
        return url.href();
    }
    sdk.encodeUrl = encodeUrl;
    function decodeUrl(url) {
        var query = new URI(url);
        return query.search(true);
    }
    sdk.decodeUrl = decodeUrl;
    function registerState(stateName, stateObject) {
        states[stateName] = stateObject;
    }
    sdk.registerState = registerState;
    function activateState() {
        var state = Historyjs.getState();
        var stateData = decodeUrl(state.url);
        var stateName = stateData.state_name;
        delete stateData.state_name;
        if (!stateName) {
            return false;
        }
        if (Global.stateObject) {
            Global.stateObject.onDeactivate();
        }
        ui.setLoading();
        var startState = function () {
            if (stateName in states) {
                var stateObject = states[stateName];
                Global.stateName = stateName;
                Global.stateData = stateData;
                Global.stateObject = stateObject;
                stateObject.onActivate(stateData);
            }
        };
        if (!(stateName in states)) {
            $.ajax({
                url: 'code/states/state.' + stateName + '.js',
                dataType: 'script',
                success: function (data) {
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
    sdk.activateState = activateState;
})(sdk || (sdk = {}));
//# sourceMappingURL=module.sdk.js.map