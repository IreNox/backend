
class RestRequest {
}

class RestLoginRequest extends RestRequest {
    public username: string;
    public password: string;

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

enum RestFriendsActions {
    Add,
    Remove
}

class RestFriendsRequest extends RestRequest {
    public action: string;
    public user_id: string;

    constructor(_action: RestFriendsActions, _user_id: string) {
        super();
        this.action = RestFriendsActions[_action];
        this.user_id = _user_id;
    }
}

class RestResult {
    public result: string;
}

class RestLoginResult extends RestResult {
    public user_id: string;
}

class RestGetUserResult extends RestResult {
    public user: User;
}

class RestFindUserResult extends RestResult {
    public users: User[];
}

class RestFriendsResult extends RestResult {
    public user_id: string;
}

interface RestCallback {
    (data: RestResult): void;
}
