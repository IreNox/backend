import * as mongoose from 'mongoose';

export interface DatabaseCallback {
    (err: string, data: mongoose.Document): void;
}