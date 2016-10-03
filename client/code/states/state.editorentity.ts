
class EntityEditorState extends State {
	public onActivate() {
		var stateObject = this;
		$('#content').load('html/editor_entity.html', function () {
			if (Global.user) {
				stateObject.onRefreshUser(Global.user);
			}
		});
	}

	public onRefreshUser(currentUser: RestUser) {
		var getListRequest = new RestItemShopRequest(RestItemShopAction.GetList);
		sdk.serverPostAndParse('itemshop', getListRequest, [], function (getListData: RestItemShopGetListResult) {
			var itemList = $('#items').html(ui.formatFile('itemshop_items', getListData));

			ui.buttonList(itemList, 'item_buy', function (id: string) {
				var buyRequest = new RestItemShopRequest(RestItemShopAction.Buy, id);
				sdk.serverPostAndParse('itemshop', buyRequest, [], function (result: RestResult) {
					ui.showStatusMessage(ui.preloadHtml('itemshop_bought'));

					user.refreshUser(null, true);
				});
			});
		});
	}
}

sdk.registerState(StateType.EditorEntity, new EntityEditorState());