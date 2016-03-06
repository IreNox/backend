
class MessageState extends State {
	public onActivate(): void {
		$('#content').load('html/message.html', function () {
			var getListRequest: RestMessageRequest = new RestMessageRequest(RestMessageActions.GetList);
			sdk.serverPostAndParse('message', getListRequest, [], function (getListData: RestMessageGetListResult) {
				ui.buttonList(
					$('#message_list').html(ui.formatFile('message_list', getListData)),
					'message',
					function (id: string) {
						var getRequest: RestMessageRequest = new RestMessageRequest(RestMessageActions.Get, id);
						sdk.serverPostAndParse('message', getRequest, [], function (getData: RestMessageGetResult) {
							$('#message').html(ui.formatFile('message_message', getData));
						});
					}
				);
			}); 
		});
	}
}

sdk.registerState('message', new MessageState());