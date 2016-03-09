var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ShopState = (function (_super) {
    __extends(ShopState, _super);
    function ShopState() {
        _super.apply(this, arguments);
    }
    ShopState.prototype.onActivate = function () {
        var stateObject = this;
        $('#content').load('html/shop.html', function () {
            if (Global.user) {
                stateObject.onRefreshUser(Global.user);
            }
        });
    };
    ShopState.prototype.onRefreshUser = function (currentUser) {
        var getListRequest = new RestItemShopRequest(RestItemShopAction.GetList);
        sdk.serverPostAndParse('itemshop', getListRequest, [], function (getListData) {
            var itemList = $('#items').html(ui.formatFile('shop_items', getListData));
            ui.buttonList(itemList, 'item_buy', function (id) {
                var buyRequest = new RestItemShopRequest(RestItemShopAction.Buy, id);
                sdk.serverPostAndParse('itemshop', buyRequest, [], function (result) {
                    ui.showStatusMessage(ui.preloadHtml('shop_bought'));
                    user.refreshUser(null, true);
                });
            });
        });
    };
    return ShopState;
}(State));
sdk.registerState('shop', new ShopState());
//# sourceMappingURL=state.shop.js.map