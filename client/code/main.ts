var Historyjs: Historyjs = <any>History;

module Global {
	export var userId: string = null;
    export var user: RestUser = null;

    export var stateType: StateType = StateType.Invalid;
    export var stateData: any = null;
	export var stateObject: State = null;
}

$(document).ready(function () {
	ui.init();
    sdk.init();
    ui.setLoading();
    user.login();
});