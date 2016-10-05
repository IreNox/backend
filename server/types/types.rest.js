"use strict";
class RestObject {
}
exports.RestObject = RestObject;
class RestUser extends RestObject {
}
exports.RestUser = RestUser;
class RestMessageHeader extends RestObject {
}
exports.RestMessageHeader = RestMessageHeader;
class RestMessage extends RestMessageHeader {
}
exports.RestMessage = RestMessage;
class RestScoreList extends RestObject {
}
exports.RestScoreList = RestScoreList;
class RestHighscore {
}
exports.RestHighscore = RestHighscore;
class RestShopItem extends RestObject {
}
exports.RestShopItem = RestShopItem;
class RestComponent extends RestObject {
}
exports.RestComponent = RestComponent;
class RestEntity extends RestObject {
}
exports.RestEntity = RestEntity;
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
    constructor(_userId) {
        super();
        this.userId = _userId;
    }
}
exports.RestGetUserRequest = RestGetUserRequest;
class RestGetUsersRequest extends RestRequest {
    constructor(_userIds) {
        super();
        this.userIds = _userIds;
    }
}
exports.RestGetUsersRequest = RestGetUsersRequest;
(function (RestFriendsActions) {
    RestFriendsActions[RestFriendsActions["Add"] = 0] = "Add";
    RestFriendsActions[RestFriendsActions["Remove"] = 1] = "Remove";
})(exports.RestFriendsActions || (exports.RestFriendsActions = {}));
var RestFriendsActions = exports.RestFriendsActions;
class RestFriendsRequest extends RestRequest {
    constructor(_action, _userId) {
        super();
        this.action = RestFriendsActions[_action].toLowerCase();
        this.userId = _userId;
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
        this.action = _action;
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
    constructor(_action, _list_name, _maxCountOrPoints) {
        super();
        this.action = _action;
        this.list_name = _list_name;
        this.maxCountOrPoints = _maxCountOrPoints;
    }
}
exports.RestHighscoreRequest = RestHighscoreRequest;
(function (RestItemShopAction) {
    RestItemShopAction[RestItemShopAction["GetList"] = 0] = "GetList";
    RestItemShopAction[RestItemShopAction["Get"] = 1] = "Get";
    RestItemShopAction[RestItemShopAction["Buy"] = 2] = "Buy";
})(exports.RestItemShopAction || (exports.RestItemShopAction = {}));
var RestItemShopAction = exports.RestItemShopAction;
class RestItemShopRequest extends RestRequest {
    constructor(_action, _id) {
        super();
        this.action = _action;
        this.id = _id;
    }
}
exports.RestItemShopRequest = RestItemShopRequest;
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
    RestResultType[RestResultType["NotEnoughGems"] = 11] = "NotEnoughGems";
    RestResultType[RestResultType["Unknown"] = 12] = "Unknown";
})(exports.RestResultType || (exports.RestResultType = {}));
var RestResultType = exports.RestResultType;
class RestResult {
    constructor(_result) {
        this.result = RestResultType[_result];
    }
}
exports.RestResult = RestResult;
class RestLoginResult extends RestResult {
    constructor(_result, _userId) {
        super(_result);
        this.userId = _userId;
    }
}
exports.RestLoginResult = RestLoginResult;
class RestGetUserResult extends RestResult {
    constructor(_user) {
        super(RestResultType.Ok);
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
    constructor(_userId) {
        super(RestResultType.Ok);
        this.userId = _userId;
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
class RestItemShopGetListResult extends RestResult {
    constructor(_items) {
        super(RestResultType.Ok);
        this.items = _items;
    }
}
exports.RestItemShopGetListResult = RestItemShopGetListResult;
class RestItemShopGetResult extends RestResult {
    constructor(_item) {
        super(RestResultType.Ok);
        this.item = _item;
    }
}
exports.RestItemShopGetResult = RestItemShopGetResult;
//# sourceMappingURL=types.rest.js.map