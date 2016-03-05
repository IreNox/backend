
export enum RestResultType {
    Ok,
    InvalidCall,
    DatabaseError,
	NotLoggedin,
	AlreadyLoggedin,
	NotFound,
	InvalidToken,
	InvalidPassword,

	Unknown
}

export class RestUserId {
	public id: string;

	constructor(_id: string) {
		this.id = _id;
	}

	public toString(): string {
		return this.id;
	}
}

export var InvalidUserId: RestUserId = new RestUserId("");

export class RestUser {
	public id: RestUserId;
    public name: string;
    public username: string;
    public friends: RestUserId[];
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
		this.user_id = _user_id.toString();
	}
}

export class RestFindUserResult extends RestResult {
    public users: string[];

    constructor(_result: RestResultType, _users: RestUserId[]) {
        super(_result);
        this.users = _users.map(function (value: RestUserId): string {
			return value.toString();
		});
    }
}

export class RestFriendsResult extends RestResult {
    public user_id: string;

    constructor(_result: RestResultType, _user_id: RestUserId) {
        super(_result);
        this.user_id = _user_id.toString();
    }
}
