var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MessageState = (function (_super) {
    __extends(MessageState, _super);
    function MessageState() {
        _super.apply(this, arguments);
    }
    MessageState.prototype.onActivate = function () {
        $('#content').load('html/message.html', function () {
            var getListRequest = new RestMessageRequest(RestMessageActions.GetList);
            sdk.serverPostAndParse('message', getListRequest, [], function (getListData) {
                ui.buttonList($('#message_list').html(ui.formatFile('message_list', getListData)), 'message', function (id) {
                    var getRequest = new RestMessageRequest(RestMessageActions.Get, id);
                    sdk.serverPostAndParse('message', getRequest, [], function (getData) {
                        $('#message').html(ui.formatFile('message_message', getData));
                    });
                });
            });
        });
    };
    return MessageState;
}(State));
sdk.registerState('message', new MessageState());
//# sourceMappingURL=state.message.js.map