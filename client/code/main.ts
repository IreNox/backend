var Historyjs: Historyjs = <any>History;

module Global {
    export var userId: string = "";
    export var stateName: string = "";
    export var stateData: any = null;
	export var stateObject: State = null;
}

$(document).ready(function () {
    sdk.init();
    sdk.setLoading();
    user.login();
});