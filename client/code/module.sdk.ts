
module sdk {
    export function setLoading() {
        $('#content').html('<img src="img/ajax-loader.gif" />');
    }

    export function changeState(stateName: string, data: any = null) {
        sdk.setLoading();
        global.stateContext = data;
        $.getScript('code/states/state.' + stateName + '.js');
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
                callback(false);
            }
        }
        else {
            callback(true);
        }
    }
}
