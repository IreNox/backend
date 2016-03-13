var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GemShopState = (function (_super) {
    __extends(GemShopState, _super);
    function GemShopState() {
        _super.apply(this, arguments);
    }
    GemShopState.prototype.onActivate = function (stateData) {
        var stateObject = this;
        $('#content').load('html/gemshop.html', function () {
            if (Global.user) {
                stateObject.onRefreshUser(Global.user);
            }
        });
    };
    GemShopState.prototype.onRefreshUser = function (currentUser) {
        var getListRequest = new RestItemShopRequest(RestItemShopAction.GetList);
        sdk.serverPostAndParse('gemshop', getListRequest, [], function (getListData) {
            var itemList = $('#items').html(ui.formatFile('gemshop_items', getListData));
            ui.buttonList(itemList, 'gems_buy', function (id) {
                var buyRequest = new RestItemShopRequest(RestItemShopAction.Buy, id);
                sdk.serverPostAndParse('gemshop', buyRequest, [], function (result) {
                    ui.showStatusMessage(ui.preloadHtml('gemshop_bought'));
                    user.refreshUser(null, true);
                });
            });
        });
    };
    return GemShopState;
}(State));
sdk.registerState(StateType.GemShop, new GemShopState());
//# sourceMappingURL=state.gemsshop.js.map