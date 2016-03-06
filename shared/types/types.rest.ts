
module Rest {
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

		constructor(_result: RestResultType, _user?: RestUser) {
			super(_result);
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

	export interface RestCallback {
		(data: RestResult): void;
	}
}

export = Rest;
