"use strict";
class RestUserId {
    constructor(_id) {
        this.id = _id;
    }
}
exports.RestUserId = RestUserId;
exports.InvalidUserId = new RestUserId("");
class RestUser {
}
exports.RestUser = RestUser;
class RestMessageHeader {
}
exports.RestMessageHeader = RestMessageHeader;
class RestMessage extends RestMessageHeader {
}
exports.RestMessage = RestMessage;
class RestScoreList {
}
exports.RestScoreList = RestScoreList;
class RestHighscore {
}
exports.RestHighscore = RestHighscore;
///////////
// Requests
class RestRequest {
}
exports.RestRequest = RestRequest;
class RestLoginRequest extends RestRequest {
    constructor(_username, _password) {
        super();
        this.username = _username;
        this.password = _password;
    }
}
exports.RestLoginRequest = RestLoginRequest;
class RestGetUserRequest extends RestRequest {
    constructor(_user_id) {
        super();
        this.user_id = _user_id;
    }
}
exports.RestGetUserRequest = RestGetUserRequest;
class RestGetUsersRequest extends RestRequest {
    constructor(_user_ids) {
        super();
        this.user_ids = _user_ids;
    }
}
exports.RestGetUsersRequest = RestGetUsersRequest;
(function (RestFriendsActions) {
    RestFriendsActions[RestFriendsActions["Add"] = 0] = "Add";
    RestFriendsActions[RestFriendsActions["Remove"] = 1] = "Remove";
})(exports.RestFriendsActions || (exports.RestFriendsActions = {}));
var RestFriendsActions = exports.RestFriendsActions;
class RestFriendsRequest extends RestRequest {
    constructor(_action, _user_id) {
        super();
        this.action = RestFriendsActions[_action].toLowerCase();
        this.user_id = _user_id;
    }
}
exports.RestFriendsRequest = RestFriendsRequest;
(function (RestMessageActions) {
    RestMessageActions[RestMessageActions["GetUnreadCount"] = 0] = "GetUnreadCount";
    RestMessageActions[RestMessageActions["GetList"] = 1] = "GetList";
    RestMessageActions[RestMessageActions["Get"] = 2] = "Get";
    RestMessageActions[RestMessageActions["Send"] = 3] = "Send";
})(exports.RestMessageActions || (exports.RestMessageActions = {}));
var RestMessageActions = exports.RestMessageActions;
class RestMessageRequest extends RestRequest {
    constructor(_action, _id, _subject, _message) {
        super();
        this.action = RestMessageActions[_action].toLowerCase();
        this.id = _id;
        this.subject = _subject;
        this.message = _message;
    }
}
exports.RestMessageRequest = RestMessageRequest;
(function (RestHighscoreActions) {
    RestHighscoreActions[RestHighscoreActions["GetLists"] = 0] = "GetLists";
    RestHighscoreActions[RestHighscoreActions["GetList"] = 1] = "GetList";
    RestHighscoreActions[RestHighscoreActions["Send"] = 2] = "Send";
})(exports.RestHighscoreActions || (exports.RestHighscoreActions = {}));
var RestHighscoreActions = exports.RestHighscoreActions;
class RestHighscoreRequest extends RestRequest {
    constructor(_action, _id, _maxCountOrPoints) {
        super();
        this.action = RestHighscoreActions[_action].toLowerCase();
        this.id = _id;
        this.maxCountOrPoints = _maxCountOrPoints;
    }
}
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
class RestResult {
    constructor(_result) {
        this.result = RestResultType[_result];
    }
}
exports.RestResult = RestResult;
class RestLoginResult extends RestResult {
    constructor(_result, _user_id = exports.InvalidUserId) {
        super(_result);
        this.user_id = _user_id.id;
    }
}
exports.RestLoginResult = RestLoginResult;
class RestGetUserResult extends RestResult {
    constructor(_result, _user) {
        super(_result);
        this.user = _user;
    }
}
exports.RestGetUserResult = RestGetUserResult;
class RestGetUsersResult extends RestResult {
    constructor(_result, _users) {
        super(_result);
        this.users = _users;
    }
}
exports.RestGetUsersResult = RestGetUsersResult;
class RestFindUserResult extends RestResult {
    constructor(_result, _users) {
        super(_result);
        this.users = _users;
    }
}
exports.RestFindUserResult = RestFindUserResult;
class RestFriendsResult extends RestResult {
    constructor(_result, _user_id) {
        super(_result);
        if (_user_id) {
            this.user_id = _user_id.id;
        }
    }
}
exports.RestFriendsResult = RestFriendsResult;
class RestMessageGetUnreadCountResult extends RestResult {
    constructor(_count) {
        super(RestResultType.Ok);
        this.count = _count;
    }
}
exports.RestMessageGetUnreadCountResult = RestMessageGetUnreadCountResult;
class RestMessageGetListResult extends RestResult {
    constructor(_messages) {
        super(RestResultType.Ok);
        this.messages = _messages;
    }
}
exports.RestMessageGetListResult = RestMessageGetListResult;
class RestMessageGetResult extends RestResult {
    constructor(_message) {
        super(RestResultType.Ok);
        this.message = _message;
    }
}
exports.RestMessageGetResult = RestMessageGetResult;
class RestHighscoreGetListsResult extends RestResult {
    constructor(_lists) {
        super(RestResultType.Ok);
        this.lists = _lists;
    }
}
exports.RestHighscoreGetListsResult = RestHighscoreGetListsResult;
class RestHighscoreGetListResult extends RestResult {
    constructor(_list, _highscores) {
        super(RestResultType.Ok);
        this.list = _list;
        this.highscores = _highscores;
    }
}
exports.RestHighscoreGetListResult = RestHighscoreGetListResult;
//# sourceMappingURL=types.rest.js.map