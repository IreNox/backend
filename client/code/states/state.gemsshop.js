var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GemsShopState = (function (_super) {
    __extends(GemsShopState, _super);
    function GemsShopState() {
        _super.apply(this, arguments);
    }
    GemsShopState.prototype.onActivate = function (stateData) {
        $('#content').load('html/userinfo.html', function () {
        });
    };
    return GemsShopState;
}(State));
sdk.registerState(StateType.GemsShop, new GemsShopState());
//# sourceMappingURL=state.gemsshop.js.map