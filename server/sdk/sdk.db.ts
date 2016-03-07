import mongoose = require('mongoose');
import typesPage = require('../types/types.page');
import typesRest = require('../../shared/types/types.rest');

class SdkDb {
	public toId(id: string): mongoose.Types.ObjectId {
		return mongoose.Types.ObjectId.createFromHexString(id);
	}

	public checkError(err: any, callback: typesPage.RestCallback): boolean {
		if (err) {
			console.log('Database error: ' + err);
			callback(new typesRest.RestResult(typesRest.RestResultType.DatabaseError));

			return false;
		}

		return true;
	}
}
export = SdkDb;