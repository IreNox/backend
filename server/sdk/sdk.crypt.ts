import * as crypto from 'crypto';

const hashAlgo: string = 'md5';
const hashSize: number = 128 / 8;

export default class SdkCypt {
    hash(str: string): string {
        return crypto.createHmac(hashAlgo, str).digest('hex');
    }

    create_salt(): string {
        return crypto.randomBytes(hashSize).toString('hex');
    }

    salt(password: string, salt: string): string {
        return this.hash(password + salt)
    }
}
