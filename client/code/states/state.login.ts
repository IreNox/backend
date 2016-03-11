
class LoginState extends State {
	public onActivate(): void {
		if (Global.user) {
			sdk.changeState(StateType.Overview);
		}

		$('#content').load('html/login.html', function () {
			$('#login_form').submit(function (eventObject: JQueryEventObject) {
				user.login(new RestLoginRequest($('#login_username').val(), $('#login_password').val()));				
				eventObject.preventDefault();
			});
			$('#login_button').button();

			$('#signup_form').submit(function (eventObject: JQueryEventObject) {
				user.signUp(new RestLoginRequest($('#signup_username').val(), $('#signup_password').val()));
				eventObject.preventDefault();
			});
			$('#signup_button').button();
		});
	}
}

sdk.registerState(StateType.Login, new LoginState());