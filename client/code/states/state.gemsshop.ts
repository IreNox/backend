
class GemsShopState extends State {
	public onActivate(stateData: any): void {
		$('#content').load('html/userinfo.html', function () {
		});
	}
}

sdk.registerState(StateType.GemsShop, new GemsShopState());