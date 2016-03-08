import SdkCore from './sdk/sdk.core';
import SdkCrypt from './sdk/sdk.crypt';
import SdkDb from './sdk/sdk.db';
import SdkUser from './sdk/sdk.user';

export var core: SdkCore = new SdkCore();
export var crypt: SdkCrypt = new SdkCrypt();
export var db: SdkDb = new SdkDb();
export var user: SdkUser = new SdkUser();
