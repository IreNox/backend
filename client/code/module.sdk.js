/// <reference path="../thirdparty/history/history.d.ts"/>
/// <reference path="../thirdparty/urijs/urijs.d.ts"/>
var sdk;
(function (sdk) {
    var preloadedHtml = {};
    function init() {
        preloadHtml('html/loading.html');
        Historyjs.Adapter.bind(window, 'statechange', function () {
            sdk.activateState();
        });
    }
    sdk.init = init;
    function setLoading() {
        $('#content').html(preloadHtml('html/loading.html'));
    }
    sdk.setLoading = setLoading;
    function changeState(stateName, stateData) {
        if (stateData === void 0) { stateData = null; }
        var url = encodeUrl({ state_name: stateName }, stateData);
        Historyjs.pushState(null, document.title, url);
    }
    sdk.changeState = changeState;
    function getStateData() {
        var state = Historyjs.getState();
        var context = state.data;
        return context.stateData;
    }
    sdk.getStateData = getStateData;
    function serverGet(url, callback) {
        $.ajax({
            url: '../' + url,
            async: true,
            dataType: 'json',
            success: callback
        });
    }
    sdk.serverGet = serverGet;
    function serverPost(url, data, callback) {
        $.ajax({
            type: "POST",
            url: '../' + url,
            async: true,
            data: data,
            dataType: 'json',
            success: callback
        });
    }
    sdk.serverPost = serverPost;
    function preloadHtml(fileName) {
        if (!(fileName in preloadedHtml)) {
            $.ajax({
                url: fileName,
                async: false,
                success: function (data) {
                    preloadedHtml[fileName] = data;
                }
            });
        }
        return preloadedHtml[fileName];
    }
    sdk.preloadHtml = preloadHtml;
    function parseResult(data, acceptedResults, callback) {
        acceptedResults.push('Ok');
        if ($.inArray(data.result, acceptedResults) < 0) {
            if (data.result == "NotLoggedin") {
                sdk.changeState("login");
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
    function formatString(text, data) {
        var result = text;
        for (var key in data) {
            result = result.replace('{' + key + '}', data[key]);
        }
        return result;
    }
    sdk.formatString = formatString;
    function activateState() {
        var state = Historyjs.getState();
        var stateData = decodeUrl(state.url);
        var stateName = stateData.state_name;
        delete stateData.state_name;
        if (!stateName) {
            return false;
        }
        var context = new StateContext();
        context.stateName = stateName;
        context.stateData = stateData;
        global.stateName = stateName;
        global.stateData = stateData;
        sdk.setLoading();
        $.getScript('code/states/state.' + context.stateName + '.js');
        return true;
    }
    sdk.activateState = activateState;
})(sdk || (sdk = {}));
//# sourceMappingURL=module.sdk.js.map