var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rest;
(function (Rest) {
    var RestUserId = (function () {
        function RestUserId(_id) {
            this.id = _id;
        }
        return RestUserId;
    })();
    Rest.RestUserId = RestUserId;
    Rest.InvalidUserId = new RestUserId("");
    var RestUser = (function () {
        function RestUser() {
        }
        return RestUser;
    })();
    Rest.RestUser = RestUser;
    ///////////
    // Requests
    var RestRequest = (function () {
        function RestRequest() {
        }
        return RestRequest;
    })();
    Rest.RestRequest = RestRequest;
    var RestLoginRequest = (function (_super) {
        __extends(RestLoginRequest, _super);
        function RestLoginRequest(_username, _password) {
            _super.call(this);
            this.username = _username;
            this.password = _password;
        }
        return RestLoginRequest;
    })(RestRequest);
    Rest.RestLoginRequest = RestLoginRequest;
    var RestGetUserRequest = (function (_super) {
        __extends(RestGetUserRequest, _super);
        function RestGetUserRequest(_user_id) {
            _super.call(this);
            this.user_id = _user_id;
        }
        return RestGetUserRequest;
    })(RestRequest);
    Rest.RestGetUserRequest = RestGetUserRequest;
    var RestGetUsersRequest = (function (_super) {
        __extends(RestGetUsersRequest, _super);
        function RestGetUsersRequest(_user_ids) {
            _super.call(this);
            this.user_ids = _user_ids;
        }
        return RestGetUsersRequest;
    })(RestRequest);
    Rest.RestGetUsersRequest = RestGetUsersRequest;
    (function (RestFriendsActions) {
        RestFriendsActions[RestFriendsActions["Add"] = 0] = "Add";
        RestFriendsActions[RestFriendsActions["Remove"] = 1] = "Remove";
    })(Rest.RestFriendsActions || (Rest.RestFriendsActions = {}));
    var RestFriendsActions = Rest.RestFriendsActions;
    var RestFriendsRequest = (function (_super) {
        __extends(RestFriendsRequest, _super);
        function RestFriendsRequest(_action, _user_id) {
            _super.call(this);
            this.action = RestFriendsActions[_action].toLowerCase();
            this.user_id = _user_id;
        }
        return RestFriendsRequest;
    })(RestRequest);
    Rest.RestFriendsRequest = RestFriendsRequest;
    //////////
    // Results
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
        RestResultType[RestResultType["NotInList"] = 9] = "NotInList";
        RestResultType[RestResultType["AlreadyInUse"] = 10] = "AlreadyInUse";
        RestResultType[RestResultType["Unknown"] = 11] = "Unknown";
    })(Rest.RestResultType || (Rest.RestResultType = {}));
    var RestResultType = Rest.RestResultType;
    var RestResult = (function () {
        function RestResult(_result) {
            this.result = RestResultType[_result];
        }
        return RestResult;
    })();
    Rest.RestResult = RestResult;
    var RestLoginResult = (function (_super) {
        __extends(RestLoginResult, _super);
        function RestLoginResult(_result, _user_id) {
            if (_user_id === void 0) { _user_id = Rest.InvalidUserId; }
            _super.call(this, _result);
            this.user_id = _user_id.id;
        }
        return RestLoginResult;
    })(RestResult);
    Rest.RestLoginResult = RestLoginResult;
    var RestGetUserResult = (function (_super) {
        __extends(RestGetUserResult, _super);
        function RestGetUserResult(_result, _user) {
            _super.call(this, _result);
            this.user = _user;
        }
        return RestGetUserResult;
    })(RestResult);
    Rest.RestGetUserResult = RestGetUserResult;
    var RestGetUsersResult = (function (_super) {
        __extends(RestGetUsersResult, _super);
        function RestGetUsersResult(_result, _users) {
            _super.call(this, _result);
            this.users = _users;
        }
        return RestGetUsersResult;
    })(RestResult);
    Rest.RestGetUsersResult = RestGetUsersResult;
    var RestFindUserResult = (function (_super) {
        __extends(RestFindUserResult, _super);
        function RestFindUserResult(_result, _users) {
            _super.call(this, _result);
            this.users = _users;
        }
        return RestFindUserResult;
    })(RestResult);
    Rest.RestFindUserResult = RestFindUserResult;
    var RestFriendsResult = (function (_super) {
        __extends(RestFriendsResult, _super);
        function RestFriendsResult(_result, _user_id) {
            _super.call(this, _result);
            if (_user_id) {
                this.user_id = _user_id.id;
            }
        }
        return RestFriendsResult;
    })(RestResult);
    Rest.RestFriendsResult = RestFriendsResult;
})(Rest || (Rest = {}));
module.exports = Rest;
//# sourceMappingURL=types.rest.js.map