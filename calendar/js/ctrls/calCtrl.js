define([
    'app'
], function(app) {
    'use strict';
    app.controller('CalCtrl',['$scope',function($scope) {
        $scope.dto = {};
        
        $scope.calendar = {
            beginDate: "2016-08-10",
            endDate:"2016-08-31",
            weekPeriod:"0011111",
        };

        $scope.changeDate = function() {
            $scope.calendar = {
                beginDate: "2016-08-16",
                endDate:"2016-08-31",
                weekPeriod:"0011111",
            };
        }

    }]);

    return app;
});