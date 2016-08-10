define([
    'app'
], function(app) {
    'use strict';
    app.filter("weekDisFilter",function(){
        return function(input) {
            var weekIndexArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
            var index = input.getDay();
            return weekIndexArr[index];
        }
    });
});