var app = angular.module('barnecue',['ui.router', 'ngMaterial', 'ngAria', 'ngMessages', 'ngRoute', 'ngAnimate']);

app.config(function($urlRouterProvider, $locationProvider, $mdThemingProvider){
	
	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');
 
 $mdThemingProvider.theme('default')
 	.primaryPalette('red',{
 		'default':'500',
 		'hue-1': '100',
 		'hue-2': '600',
 		'hue-3': 'A100'
 	})
 	.accentPalette('yellow')
});

