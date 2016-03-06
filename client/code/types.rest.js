var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestRequest = (function () {
    function RestRequest() {
    }
    return RestRequest;
})();
var RestLoginRequest = (function (_super) {
    __extends(RestLoginRequest, _super);
    function RestLoginRequest(_username, _password) {
        _super.call(this);
        this.username = _username;
        this.password = _password;
    }
    return RestLoginRequest;
})(RestRequest);
var RestGetUserRequest = (function (_super) {
    __extends(RestGetUserRequest, _super);
    function RestGetUserRequest(_user_id) {
        _super.call(this);
        this.user_id = _user_id;
    }
    return RestGetUserRequest;
})(RestRequest);
var RestGetUsersRequest = (function (_super) {
    __extends(RestGetUsersRequest, _super);
    function RestGetUsersRequest(_user_ids) {
        _super.call(this);
        this.user_ids = _user_ids;
    }
    return RestGetUsersRequest;
})(RestRequest);
var RestFriendsActions;
(function (RestFriendsActions) {
    RestFriendsActions[RestFriendsActions["Add"] = 0] = "Add";
    RestFriendsActions[RestFriendsActions["Remove"] = 1] = "Remove";
})(RestFriendsActions || (RestFriendsActions = {}));
var RestFriendsRequest = (function (_super) {
    __extends(RestFriendsRequest, _super);
    function RestFriendsRequest(_action, _user_id) {
        _super.call(this);
        this.action = RestFriendsActions[_action].toLowerCase();
        this.user_id = _user_id;
    }
    return RestFriendsRequest;
})(RestRequest);
var RestResult = (function () {
    function RestResult() {
    }
    return RestResult;
})();
var RestLoginResult = (function (_super) {
    __extends(RestLoginResult, _super);
    function RestLoginResult() {
        _super.apply(this, arguments);
    }
    return RestLoginResult;
})(RestResult);
var RestGetUserResult = (function (_super) {
    __extends(RestGetUserResult, _super);
    function RestGetUserResult() {
        _super.apply(this, arguments);
    }
    return RestGetUserResult;
})(RestResult);
var RestGetUsersResult = (function (_super) {
    __extends(RestGetUsersResult, _super);
    function RestGetUsersResult() {
        _super.apply(this, arguments);
    }
    return RestGetUsersResult;
})(RestResult);
var RestFindUserResult = (function (_super) {
    __extends(RestFindUserResult, _super);
    function RestFindUserResult() {
        _super.apply(this, arguments);
    }
    return RestFindUserResult;
})(RestResult);
var RestFriendsResult = (function (_super) {
    __extends(RestFriendsResult, _super);
    function RestFriendsResult() {
        _super.apply(this, arguments);
    }
    return RestFriendsResult;
})(RestResult);
//# sourceMappingURL=types.rest.js.map