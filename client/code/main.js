var Historyjs = History;
var global;
(function (global) {
    global.userId = "";
    global.stateName = "";
    global.stateData = null;
})(global || (global = {}));
$(document).ready(function () {
    sdk.init();
    sdk.setLoading();
    user.login();
});
//# sourceMappingURL=main.js.map