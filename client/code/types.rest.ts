
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

interface RestCallback {
    (data: RestResult): void;
}
