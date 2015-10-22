var global;
(function (global) {
    global.userId = "";
    global.stateContext = null;
})(global || (global = {}));
$(document).ready(function () {
    sdk.setLoading();
    user.login();
});
//# sourceMappingURL=main.js.map