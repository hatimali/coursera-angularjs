(function () {
'use-strict';

angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems",foundItemsDirective)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");


    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundList.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;
        list.isEmpty = function() {
            return list.found != undefined && list.found.length === 0;
        }
    }

    NarrowItDownController.$inject = ['$http', 'MenuSearchService'];
    function NarrowItDownController($http, MenuSearchService){
        var list = this;
        list.searchItem = "";
        list.IsVisible = false;
        list.narrowItDown = function () {
            list.IsVisible = true;
            if(list.searchItem == "") {
                list.items = [];
                return;
            }

            var promise = MenuSearchService.getMatchedMenuItems(list.searchItem);
            promise.then(function (response) {
                   list.items = response;
            })
            .catch(function (error){
                console.log("Something went wrong", error);
            });
        };

        list.removeItem = function (itemIndex) {
            list.items.splice(itemIndex , 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        service.getMatchedMenuItems = function (searchItem) {
            var foundItems = [];
            return $http({
                method: "GET",
                url: (ApiBasePath + '/menu_items.json')
            }).then(function (response) {

                var menuItems = response.data.menu_items;

                for (var i = 0; i < menuItems.length; i++) {
                    if (menuItems[i].description.includes(searchItem)) {
                        foundItems.push(menuItems[i]);
                    }
                }

                // return found items
                return foundItems;
            }).catch(function (error) {
                console.log("Something went terribly wrong.");
            });

        };
    }

}());