
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
