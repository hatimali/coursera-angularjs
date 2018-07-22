(function () {
   'use-strict';

   angular.module("ShoppingListCheckOff", [])

   .controller("ToBuyController", ToBuyController)
   .controller("AlreadyBoughtController", AlreadyBoughtController)
   .service("ShoppingListCheckOffService", ShoppingListCheckOffService)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyList = this;

        buyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

        buyList.addItemToBoughtList = function(item) {
            buyList.toBuyItems = ShoppingListCheckOffService.addItemToBoughtList(item);
        }
    }

    AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
    function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
        boughtList = this;

        boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = [
            { name: "cookies", quantity: 10 },
            { name: "cakes", quantity: 5 },
            { name: "choclates", quantity: 15 },
            { name: "candy", quantity: 20 },
            { name: "fruits", quantity: 2 }
        ];
        var boughtItems =[];

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.addItemToBoughtList = function(item) {
            console.log("Item recieved !! "+JSON.stringify(item));
            console.log("toBuyItems.length "+toBuyItems.length);

            if(toBuyItems != null && toBuyItems.length > 0){
                var isExists = checkForAlreadyExists(boughtItems, item);
                if(isExists == false){
                    boughtItems.push(item);
                }
                var updatedBuyItems = [];
                for (var i = 0; i < toBuyItems.length; i++) {

                    if (toBuyItems[i].name != item.name) {
                        console.log("toBuyItems.name " + item.name);
                        var updatedBuyItem = {
                            name: toBuyItems[i].name,
                            quantity: toBuyItems[i].quantity
                        };
                        updatedBuyItems.push(updatedBuyItem);
                    }
                }
                toBuyItems = updatedBuyItems;
            }
            return toBuyItems;
        };
    }

    function checkForAlreadyExists(boughtItems, item) {
        if(!!boughtItems) {
            for (var i = 0; i < boughtItems.length; i++) {
                if (boughtItems[i].Name == item.name) {
                    console.log("yes yes!!");
                    return true;
                }
            }
        }
        return false;
    }

})();