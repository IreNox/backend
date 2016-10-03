import * as fs from "fs";
import * as sdk from "../sdk";
import * as modelUser from "../models/model.user";
import * as typesRest from "../types/types.rest";
import * as typesPage from "../types/types.page";

export default class ItemShopPage implements typesPage.Page {
	private items: typesRest.RestShopItem[];

	constructor() {
		var data: any = JSON.parse(fs.readFileSync("data/shop_items.json", "utf8"));
		this.items = data.items;
		this.items.forEach(i => i.id = i.id.toString());
	}

    run(inputData: typesRest.RestItemShopRequest, sessionData: typesPage.SessionData, callback: typesPage.RestCallback): void {
		var itemShopPage = this;

        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        } else if (inputData.action === typesRest.RestItemShopAction.GetList) {
			var items = itemShopPage.items;
			items.forEach(i => i.bought = (sessionData.user.items.indexOf(i.id) >= 0));
			callback(new typesRest.RestItemShopGetListResult(items));
        } else if (inputData.action === typesRest.RestItemShopAction.Get && inputData.id) {
			var items: typesRest.RestShopItem[] = itemShopPage.items.filter(i => i.id === inputData.id);
			if (items.length === 1) {
				items[0].bought = (sessionData.user.items.indexOf(items[0].id) >= 0);
				callback(new typesRest.RestItemShopGetResult(items[0]));
			} else {
				callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
			}
        } else if (inputData.action == typesRest.RestItemShopAction.Buy && inputData.id) {
			var items = itemShopPage.items.filter((i: typesRest.RestShopItem) => i.id == inputData.id);
			if (items.length == 1) {
				var item = items[0];
				if (sessionData.user.items.indexOf(item.id) >= 0) {
					callback(new typesRest.RestResult(typesRest.RestResultType.AlreadyInList));
				} else if (item.value > sessionData.user.gems) {
					callback(new typesRest.RestResult(typesRest.RestResultType.NotEnoughGems));
				} else {
					modelUser.model.findById(sessionData.user.id, function (err, currentUser: modelUser.User) {
						currentUser.gems -= item.value;
						currentUser.items.push(item.id);
						sdk.user.saveUser(currentUser, sessionData, function (result: typesRest.RestResultType) {
							callback(new typesRest.RestResult(result));
						});
					});
				}				
			} else {
				callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
			}
		} else {
			callback(new typesRest.RestGetUserResult(sessionData.user));
        }
    }
}
