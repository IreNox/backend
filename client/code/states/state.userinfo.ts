
class UserInfoState extends State {
	public onActivate(stateData: any): void {
		$('#content').load('html/userinfo.html', function () {
			sdk.serverPostAndParse('getuser', new RestGetUserRequest(stateData.user_id), [], function (data: RestGetUserResult) {
					$('#username').html(data.user.username);
			});
		});
	}
}

sdk.registerState('userinfo', new UserInfoState());
