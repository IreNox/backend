var StateType;
(function (StateType) {
    StateType[StateType["Invalid"] = 0] = "Invalid";
    StateType[StateType["Login"] = 1] = "Login";
    StateType[StateType["Overview"] = 2] = "Overview";
    StateType[StateType["EditorEntity"] = 3] = "EditorEntity";
    StateType[StateType["Message"] = 4] = "Message";
    StateType[StateType["ItemShop"] = 5] = "ItemShop";
    StateType[StateType["GemsShop"] = 6] = "GemsShop";
    StateType[StateType["UserInfo"] = 7] = "UserInfo";
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