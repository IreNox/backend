var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EntityEditorState = (function (_super) {
    __extends(EntityEditorState, _super);
    function EntityEditorState() {
        _super.apply(this, arguments);
    }
    EntityEditorState.prototype.onActivate = function () {
        var stateObject = this;
        $('#content').load('html/editor_entity.html', function () {
            if (Global.user) {
                stateObject.onRefreshUser(Global.user);
            }
        });
    };
    EntityEditorState.prototype.onRefreshUser = function (currentUser) {
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
    return EntityEditorState;
}(State));
sdk.registerState(StateType.EditorEntity, new EntityEditorState());
//# sourceMappingURL=state.editorentity.js.map