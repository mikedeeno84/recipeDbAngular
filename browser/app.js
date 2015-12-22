var app = angular.module('barnecue',['ui.router'])
app.config(function($urlRouterProvider){
	$urlRouterProvider.when('', '/')
});