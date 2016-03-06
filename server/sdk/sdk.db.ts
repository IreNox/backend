import mongoose = require('mongoose');

class SdkDb {
	public toId(id: string): mongoose.Types.ObjectId {
		return mongoose.Types.ObjectId.createFromHexString(id);
	}
}
export = SdkDb;