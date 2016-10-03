import * as fs from 'fs'
import * as sdk from '../sdk';
import * as modelUser from '../models/model.user';
import * as typesRest from '../types/types.rest';
import * as typesPage from '../types/types.page';

export default class EntitiesPage implements typesPage.Page {
	private entities: typesRest.RestEntity[];

	constructor() {
		
	}

    run(inputData: typesRest.RestItemShopRequest, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
		callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
    }
}
