"use strict";
const fs = require("fs");
const sdk = require("../sdk");
const modelUser = require("../models/model.user");
const typesRest = require("../types/types.rest");
class ItemShopPage {
    constructor() {
        var data = JSON.parse(fs.readFileSync("data/shop_items.json", "utf8"));
        this.items = data.items;
        this.items.forEach(i => i.id = i.id.toString());
    }
    run(inputData, sessionData, callback) {
        var itemShopPage = this;
        if (!sessionData.user) {
            callback(new typesRest.RestResult(typesRest.RestResultType.NotLoggedin));
        }
        else if (inputData.action === typesRest.RestItemShopAction.GetList) {
            var items = itemShopPage.items;
            items.forEach(i => i.bought = (sessionData.user.items.indexOf(i.id) >= 0));
            callback(new typesRest.RestItemShopGetListResult(items));
        }
        else if (inputData.action === typesRest.RestItemShopAction.Get && inputData.id) {
            var items = itemShopPage.items.filter(i => i.id === inputData.id);
            if (items.length === 1) {
                items[0].bought = (sessionData.user.items.indexOf(items[0].id) >= 0);
                callback(new typesRest.RestItemShopGetResult(items[0]));
            }
            else {
                callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
            }
        }
        else if (inputData.action == typesRest.RestItemShopAction.Buy && inputData.id) {
            var items = itemShopPage.items.filter((i) => i.id == inputData.id);
            if (items.length == 1) {
                var item = items[0];
                if (sessionData.user.items.indexOf(item.id) >= 0) {
                    callback(new typesRest.RestResult(typesRest.RestResultType.AlreadyInList));
                }
                else if (item.value > sessionData.user.gems) {
                    callback(new typesRest.RestResult(typesRest.RestResultType.NotEnoughGems));
                }
                else {
                    modelUser.model.findById(sessionData.user.id, function (err, currentUser) {
                        currentUser.gems -= item.value;
                        currentUser.items.push(item.id);
                        sdk.user.saveUser(currentUser, sessionData, function (result) {
                            callback(new typesRest.RestResult(result));
                        });
                    });
                }
            }
            else {
                callback(new typesRest.RestResult(typesRest.RestResultType.NotFound));
            }
        }
        else {
            callback(new typesRest.RestGetUserResult(sessionData.user));
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ItemShopPage;
//# sourceMappingURL=page.itemshop.js.map