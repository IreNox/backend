
class State {
    public onActivate(stateData: any): void {
	}

	public onDeactivate(): void {
	}

	public onStatusMessage(message: string) {
		$('#status').html(message).show(0).fadeOut(2000);
	}

	public onErrorMessage(message: string) {
		$('#error').html(message).show(0).fadeOut(2000);
	}
}
