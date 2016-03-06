var Historyjs = History;
var Global;
(function (Global) {
    Global.userId = "";
    Global.stateName = "";
    Global.stateData = null;
    Global.stateObject = null;
})(Global || (Global = {}));
$(document).ready(function () {
    sdk.init();
    sdk.setLoading();
    user.login();
});
//# sourceMappingURL=main.js.map