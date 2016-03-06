var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestUserId = (function () {
    function RestUserId(_id) {
        this.id = _id;
    }
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
var RestMessageHeader = (function () {
    function RestMessageHeader() {
    }
    return RestMessageHeader;
})();
exports.RestMessageHeader = RestMessageHeader;
var RestMessage = (function (_super) {
    __extends(RestMessage, _super);
    function RestMessage() {
        _super.apply(this, arguments);
    }
    return RestMessage;
})(RestMessageHeader);
exports.RestMessage = RestMessage;
///////////
// Requests
var RestRequest = (function () {
    function RestRequest() {
    }
    return RestRequest;
})();
exports.RestRequest = RestRequest;
var RestLoginRequest = (function (_super) {
    __extends(RestLoginRequest, _super);
    function RestLoginRequest(_username, _password) {
        _super.call(this);
        this.username = _username;
        this.password = _password;
    }
    return RestLoginRequest;
})(RestRequest);
exports.RestLoginRequest = RestLoginRequest;
var RestGetUserRequest = (function (_super) {
    __extends(RestGetUserRequest, _super);
    function RestGetUserRequest(_user_id) {
        _super.call(this);
        this.user_id = _user_id;
    }
    return RestGetUserRequest;
})(RestRequest);
exports.RestGetUserRequest = RestGetUserRequest;
var RestGetUsersRequest = (function (_super) {
    __extends(RestGetUsersRequest, _super);
    function RestGetUsersRequest(_user_ids) {
        _super.call(this);
        this.user_ids = _user_ids;
    }
    return RestGetUsersRequest;
})(RestRequest);
exports.RestGetUsersRequest = RestGetUsersRequest;
(function (RestFriendsActions) {
    RestFriendsActions[RestFriendsActions["Add"] = 0] = "Add";
    RestFriendsActions[RestFriendsActions["Remove"] = 1] = "Remove";
})(exports.RestFriendsActions || (exports.RestFriendsActions = {}));
var RestFriendsActions = exports.RestFriendsActions;
var RestFriendsRequest = (function (_super) {
    __extends(RestFriendsRequest, _super);
    function RestFriendsRequest(_action, _user_id) {
        _super.call(this);
        this.action = RestFriendsActions[_action].toLowerCase();
        this.user_id = _user_id;
    }
    return RestFriendsRequest;
})(RestRequest);
exports.RestFriendsRequest = RestFriendsRequest;
(function (RestMessageActions) {
    RestMessageActions[RestMessageActions["GetUnreadCount"] = 0] = "GetUnreadCount";
    RestMessageActions[RestMessageActions["GetList"] = 1] = "GetList";
    RestMessageActions[RestMessageActions["Get"] = 2] = "Get";
    RestMessageActions[RestMessageActions["Send"] = 3] = "Send";
})(exports.RestMessageActions || (exports.RestMessageActions = {}));
var RestMessageActions = exports.RestMessageActions;
var RestMessageRequest = (function (_super) {
    __extends(RestMessageRequest, _super);
    function RestMessageRequest(_action, _id, _subject, _message) {
        _super.call(this);
        this.action = RestMessageActions[_action].toLowerCase();
        this.id = _id;
        this.subject = _subject;
        this.message = _message;
    }
    return RestMessageRequest;
})(RestRequest);
exports.RestMessageRequest = RestMessageRequest;
(function (RestHighscoreActions) {
    RestHighscoreActions[RestHighscoreActions["GetList"] = 0] = "GetList";
    RestHighscoreActions[RestHighscoreActions["Get"] = 1] = "Get";
    RestHighscoreActions[RestHighscoreActions["Send"] = 2] = "Send";
})(exports.RestHighscoreActions || (exports.RestHighscoreActions = {}));
var RestHighscoreActions = exports.RestHighscoreActions;
var RestHighscoreRequest = (function (_super) {
    __extends(RestHighscoreRequest, _super);
    function RestHighscoreRequest(_action, _id) {
        _super.call(this);
        this.action = RestHighscoreActions[_action];
        this.id = _id;
    }
    return RestHighscoreRequest;
})(RestRequest);
exports.RestHighscoreRequest = RestHighscoreRequest;
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
})(exports.RestResultType || (exports.RestResultType = {}));
var RestResultType = exports.RestResultType;
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
        if (_user_id === void 0) { _user_id = exports.InvalidUserId; }
        _super.call(this, _result);
        this.user_id = _user_id.id;
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
            this.user_id = _user_id.id;
        }
    }
    return RestFriendsResult;
})(RestResult);
exports.RestFriendsResult = RestFriendsResult;
var RestMessageGetUnreadCountResult = (function (_super) {
    __extends(RestMessageGetUnreadCountResult, _super);
    function RestMessageGetUnreadCountResult(_count) {
        _super.call(this, RestResultType.Ok);
        this.count = _count;
    }
    return RestMessageGetUnreadCountResult;
})(RestResult);
exports.RestMessageGetUnreadCountResult = RestMessageGetUnreadCountResult;
var RestMessageGetListResult = (function (_super) {
    __extends(RestMessageGetListResult, _super);
    function RestMessageGetListResult(_messages) {
        _super.call(this, RestResultType.Ok);
        this.messages = _messages;
    }
    return RestMessageGetListResult;
})(RestResult);
exports.RestMessageGetListResult = RestMessageGetListResult;
var RestMessageGetResult = (function (_super) {
    __extends(RestMessageGetResult, _super);
    function RestMessageGetResult(_message) {
        _super.call(this, RestResultType.Ok);
        this.message = _message;
    }
    return RestMessageGetResult;
})(RestResult);
exports.RestMessageGetResult = RestMessageGetResult;
//# sourceMappingURL=types.rest.js.map