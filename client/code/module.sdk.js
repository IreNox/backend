var sdk;
(function (sdk) {
    function setLoading() {
        $('#content').html('<img src="img/ajax-loader.gif" />');
    }
    sdk.setLoading = setLoading;
    function changeState(stateName, data) {
        if (data === void 0) { data = null; }
        sdk.setLoading();
        global.stateContext = data;
        $.getScript('code/states/state.' + stateName + '.js');
    }
    sdk.changeState = changeState;
    function serverGet(url, callback) {
        $.ajax({
            url: '../' + url,
            dataType: 'json',
            success: callback
        });
    }
    sdk.serverGet = serverGet;
    function serverPost(url, data, callback) {
        $.ajax({
            type: "POST",
            url: '../' + url,
            data: data,
            dataType: 'json',
            success: callback
        });
    }
    sdk.serverPost = serverPost;
    function parseResult(data, acceptedResults, callback) {
        acceptedResults.push('Ok');
        if ($.inArray(data.result, acceptedResults) < 0) {
            if (data.result == "NotLoggedin") {
                sdk.changeState("login");
            }
            else {
                $('#error').html(data.result);
                callback(false);
            }
        }
        else {
            callback(true);
        }
    }
    sdk.parseResult = parseResult;
})(sdk || (sdk = {}));
//# sourceMappingURL=module.sdk.js.map