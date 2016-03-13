
class GemShopState extends State {
	public onActivate(stateData: any): void {
		var stateObject = this;
		$('#content').load('html/gemshop.html', function () {
			if (Global.user) {
				stateObject.onRefreshUser(Global.user);
			}
		});
	}

	public onRefreshUser(currentUser: RestUser) {
		var getListRequest = new RestItemShopRequest(RestItemShopAction.GetList);
		sdk.serverPostAndParse('gemshop', getListRequest, [], function (getListData: RestItemShopGetListResult) {
			var itemList = $('#items').html(ui.formatFile('gemshop_items', getListData));

			ui.buttonList(itemList, 'gems_buy', function (id: string) {
				var buyRequest = new RestItemShopRequest(RestItemShopAction.Buy, id);
				sdk.serverPostAndParse('gemshop', buyRequest, [], function (result: RestResult) {
					ui.showStatusMessage(ui.preloadHtml('gemshop_bought'));

					user.refreshUser(null, true);
				});
			});
		});
	}
}

sdk.registerState(StateType.GemShop, new GemShopState());