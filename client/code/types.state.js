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