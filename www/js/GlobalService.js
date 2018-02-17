angular.module('starter.services.httpService', [])

.factory('httpService',function($q,$http,$ionicLoading,$ionicPopup,$state) {

	return {
	invokeAjax:function(data) {
		var deferred=$q.defer();
        var self=this;
		$http.defaults.headers.post["Content-Type"]="application/json";
	      var res = $http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx?q='+data+'&format=json&key=6aacf8851d6b4c3699184223180501');  
	      var showAlert = function()
		    {
		      var alertPopup = $ionicPopup.alert
		      ({
		         title: "<center>Service Unavailable.</center>",
		         template: "<center>Please check your internet connection</center>"
		      });
		    };

	      res.success(function(data, status, headers, config) {
	        deferred.resolve({"data":data,"status":status,"headers":headers});
	      });

	      res.error(function(data, status, headers, config) {	        
	        if(status===0 || data===null )
	          showAlert();
	        else
	          deferred.resolve({"data":data,"status":status,"headers":headers});

	      });

		return deferred.promise;
	},
		invokeZomato:function(data) {
		var deferred=$q.defer();
        var self=this;
        $http.defaults.headers.post["Content-Type"]="application/json";
        var config = {headers:  {
		        'user-key': '8c2568664236474a7c61aacf1ae491ad',
		    }
		};
	
	      var res = $http.get('https://developers.zomato.com/api/v2.1/locations?query=bengaluru&count=10',config);  
	      var showAlert = function()
		    {
		      var alertPopup = $ionicPopup.alert
		      ({
		         title: "<center>Service Unavailable.</center>",
		         template: "<center>Please check your internet connection</center>"
		      });
		    };

	      res.success(function(data, status, headers, config) {
	        deferred.resolve({"data":data,"status":status,"headers":headers});
	      });

	      res.error(function(data, status, headers, config) {	        
	        if(status===0 || data===null )
	          showAlert();
	        else
	          deferred.resolve({"data":data,"status":status,"headers":headers});

	      });

		return deferred.promise;
	}
	};
});