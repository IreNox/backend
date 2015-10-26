
export enum RestResultType {
    Ok,
    InvalidCall,
    DatabaseError
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

export class RestFriendsResult extends RestResult {
    public user_id: string;

    constructor(_result: RestResultType, _user_id?: string) {
        super(_result);
        this.user_id = _user_id;
    }
}
