"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestObject = (function () {
    function RestObject() {
    }
    return RestObject;
}());
exports.RestObject = RestObject;
var RestUser = (function (_super) {
    __extends(RestUser, _super);
    function RestUser() {
        _super.apply(this, arguments);
    }
    return RestUser;
}(RestObject));
exports.RestUser = RestUser;
var RestMessageHeader = (function (_super) {
    __extends(RestMessageHeader, _super);
    function RestMessageHeader() {
        _super.apply(this, arguments);
    }
    return RestMessageHeader;
}(RestObject));
exports.RestMessageHeader = RestMessageHeader;
var RestMessage = (function (_super) {
    __extends(RestMessage, _super);
    function RestMessage() {
        _super.apply(this, arguments);
    }
    return RestMessage;
}(RestMessageHeader));
exports.RestMessage = RestMessage;
var RestScoreList = (function (_super) {
    __extends(RestScoreList, _super);
    function RestScoreList() {
        _super.apply(this, arguments);
    }
    return RestScoreList;
}(RestObject));
exports.RestScoreList = RestScoreList;
var RestHighscore = (function () {
    function RestHighscore() {
    }
    return RestHighscore;
}());
exports.RestHighscore = RestHighscore;
var RestShopItem = (function (_super) {
    __extends(RestShopItem, _super);
    function RestShopItem() {
        _super.apply(this, arguments);
    }
    return RestShopItem;
}(RestObject));
exports.RestShopItem = RestShopItem;
var RestComponent = (function (_super) {
    __extends(RestComponent, _super);
    function RestComponent() {
        _super.apply(this, arguments);
    }
    return RestComponent;
}(RestObject));
exports.RestComponent = RestComponent;
var RestEntity = (function (_super) {
    __extends(RestEntity, _super);
    function RestEntity() {
        _super.apply(this, arguments);
    }
    return RestEntity;
}(RestObject));
exports.RestEntity = RestEntity;
///////////
// Requests
var RestRequest = (function () {
    function RestRequest() {
    }
    return RestRequest;
}());
exports.RestRequest = RestRequest;
var RestLoginRequest = (function (_super) {
    __extends(RestLoginRequest, _super);
    function RestLoginRequest(_username, _password) {
        _super.call(this);
        this.username = _username;
        this.password = _password;
    }
    return RestLoginRequest;
}(RestRequest));
exports.RestLoginRequest = RestLoginRequest;
var RestGetUserRequest = (function (_super) {
    __extends(RestGetUserRequest, _super);
    function RestGetUserRequest(_userId) {
        _super.call(this);
        this.userId = _userId;
    }
    return RestGetUserRequest;
}(RestRequest));
exports.RestGetUserRequest = RestGetUserRequest;
var RestGetUsersRequest = (function (_super) {
    __extends(RestGetUsersRequest, _super);
    function RestGetUsersRequest(_userIds) {
        _super.call(this);
        this.userIds = _userIds;
    }
    return RestGetUsersRequest;
}(RestRequest));
exports.RestGetUsersRequest = RestGetUsersRequest;
(function (RestFriendsActions) {
    RestFriendsActions[RestFriendsActions["Add"] = 0] = "Add";
    RestFriendsActions[RestFriendsActions["Remove"] = 1] = "Remove";
})(exports.RestFriendsActions || (exports.RestFriendsActions = {}));
var RestFriendsActions = exports.RestFriendsActions;
var RestFriendsRequest = (function (_super) {
    __extends(RestFriendsRequest, _super);
    function RestFriendsRequest(_action, _userId) {
        _super.call(this);
        this.action = RestFriendsActions[_action].toLowerCase();
        this.userId = _userId;
    }
    return RestFriendsRequest;
}(RestRequest));
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
        this.action = _action;
        this.id = _id;
        this.subject = _subject;
        this.message = _message;
    }
    return RestMessageRequest;
}(RestRequest));
exports.RestMessageRequest = RestMessageRequest;
(function (RestHighscoreActions) {
    RestHighscoreActions[RestHighscoreActions["GetLists"] = 0] = "GetLists";
    RestHighscoreActions[RestHighscoreActions["GetList"] = 1] = "GetList";
    RestHighscoreActions[RestHighscoreActions["Send"] = 2] = "Send";
})(exports.RestHighscoreActions || (exports.RestHighscoreActions = {}));
var RestHighscoreActions = exports.RestHighscoreActions;
var RestHighscoreRequest = (function (_super) {
    __extends(RestHighscoreRequest, _super);
    function RestHighscoreRequest(_action, _list_name, _maxCountOrPoints) {
        _super.call(this);
        this.action = _action;
        this.list_name = _list_name;
        this.maxCountOrPoints = _maxCountOrPoints;
    }
    return RestHighscoreRequest;
}(RestRequest));
exports.RestHighscoreRequest = RestHighscoreRequest;
(function (RestItemShopAction) {
    RestItemShopAction[RestItemShopAction["GetList"] = 0] = "GetList";
    RestItemShopAction[RestItemShopAction["Get"] = 1] = "Get";
    RestItemShopAction[RestItemShopAction["Buy"] = 2] = "Buy";
})(exports.RestItemShopAction || (exports.RestItemShopAction = {}));
var RestItemShopAction = exports.RestItemShopAction;
var RestItemShopRequest = (function (_super) {
    __extends(RestItemShopRequest, _super);
    function RestItemShopRequest(_action, _id) {
        _super.call(this);
        this.action = _action;
        this.id = _id;
    }
    return RestItemShopRequest;
}(RestRequest));
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
var RestResult = (function () {
    function RestResult(_result) {
        this.result = RestResultType[_result];
    }
    return RestResult;
}());
exports.RestResult = RestResult;
var RestLoginResult = (function (_super) {
    __extends(RestLoginResult, _super);
    function RestLoginResult(_result, _userId) {
        _super.call(this, _result);
        this.userId = _userId;
    }
    return RestLoginResult;
}(RestResult));
exports.RestLoginResult = RestLoginResult;
var RestGetUserResult = (function (_super) {
    __extends(RestGetUserResult, _super);
    function RestGetUserResult(_user) {
        _super.call(this, RestResultType.Ok);
        this.user = _user;
    }
    return RestGetUserResult;
}(RestResult));
exports.RestGetUserResult = RestGetUserResult;
var RestGetUsersResult = (function (_super) {
    __extends(RestGetUsersResult, _super);
    function RestGetUsersResult(_result, _users) {
        _super.call(this, _result);
        this.users = _users;
    }
    return RestGetUsersResult;
}(RestResult));
exports.RestGetUsersResult = RestGetUsersResult;
var RestFindUserResult = (function (_super) {
    __extends(RestFindUserResult, _super);
    function RestFindUserResult(_result, _users) {
        _super.call(this, _result);
        this.users = _users;
    }
    return RestFindUserResult;
}(RestResult));
exports.RestFindUserResult = RestFindUserResult;
var RestFriendsResult = (function (_super) {
    __extends(RestFriendsResult, _super);
    function RestFriendsResult(_userId) {
        _super.call(this, RestResultType.Ok);
        this.userId = _userId;
    }
    return RestFriendsResult;
}(RestResult));
exports.RestFriendsResult = RestFriendsResult;
var RestMessageGetUnreadCountResult = (function (_super) {
    __extends(RestMessageGetUnreadCountResult, _super);
    function RestMessageGetUnreadCountResult(_count) {
        _super.call(this, RestResultType.Ok);
        this.count = _count;
    }
    return RestMessageGetUnreadCountResult;
}(RestResult));
exports.RestMessageGetUnreadCountResult = RestMessageGetUnreadCountResult;
var RestMessageGetListResult = (function (_super) {
    __extends(RestMessageGetListResult, _super);
    function RestMessageGetListResult(_messages) {
        _super.call(this, RestResultType.Ok);
        this.messages = _messages;
    }
    return RestMessageGetListResult;
}(RestResult));
exports.RestMessageGetListResult = RestMessageGetListResult;
var RestMessageGetResult = (function (_super) {
    __extends(RestMessageGetResult, _super);
    function RestMessageGetResult(_message) {
        _super.call(this, RestResultType.Ok);
        this.message = _message;
    }
    return RestMessageGetResult;
}(RestResult));
exports.RestMessageGetResult = RestMessageGetResult;
var RestHighscoreGetListsResult = (function (_super) {
    __extends(RestHighscoreGetListsResult, _super);
    function RestHighscoreGetListsResult(_lists) {
        _super.call(this, RestResultType.Ok);
        this.lists = _lists;
    }
    return RestHighscoreGetListsResult;
}(RestResult));
exports.RestHighscoreGetListsResult = RestHighscoreGetListsResult;
var RestHighscoreGetListResult = (function (_super) {
    __extends(RestHighscoreGetListResult, _super);
    function RestHighscoreGetListResult(_list, _highscores) {
        _super.call(this, RestResultType.Ok);
        this.list = _list;
        this.highscores = _highscores;
    }
    return RestHighscoreGetListResult;
}(RestResult));
exports.RestHighscoreGetListResult = RestHighscoreGetListResult;
var RestItemShopGetListResult = (function (_super) {
    __extends(RestItemShopGetListResult, _super);
    function RestItemShopGetListResult(_items) {
        _super.call(this, RestResultType.Ok);
        this.items = _items;
    }
    return RestItemShopGetListResult;
}(RestResult));
exports.RestItemShopGetListResult = RestItemShopGetListResult;
var RestItemShopGetResult = (function (_super) {
    __extends(RestItemShopGetResult, _super);
    function RestItemShopGetResult(_item) {
        _super.call(this, RestResultType.Ok);
        this.item = _item;
    }
    return RestItemShopGetResult;
}(RestResult));
exports.RestItemShopGetResult = RestItemShopGetResult;
//# sourceMappingURL=types.rest.js.map