
class RestObject {
	public id: string;
}

class RestUser extends RestObject {
	public name: string;
	public username: string;
	public friends: string[];
	public items: number[];
	public gems: number;
}

class RestMessageHeader extends RestObject {
	public sender: RestUser;
	public subject: string;
	public read: boolean;
	public sent_time: Date;
}

class RestMessage extends RestMessageHeader {
	public message: string;
}

class RestScoreList extends RestObject {
	public name: string;
}

class RestHighscore {
	public user: RestUser;
	public points: number;
}

class RestShopItem extends RestObject {
	public name: string;
	public type: string;
	public image: string;
	public value: number;
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
	public userId: string;

	constructor(_userId?: string) {
		super();
		this.userId = _userId;
	}
}

class RestGetUsersRequest extends RestRequest {
	public userIds: string[];

	constructor(_userIds?: string[]) {
		super();
		this.userIds = _userIds;
	}
}

enum RestFriendsActions {
	Add,
	Remove
}

class RestFriendsRequest extends RestRequest {
	public action: string;
	public userId: string;

	constructor(_action: RestFriendsActions, _userId: string) {
		super();
		this.action = RestFriendsActions[_action].toLowerCase();
		this.userId = _userId;
	}
}

enum RestMessageActions {
	GetUnreadCount,
	GetList,
	Get,
	Send
}

class RestMessageRequest extends RestRequest {
	public action: RestMessageActions;
	public id: string;
	public subject: string;
	public message: string;

	constructor(_action: RestMessageActions, _id?: string, _subject?: string, _message?: string) {
		super();
		this.action = _action;
		this.id = _id;
		this.subject = _subject;
		this.message = _message;
	}
}

enum RestHighscoreActions {
	GetLists,
	GetList,
	Send
}

class RestHighscoreRequest extends RestRequest {
	public action: RestHighscoreActions;
	public list_name: string;
	public maxCountOrPoints: number;

	constructor(_action: RestHighscoreActions, _list_name?: string, _maxCountOrPoints?: number) {
		super();
		this.action = _action;
		this.list_name = _list_name;
		this.maxCountOrPoints = _maxCountOrPoints;
	}
}

enum RestItemShopAction {
	GetList,
	Get,
	Buy
}

class RestItemShopRequest extends RestRequest {
	public action: RestItemShopAction;
	public id: string;

	constructor(_action: RestItemShopAction, _id?: string) {
		super();
		this.action = _action;
		this.id = _id;
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
	public userId: string;

	constructor(_result: RestResultType, _userId: string) {
		super(_result);
		this.userId = _userId;
	}
}

class RestGetUserResult extends RestResult {
	public user: RestUser;

	constructor(_user: RestUser) {
		super(RestResultType.Ok);
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
	public userId: string;

	constructor(_userId: string) {
		super(RestResultType.Ok);
		this.userId = _userId;
	}
}

class RestMessageGetUnreadCountResult extends RestResult {
	public count: number;

	constructor(_count: number) {
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

class RestHighscoreGetListsResult extends RestResult {
	public lists: RestScoreList[];

	constructor(_lists: RestScoreList[]) {
		super(RestResultType.Ok);
		this.lists = _lists;
	}
}

class RestHighscoreGetListResult extends RestResult {
	public list: RestScoreList;
	public highscores: RestHighscore[];

	constructor(_list: RestScoreList, _highscores: RestHighscore[]) {
		super(RestResultType.Ok);
		this.list = _list;
		this.highscores = _highscores;
	}
}

class RestItemShopGetListResult extends RestResult {
	public items: RestShopItem[];

	constructor(_items: RestShopItem[]) {
		super(RestResultType.Ok);
		this.items = _items;
	}
}

class RestItemShopGetResult extends RestResult {
	public item: RestShopItem;

	constructor(_item: RestShopItem) {
		super(RestResultType.Ok);
		this.item = _item;
	}
}

