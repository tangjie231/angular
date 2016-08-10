/**
 * Created by jie.tang on 2015/12/15.
 */
require.config({
    baseUrl:'../js',
    paths:{
        jquery:'lib/jquery',
        angular:'lib/angular.min',
        uiBootstrapTpls:'lib/ui-bootstrap-tpls-1.1.2',
        angularCookies:'lib/angular-cookies.min',
        app:"app",
        laydate: 'lib/laydate',
        dateExtends:'lib/date-extends'
    },
    shim:{
        'angular':{
            deps:["jquery"],
            'exports':'angular'
        },
        'uiBootstrapTpls':{
            deps:['angular'],
            'exports':'uiBootstrapTpls'
        },
        angularCookies: {
        	deps:['angular'],
        	exports:'angularCookies'
        },
        laydate: {
        	deps:['jquery'],
        	exports:'laydate'
        },
        dateExtends:{
            exports:'dateExtends'
        }
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});
 
require([
    'app',
    'angular',
    'uiBootstrapTpls',
    'angularCookies',
    'dateExtends',
    'ctrls/calCtrl',
    'directives/periodCalDirective',
    'filter/weekDisFilter'
    ],function(app,angular){
    angular.element().ready(function() {
        angular.bootstrap(document, ['app']);
    });

});

