import SdkCrypt = require('./sdk/sdk.crypt');
import SdkDb = require('./sdk/sdk.db');
import SdkUser = require('./sdk/sdk.user');

export var crypt: SdkCrypt = new SdkCrypt();
export var db: SdkDb = new SdkDb();
export var user: SdkUser = new SdkUser();
