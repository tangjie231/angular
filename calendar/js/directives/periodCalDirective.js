/**
 * 关于laydate日历控件加载以及对于符合每周配送安排的订单日期的展示
 */
define(["app","../comm/dateUtils"],function(app,dateUtils){
    app.directive("periodCal",function(){
        return {
            restrict:'A',
			require: ['periodCal','ngModel'],
            scope:{
                beginDateStr:'=',
                endDateStr:'=',
                weekPeriod:'='
            },
            template:'<table class="marL calendar" style="float:none;margin-bottom:25px;">'+
                        '<tbody>'+
                        '<tr>'+
                            '<th>{{viewWeek[0]|weekDisFilter}}<input type="checkbox" ng-click="checkWeek($event)" index="{{viewWeek[0].getDay()}}" ng-disabled="isWeekDisable(viewWeek[0].getDay())" /></th>'+
                            '<th>{{viewWeek[1]|weekDisFilter}}<input type="checkbox" ng-click="checkWeek($event)" index="{{viewWeek[1].getDay()}}" ng-disabled="isWeekDisable(viewWeek[1].getDay())" /></th>'+
                            '<th>{{viewWeek[2]|weekDisFilter}}<input type="checkbox" ng-click="checkWeek($event)" index="{{viewWeek[2].getDay()}}" ng-disabled="isWeekDisable(viewWeek[2].getDay())" /></th>'+
                            '<th>{{viewWeek[3]|weekDisFilter}}<input type="checkbox" ng-click="checkWeek($event)" index="{{viewWeek[3].getDay()}}" ng-disabled="isWeekDisable(viewWeek[3].getDay())" /></th>'+
                            '<th>{{viewWeek[4]|weekDisFilter}}<input type="checkbox" ng-click="checkWeek($event)" index="{{viewWeek[4].getDay()}}" ng-disabled="isWeekDisable(viewWeek[4].getDay())" /></th>'+
                            '<th>{{viewWeek[5]|weekDisFilter}}<input type="checkbox" ng-click="checkWeek($event)" index="{{viewWeek[5].getDay()}}" ng-disabled="isWeekDisable(viewWeek[5].getDay())" /></th>'+
                            '<th>{{viewWeek[6]|weekDisFilter}}<input type="checkbox" ng-click="checkWeek($event)" index="{{viewWeek[6].getDay()}}" ng-disabled="isWeekDisable(viewWeek[6].getDay())" /></th>'+
                        '</tr>'+
                        '<tr ng-repeat="trItem in [0,1,2,3]">'+
                            '<td  ng-click="changeCheck($event)" ng-class="{bg:changeDayClass(trItem*7+tdItem)}" ng-repeat="tdItem in [0,1,2,3,4,5,6]" data.date.index="{{trItem*7+tdItem}}">{{viewDate[trItem*7+tdItem]|date:\'d\'}}</td>'+
                        '</tr>'+
                        '<tr>'+
                            '<td  ng-click="changeCheck($event)" ng-class="{bg:changeDayClass(tdItem)}" ng-repeat="tdItem in [28,29,30]" data.date.index="{{tdItem}}">{{viewDate[tdItem]|date:\'d\'}}</td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                        '</tr>'+
                        '</tbody>'+
                    '</table>',
            controller:'periodCalCtrl',
            link:function(scope,element,attr,ctrl){
                var ngModelCtrl = ctrl[1];


                //scope.weekPeriod = "1110000";
                ctrl[0].init(ngModelCtrl);

            	
            }
        }
    });

    app.controller("periodCalCtrl",["$scope", function ($scope) {
        $scope.selectDayArrIndex = [];
        $scope.viewDate = [];
        $scope.viewWeek = [];


        this.init = function(ngModelCtrl){
            initCal($scope);

            $scope.changeCheck = function($event){
                var targetTd = angular.element($event.target);
                var selectDayIndex = parseInt(targetTd.attr("data.date.index"));
                var tempSelectDayArr = [];

                //日历中没有勾选的星期
               if(!validateCheck($scope,selectDayIndex)){
                   return
               }

                reCalSelectArr($scope,selectDayIndex);

                $.each($scope.selectDayArrIndex,function(i,item){
                    tempSelectDayArr.push($scope.viewDate[item].format("yyyy-MM-dd"));
                })
                ngModelCtrl.$setViewValue(tempSelectDayArr.join(","));
                ngModelCtrl.$render();
            }

            $scope.$watchGroup(["weekPeriod","beginDateStr","endDateStr"],function(newVal,oldVal){
                if(newVal != oldVal){
                    debugger;
                    var tempSelectDayArr = [];
                    initCal($scope);

                    // $.each($scope.viewDate,function(i,item){
                    //     if(validateCheck($scope,i)){
                    //         tempSelectDayArr.push(item.format("yyyy-MM-dd"));
                    //         $scope.selectDayArrIndex.push(i);
                    //     }

                    // })
                    $(".calendar :checkbox").removeAttr("checked");

                    ngModelCtrl.$setViewValue(tempSelectDayArr.join(","));
                    ngModelCtrl.$render();


                }
            });

            $scope.changeDayClass = function(index){
                return $.inArray(index,$scope.selectDayArrIndex)==-1?false:true;

            }

            /**
             * 更改星期
             */
            $scope.checkWeek = function($event){
                var checked = $event.target.checked;
                var weekIndex = angular.element($event.target).attr("index");
                if(checked){
                    for(var i = 0;i<$scope.viewDate.length;i++){
                        var tempViewDate = $scope.viewDate[i];
                        var tempWeekIndex = tempViewDate.getDay();
                        if(tempViewDate>$scope.endDate || tempViewDate < $scope.beginDate){
                            continue;
                        }

                        if (tempWeekIndex == weekIndex && $.inArray(i, $scope.selectDayArrIndex) == -1) {
                            $scope.selectDayArrIndex.push(i);
                        }
                    }
                }else{
                    for(var i = 0;i<$scope.viewDate.length;i++){
                        var tempViewDate = $scope.viewDate[i];
                        var tempWeekIndex = tempViewDate.getDay();

                        if(tempViewDate>$scope.endDate || tempViewDate < $scope.beginDate){
                            continue;
                        }

                         $scope.selectDayArrIndex = $.map($scope.selectDayArrIndex, function (currIndex) {
                            return (currIndex == i && tempWeekIndex == weekIndex) ? null : currIndex;
                        });
                    }
                }

                 $scope.selectDayArrIndex.sort();
              
            }

            /**
             * 判断是否不可选
             */
              $scope.isWeekDisable = function (index){
                var weekIndexArr = [6,0,1,2,3,4,5];
                if($scope.weekPeriod.charAt(weekIndexArr[index]) == "1"){
                    return false;
                }

                return true;
            }
        }

    }]);

    function validateCheck(scope,selectDayIndex){
        var weekIndexArr = [6,0,1,2,3,4,5];
        var selectDay = scope.viewDate[selectDayIndex];
        var weekIndex = selectDay.getDay();
        if(scope.weekPeriod.charAt(weekIndexArr[weekIndex]) != "1"){
            return false;
        }

        if(selectDay>scope.endDate || selectDay<scope.beginDate){
            return false;
        }
        return true;
    }

    


    function reCalSelectArr(scope,selectDayIndex){
        if ($.inArray(selectDayIndex, scope.selectDayArrIndex) == -1) {
            scope.selectDayArrIndex.push(selectDayIndex);
        }else{
            scope.selectDayArrIndex = $.map(scope.selectDayArrIndex, function (currIndex) {
                return currIndex == selectDayIndex ? null : currIndex;
            });
        }

        scope.selectDayArrIndex.sort();

    }

    function initCal(scope){
        if(!scope.beginDateStr){
            scope.beginDate = new Date();
        }else{
            scope.beginDate = dateUtils.stringToDate(scope.beginDateStr);
        }

        if(!scope.endDateStr){
            scope.endDate = new Date(scope.beginDate).addDays(30);
        }else{
            scope.endDate = dateUtils.stringToDate(scope.endDateStr);
        }

        scope.viewDate = [];
        scope.viewWeek = [];
        scope.selectDayArrIndex = [];

        for(var i=0;i<31;i++){
            var currDate = new Date(scope.beginDate.getTime()).addDays(i);
            scope.viewDate.push(currDate);
            if(i<7){
                scope.viewWeek.push(currDate);
            }
        }

    }


    return app;
});