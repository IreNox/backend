var RestResultType;
(function (RestResultType) {
    RestResultType[RestResultType["Ok"] = 0] = "Ok";
    RestResultType[RestResultType["InvalidCall"] = 1] = "InvalidCall";
    RestResultType[RestResultType["Test"] = 2] = "Test";
})(RestResultType || (RestResultType = {}));
var RestResult = (function () {
    function RestResult(_result) {
        this.result = RestResultType[_result];
    }
    return RestResult;
})();
//# sourceMappingURL=type.rest.js.map