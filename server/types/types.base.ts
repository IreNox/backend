import expressSession = require('express-session');
import modelUser = require('../models/model.user');
import typesRest = require('../types/types.rest')

export class SessionData {
	public user_id: typesRest.RestUserId;
	public user: modelUser.User;
}
