var StateType;
(function (StateType) {
    StateType[StateType["Invalid"] = 0] = "Invalid";
    StateType[StateType["Login"] = 1] = "Login";
    StateType[StateType["Overview"] = 2] = "Overview";
    StateType[StateType["Message"] = 3] = "Message";
    StateType[StateType["ItemShop"] = 4] = "ItemShop";
    StateType[StateType["GemsShop"] = 5] = "GemsShop";
    StateType[StateType["UserInfo"] = 6] = "UserInfo";
})(StateType || (StateType = {}));
var State = (function () {
    function State() {
    }
    State.prototype.onActivate = function (stateData) {
    };
    State.prototype.onDeactivate = function () {
    };
    State.prototype.onRefreshUser = function (user) {
    };
    State.prototype.onStatusMessage = function (message) {
        $('#status').html(message).show(0).fadeOut(2000);
    };
    State.prototype.onErrorMessage = function (message) {
        $('#error').html(message).show(0).fadeOut(2000);
    };
    return State;
}());
//# sourceMappingURL=types.state.js.map