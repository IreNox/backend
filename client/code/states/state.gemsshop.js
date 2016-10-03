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
        var stateObject = this;
        $('#content').load('html/gemsshop.html', function () {
            if (Global.user) {
                stateObject.onRefreshUser(Global.user);
            }
        });
    };
    GemsShopState.prototype.onRefreshUser = function (currentUser) {
        var getListRequest = new RestItemShopRequest(RestItemShopAction.GetList);
        sdk.serverPostAndParse('gemsshop', getListRequest, [], function (getListData) {
            var itemList = $('#items').html(ui.formatFile('gemsshop_items', getListData));
            ui.buttonList(itemList, 'gems_buy', function (id) {
                var buyRequest = new RestItemShopRequest(RestItemShopAction.Buy, id);
                sdk.serverPostAndParse('gemsshop', buyRequest, [], function (result) {
                    ui.showStatusMessage(ui.preloadHtml('gemsshop_bought'));
                    user.refreshUser(null, true);
                });
            });
        });
    };
    return GemsShopState;
}(State));
sdk.registerState(StateType.GemsShop, new GemsShopState());
//# sourceMappingURL=state.gemsshop.js.map