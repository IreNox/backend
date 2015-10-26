var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (RestResultType) {
    RestResultType[RestResultType["Ok"] = 0] = "Ok";
    RestResultType[RestResultType["InvalidCall"] = 1] = "InvalidCall";
    RestResultType[RestResultType["DatabaseError"] = 2] = "DatabaseError";
})(exports.RestResultType || (exports.RestResultType = {}));
var RestResultType = exports.RestResultType;
var RestResult = (function () {
    function RestResult(_result) {
        this.result = RestResultType[_result];
    }
    return RestResult;
})();
exports.RestResult = RestResult;
var RestFriendsResult = (function (_super) {
    __extends(RestFriendsResult, _super);
    function RestFriendsResult(_result, _user_id) {
        _super.call(this, _result);
        this.user_id = _user_id;
    }
    return RestFriendsResult;
})(RestResult);
exports.RestFriendsResult = RestFriendsResult;
//# sourceMappingURL=types.rest.js.map