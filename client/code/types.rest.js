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
var InvalidUserId = new RestUserId("");
var RestUser = (function () {
    function RestUser() {
    }
    return RestUser;
})();
var RestMessageHeader = (function () {
    function RestMessageHeader() {
    }
    return RestMessageHeader;
})();
var RestMessage = (function (_super) {
    __extends(RestMessage, _super);
    function RestMessage() {
        _super.apply(this, arguments);
    }
    return RestMessage;
})(RestMessageHeader);
var RestScoreList = (function () {
    function RestScoreList() {
    }
    return RestScoreList;
})();
var RestHighscore = (function () {
    function RestHighscore() {
    }
    return RestHighscore;
})();
///////////
// Requests
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
var RestMessageActions;
(function (RestMessageActions) {
    RestMessageActions[RestMessageActions["GetUnreadCount"] = 0] = "GetUnreadCount";
    RestMessageActions[RestMessageActions["GetList"] = 1] = "GetList";
    RestMessageActions[RestMessageActions["Get"] = 2] = "Get";
    RestMessageActions[RestMessageActions["Send"] = 3] = "Send";
})(RestMessageActions || (RestMessageActions = {}));
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
var RestHighscoreActions;
(function (RestHighscoreActions) {
    RestHighscoreActions[RestHighscoreActions["GetLists"] = 0] = "GetLists";
    RestHighscoreActions[RestHighscoreActions["GetList"] = 1] = "GetList";
    RestHighscoreActions[RestHighscoreActions["Get"] = 2] = "Get";
    RestHighscoreActions[RestHighscoreActions["Send"] = 3] = "Send";
})(RestHighscoreActions || (RestHighscoreActions = {}));
var RestHighscoreRequest = (function (_super) {
    __extends(RestHighscoreRequest, _super);
    function RestHighscoreRequest(_action, _id, _maxCount) {
        if (_maxCount === void 0) { _maxCount = 10; }
        _super.call(this);
        this.action = RestHighscoreActions[_action].toLowerCase();
        this.id = _id;
        this.maxCount = _maxCount;
    }
    return RestHighscoreRequest;
})(RestRequest);
//////////
// Results
var RestResultType;
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
})(RestResultType || (RestResultType = {}));
var RestResult = (function () {
    function RestResult(_result) {
        this.result = RestResultType[_result];
    }
    return RestResult;
})();
var RestLoginResult = (function (_super) {
    __extends(RestLoginResult, _super);
    function RestLoginResult(_result, _user_id) {
        if (_user_id === void 0) { _user_id = InvalidUserId; }
        _super.call(this, _result);
        this.user_id = _user_id.id;
    }
    return RestLoginResult;
})(RestResult);
var RestGetUserResult = (function (_super) {
    __extends(RestGetUserResult, _super);
    function RestGetUserResult(_result, _user) {
        _super.call(this, _result);
        this.user = _user;
    }
    return RestGetUserResult;
})(RestResult);
var RestGetUsersResult = (function (_super) {
    __extends(RestGetUsersResult, _super);
    function RestGetUsersResult(_result, _users) {
        _super.call(this, _result);
        this.users = _users;
    }
    return RestGetUsersResult;
})(RestResult);
var RestFindUserResult = (function (_super) {
    __extends(RestFindUserResult, _super);
    function RestFindUserResult(_result, _users) {
        _super.call(this, _result);
        this.users = _users;
    }
    return RestFindUserResult;
})(RestResult);
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
var RestMessageGetUnreadCountResult = (function (_super) {
    __extends(RestMessageGetUnreadCountResult, _super);
    function RestMessageGetUnreadCountResult(_count) {
        _super.call(this, RestResultType.Ok);
        this.count = _count;
    }
    return RestMessageGetUnreadCountResult;
})(RestResult);
var RestMessageGetListResult = (function (_super) {
    __extends(RestMessageGetListResult, _super);
    function RestMessageGetListResult(_messages) {
        _super.call(this, RestResultType.Ok);
        this.messages = _messages;
    }
    return RestMessageGetListResult;
})(RestResult);
var RestMessageGetResult = (function (_super) {
    __extends(RestMessageGetResult, _super);
    function RestMessageGetResult(_message) {
        _super.call(this, RestResultType.Ok);
        this.message = _message;
    }
    return RestMessageGetResult;
})(RestResult);
var RestHighscoreGetListsResult = (function (_super) {
    __extends(RestHighscoreGetListsResult, _super);
    function RestHighscoreGetListsResult(_lists) {
        _super.call(this, RestResultType.Ok);
        this.lists = _lists;
    }
    return RestHighscoreGetListsResult;
})(RestResult);
var RestHighscoreGetListResult = (function (_super) {
    __extends(RestHighscoreGetListResult, _super);
    function RestHighscoreGetListResult(_list, _highscores) {
        _super.call(this, RestResultType.Ok);
        this.list = _list;
        this.highscores = _highscores;
    }
    return RestHighscoreGetListResult;
})(RestResult);
//# sourceMappingURL=types.rest.js.map