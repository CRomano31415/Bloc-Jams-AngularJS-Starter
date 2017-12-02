 (function() {
     function config($stateProvider, $locationProvider) {
     	 $locationProvider
        	.html5Mode({
            	 enabled: true, //hashbang URLS disabled
            	 requireBase: false //unrelated
         	});

	    $stateProvider
        	.state('landing', {
            url: '/',
            controller: 'LandingCtrl as landing',
            templateUrl: '/templates/landing.html'
        	})
        	.state('album', {	//another state named album
             url: '/album',
             controller: 'AlbumCtrl as album',
             templateUrl: '/templates/album.html'
         })
 	        .state('collection', {	//another state for collection view
             url: '/collection',
             controller: 'CollectionCtrl as collection',
             templateUrl: '/templates/collection.html'
         });
     }
  angular
         .module('blocJams', ['ui.router'])//module and dependency
         .config(config); 
 })();