import mongoose = require('mongoose');

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

	Unknown
}

export class RestUserId {
	public id: string;

	constructor(_id: string) {
		this.id = _id;
	}

	public static fromDatabase(value: mongoose.Document): RestUserId {
		return new RestUserId(value._id.toHexString());
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

	constructor(_result: RestResultType, _user_id: RestUserId) {
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
