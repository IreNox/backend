var Historyjs = History;
var Global;
(function (Global) {
    Global.userId = null;
    Global.user = null;
    Global.stateType = StateType.Invalid;
    Global.stateData = null;
    Global.stateObject = null;
})(Global || (Global = {}));
$(document).ready(function () {
    ui.init();
    sdk.init();
    ui.setLoading();
    user.login();
});
//# sourceMappingURL=main.js.map