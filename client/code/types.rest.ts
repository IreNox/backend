
class RestUserId {
	public id: string;

	constructor(_id: string) {
		this.id = _id;
	}
}

var InvalidUserId: RestUserId = new RestUserId("");

class RestUser {
	public id: string;
	public name: string;
	public username: string;
	public friends: string[];
	public points: Number;
}

class RestMessageHeader {
	public sender: RestUser;
	public subject: string;
	public read: boolean;
	public sent_time: Date;
}

class RestMessage extends RestMessageHeader {
	public message: string;
}

///////////
// Requests

class RestRequest {
}

class RestLoginRequest extends RestRequest {
	public username: string;
	public password: string;
	public login_token: string;

	constructor(_username: string, _password: string) {
		super();
		this.username = _username;
		this.password = _password;
	}
}

class RestGetUserRequest extends RestRequest {
	public user_id: string;

	constructor(_user_id?: string) {
		super();
		this.user_id = _user_id;
	}
}

class RestGetUsersRequest extends RestRequest {
	public user_ids: string[];

	constructor(_user_ids?: string[]) {
		super();
		this.user_ids = _user_ids;
	}
}

enum RestFriendsActions {
	Add,
	Remove
}

class RestFriendsRequest extends RestRequest {
	public action: string;
	public user_id: string;

	constructor(_action: RestFriendsActions, _user_id: string) {
		super();
		this.action = RestFriendsActions[_action].toLowerCase();
		this.user_id = _user_id;
	}
}

enum RestMessageActions {
	GetUnreadCount,
	GetList,
	Get,
	Send
}

class RestMessageRequest extends RestRequest {
	public action: string;
	public id: string;
	public subject: string;
	public message: string;

	constructor(_action: RestMessageActions, _id?: string, _subject?: string, _message?: string) {
		super();
		this.action = RestMessageActions[_action].toLowerCase();
		this.id = _id;
		this.subject = _subject;
		this.message = _message;
	}
}

//////////
// Results

enum RestResultType {
	Ok,
	InvalidCall,
	DatabaseError,
	NotLoggedin,
	AlreadyLoggedin,
	NotFound,
	InvalidToken,
	InvalidPassword,
	AlreadyInList,
	NotInList,
	AlreadyInUse,

	Unknown
}

interface RestResultTypeCallback {
	(result: RestResultType): void;
}

class RestResult {
	public result: string;

	constructor(_result: RestResultType) {
		this.result = RestResultType[_result];
	}
}

class RestLoginResult extends RestResult {
	public user_id: string;

	constructor(_result: RestResultType, _user_id: RestUserId = InvalidUserId) {
		super(_result);
		this.user_id = _user_id.id;
	}
}

class RestGetUserResult extends RestResult {
	public user: RestUser;

	constructor(_result: RestResultType, _user?: RestUser) {
		super(_result);
		this.user = _user;
	}
}

class RestGetUsersResult extends RestResult {
	public users: RestUser[];

	constructor(_result: RestResultType, _users?: RestUser[]) {
		super(_result);
		this.users = _users;
	}
}

class RestFindUserResult extends RestResult {
	public users: RestUser[];

	constructor(_result: RestResultType, _users?: RestUser[]) {
		super(_result);
		this.users = _users;
	}
}

class RestFriendsResult extends RestResult {
	public user_id: string;

	constructor(_result: RestResultType, _user_id?: RestUserId) {
		super(_result);
		if (_user_id) {
			this.user_id = _user_id.id;
		}
	}
}

class RestMessageGetUnreadCountResult extends RestResult {
	public count: Number;

	constructor(_count: Number) {
		super(RestResultType.Ok);
		this.count = _count;
	}
}

class RestMessageGetListResult extends RestResult {
	public messages: RestMessageHeader[];

	constructor(_messages: RestMessageHeader[]) {
		super(RestResultType.Ok);
		this.messages = _messages;
	}
}

class RestMessageGetResult extends RestResult {
	public message: RestMessage;

	constructor(_message: RestMessage) {
		super(RestResultType.Ok);
		this.message = _message;
	}
}

interface RestCallback {
	(data: RestResult): void;
}
