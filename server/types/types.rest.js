var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (RestResultType) {
    RestResultType[RestResultType["Ok"] = 0] = "Ok";
    RestResultType[RestResultType["InvalidCall"] = 1] = "InvalidCall";
    RestResultType[RestResultType["DatabaseError"] = 2] = "DatabaseError";
    RestResultType[RestResultType["NotLoggedin"] = 3] = "NotLoggedin";
    RestResultType[RestResultType["AlreadyLoggedin"] = 4] = "AlreadyLoggedin";
    RestResultType[RestResultType["NotFound"] = 5] = "NotFound";
    RestResultType[RestResultType["InvalidToken"] = 6] = "InvalidToken";
    RestResultType[RestResultType["InvalidPassword"] = 7] = "InvalidPassword";
    RestResultType[RestResultType["AlreadyInList"] = 8] = "AlreadyInList";
    RestResultType[RestResultType["Unknown"] = 9] = "Unknown";
})(exports.RestResultType || (exports.RestResultType = {}));
var RestResultType = exports.RestResultType;
var RestUserId = (function () {
    function RestUserId(_id) {
        this.id = _id;
    }
    RestUserId.prototype.toString = function () {
        return this.id;
    };
    RestUserId.fromDatabase = function (value) {
        return new RestUserId(value._id.toHexString());
    };
    return RestUserId;
})();
exports.RestUserId = RestUserId;
exports.InvalidUserId = new RestUserId("");
var RestUser = (function () {
    function RestUser() {
    }
    return RestUser;
})();
exports.RestUser = RestUser;
var RestResult = (function () {
    function RestResult(_result) {
        this.result = RestResultType[_result];
    }
    return RestResult;
})();
exports.RestResult = RestResult;
var RestLoginResult = (function (_super) {
    __extends(RestLoginResult, _super);
    function RestLoginResult(_result, _user_id) {
        _super.call(this, _result);
        this.user_id = _user_id.toString();
    }
    return RestLoginResult;
})(RestResult);
exports.RestLoginResult = RestLoginResult;
var RestGetUserResult = (function (_super) {
    __extends(RestGetUserResult, _super);
    function RestGetUserResult(_result, _user) {
        _super.call(this, _result);
        this.user = _user;
    }
    return RestGetUserResult;
})(RestResult);
exports.RestGetUserResult = RestGetUserResult;
var RestGetUsersResult = (function (_super) {
    __extends(RestGetUsersResult, _super);
    function RestGetUsersResult(_result, _users) {
        _super.call(this, _result);
        this.users = _users;
    }
    return RestGetUsersResult;
})(RestResult);
exports.RestGetUsersResult = RestGetUsersResult;
var RestFindUserResult = (function (_super) {
    __extends(RestFindUserResult, _super);
    function RestFindUserResult(_result, _users) {
        _super.call(this, _result);
        this.users = _users;
    }
    return RestFindUserResult;
})(RestResult);
exports.RestFindUserResult = RestFindUserResult;
var RestFriendsResult = (function (_super) {
    __extends(RestFriendsResult, _super);
    function RestFriendsResult(_result, _user_id) {
        _super.call(this, _result);
        if (_user_id) {
            this.user_id = _user_id.toString();
        }
    }
    return RestFriendsResult;
})(RestResult);
exports.RestFriendsResult = RestFriendsResult;
//# sourceMappingURL=types.rest.js.map