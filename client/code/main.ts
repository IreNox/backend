var Historyjs: Historyjs = <any>History;

module global {
    export var userId: string = "";
}

$(document).ready(function () {
    sdk.init();
    sdk.setLoading();
    user.login();
});