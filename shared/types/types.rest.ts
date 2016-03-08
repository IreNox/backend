
export class RestUserId {
	public id: string;

	constructor(_id: string) {
		this.id = _id;
	}
}

export var InvalidUserId: RestUserId = new RestUserId("");

export class RestUser {
	public id: string;
	public name: string;
	public username: string;
	public friends: string[];
	public points: Number;
}

export class RestMessageHeader {
	public id: string;
	public sender: RestUser;
	public subject: string;
	public read: boolean;
	public sent_time: Date;
}

export class RestMessage extends RestMessageHeader {
	public message: string;
}

export class RestScoreList {
	public id: string;
	public name: string;
}

export class RestHighscore {
	public user: RestUser;
	public points: Number;
}

///////////
// Requests

export class RestRequest {
}

export class RestLoginRequest extends RestRequest {
	public username: string;
	public password: string;
	public login_token: string;

	constructor(_username: string, _password: string) {
		super();
		this.username = _username;
		this.password = _password;
	}
}

export class RestGetUserRequest extends RestRequest {
	public user_id: string;

	constructor(_user_id?: string) {
		super();
		this.user_id = _user_id;
	}
}

export class RestGetUsersRequest extends RestRequest {
	public user_ids: string[];

	constructor(_user_ids?: string[]) {
		super();
		this.user_ids = _user_ids;
	}
}

export enum RestFriendsActions {
	Add,
	Remove
}

export class RestFriendsRequest extends RestRequest {
	public action: string;
	public user_id: string;

	constructor(_action: RestFriendsActions, _user_id: string) {
		super();
		this.action = RestFriendsActions[_action].toLowerCase();
		this.user_id = _user_id;
	}
}

export enum RestMessageActions {
	GetUnreadCount,
	GetList,
	Get,
	Send
}

export class RestMessageRequest extends RestRequest {
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

export enum RestHighscoreActions {
	GetLists,
	GetList,
	Send
}

export class RestHighscoreRequest extends RestRequest {
	public action: string;
	public list_name: string;
	public maxCountOrPoints: number;

	constructor(_action: RestHighscoreActions, _list_name?: string, _maxCountOrPoints?: number) {
		super();
		this.action = RestHighscoreActions[_action].toLowerCase();
		this.list_name = _list_name;
		this.maxCountOrPoints = _maxCountOrPoints;
	}
}

//////////
// Results

export enum RestResultType {
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

export interface RestResultTypeCallback {
	(result: RestResultType): void;
}

export class RestResult {
	public result: string;

	constructor(_result: RestResultType) {
		this.result = RestResultType[_result];
	}
}

export class RestLoginResult extends RestResult {
	public user_id: string;

	constructor(_result: RestResultType, _user_id: RestUserId = InvalidUserId) {
		super(_result);
		this.user_id = _user_id.id;
	}
}

export class RestGetUserResult extends RestResult {
	public user: RestUser;

	constructor(_user: RestUser) {
		super(RestResultType.Ok);
		this.user = _user;
	}
}

export class RestGetUsersResult extends RestResult {
	public users: RestUser[];

	constructor(_result: RestResultType, _users?: RestUser[]) {
		super(_result);
		this.users = _users;
	}
}

export class RestFindUserResult extends RestResult {
	public users: RestUser[];

	constructor(_result: RestResultType, _users?: RestUser[]) {
		super(_result);
		this.users = _users;
	}
}

export class RestFriendsResult extends RestResult {
	public user_id: string;

	constructor(_result: RestResultType, _user_id?: RestUserId) {
		super(_result);
		if (_user_id) {
			this.user_id = _user_id.id;
		}
	}
}

export class RestMessageGetUnreadCountResult extends RestResult {
	public count: Number;

	constructor(_count: Number) {
		super(RestResultType.Ok);
		this.count = _count;
	}
}

export class RestMessageGetListResult extends RestResult {
	public messages: RestMessageHeader[];

	constructor(_messages: RestMessageHeader[]) {
		super(RestResultType.Ok);
		this.messages = _messages;
	}
}

export class RestMessageGetResult extends RestResult {
	public message: RestMessage;

	constructor(_message: RestMessage) {
		super(RestResultType.Ok);
		this.message = _message;
	}
}

export class RestHighscoreGetListsResult extends RestResult {
	public lists: RestScoreList[];

	constructor(_lists: RestScoreList[]) {
		super(RestResultType.Ok);
		this.lists = _lists;
	}
}

export class RestHighscoreGetListResult extends RestResult {
	public list: RestScoreList;
	public highscores: RestHighscore[];

	constructor(_list: RestScoreList, _highscores: RestHighscore[]) {
		super(RestResultType.Ok);
		this.list = _list;
		this.highscores = _highscores;
	}
}

export interface RestCallback {
	(data: RestResult): void;
}
