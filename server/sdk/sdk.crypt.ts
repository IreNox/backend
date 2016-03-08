import * as md5 from 'md5';
import * as crypto from 'crypto';

export default class SdkCypt {
    md5(str: string): string {
        return md5(str);
    }

    md5_salt(): string {
        return crypto.randomBytes(128 / 8).toString('hex');
    }

    salt(password: string, salt: string): string {
        return md5(password + salt)
    }
}
