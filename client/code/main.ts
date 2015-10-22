
module global {
    export var userId: string = "";
    export var stateContext: any = null;
}

$(document).ready(function () {
    sdk.setLoading();
    user.login();
});