
class GemsShopState extends State {
	public onActivate(stateData: any): void {
		var stateObject = this;
		$('#content').load('html/gemsshop.html', function () {
			if (Global.user) {
				stateObject.onRefreshUser(Global.user);
			}
		});
	}

	public onRefreshUser(currentUser: RestUser) {
		var getListRequest = new RestItemShopRequest(RestItemShopAction.GetList);
		sdk.serverPostAndParse('gemsshop', getListRequest, [], function (getListData: RestItemShopGetListResult) {
			var itemList = $('#items').html(ui.formatFile('gemsshop_items', getListData));

			ui.buttonList(itemList, 'gems_buy', function (id: string) {
				var buyRequest = new RestItemShopRequest(RestItemShopAction.Buy, id);
				sdk.serverPostAndParse('gemsshop', buyRequest, [], function (result: RestResult) {
					ui.showStatusMessage(ui.preloadHtml('gemsshop_bought'));

					user.refreshUser(null, true);
				});
			});
		});
	}
}

sdk.registerState(StateType.GemsShop, new GemsShopState());