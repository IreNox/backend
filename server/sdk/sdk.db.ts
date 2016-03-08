import * as mongoose from 'mongoose';
import * as typesPage from '../types/types.page';
import * as typesRest from '../types/types.rest';

export default class SdkDb {
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
