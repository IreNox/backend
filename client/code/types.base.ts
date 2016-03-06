
class StateContext {
    public stateName: string;
    public stateData: any;
}

class User {
    public id: string;
    public username: string;
    public friends: string[];
}

interface BaseCallback {
    (): void;
}

interface ResultCallback {
    (ok: boolean): void;
}
