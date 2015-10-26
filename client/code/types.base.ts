
class StateContext {
    public stateName: string;
    public stateData: any;
}

class User {
    public _id: string;
    public username: string;
    public friends: User[];
}

interface BaseCallback {
    (): void;
}

interface ResultCallback {
    (ok: boolean): void;
}
