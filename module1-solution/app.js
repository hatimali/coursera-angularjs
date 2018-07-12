(function () {
    'use strict';

    angular.module('module1-solution', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchMenu = "";

        $scope.lunchChecker = function(){

            $scope.lunchMenu = getLunchResults($scope.lunchMenu);
        };

        function getLunchResults(lunchItems) {
            var lunchArray = lunchItems.split(",");

            if(lunchItems.length == 0 || !lunchItems || lunchItems == "") {
                $scope.lunchMenu = "Please enter data first";
            }
            else if(lunchArray.length <= 3) {
                $scope.lunchMenu = "Enjoy!";
            }
            else if(lunchArray.length > 3) {
                $scope.lunchMenu = "Too much!";
            }
            return $scope.lunchMenu;
        }
    }

})();