var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ItemShopState = (function (_super) {
    __extends(ItemShopState, _super);
    function ItemShopState() {
        _super.apply(this, arguments);
    }
    ItemShopState.prototype.onActivate = function () {
        var stateObject = this;
        $('#content').load('html/itemshop.html', function () {
            if (Global.user) {
                stateObject.onRefreshUser(Global.user);
            }
        });
    };
    ItemShopState.prototype.onRefreshUser = function (currentUser) {
        var getListRequest = new RestItemShopRequest(RestItemShopAction.GetList);
        sdk.serverPostAndParse('itemshop', getListRequest, [], function (getListData) {
            var itemList = $('#items').html(ui.formatFile('itemshop_items', getListData));
            ui.buttonList(itemList, 'item_buy', function (id) {
                var buyRequest = new RestItemShopRequest(RestItemShopAction.Buy, id);
                sdk.serverPostAndParse('itemshop', buyRequest, [], function (result) {
                    ui.showStatusMessage(ui.preloadHtml('itemshop_bought'));
                    user.refreshUser(null, true);
                });
            });
        });
    };
    return ItemShopState;
}(State));
sdk.registerState(StateType.ItemShop, new ItemShopState());
//# sourceMappingURL=state.itemshop.js.map