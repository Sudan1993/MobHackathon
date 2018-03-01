angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout , $rootScope) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('RestaurantCtrl', function($scope,$rootScope,httpService,$ionicModal) {
  
$scope.myModel = {};

$scope.getData = function(searchTerm){ 
    httpService.invokeZomato(searchTerm).then(function(response){
      //alert(JSON.stringify(response));
      $rootScope.data = response.data.location_suggestions;
        $scope.showDetails = true; 
  
    });
  };

  $ionicModal.fromTemplateUrl('templates/RestaurantDetails.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  $scope.getDetails = function(itemClicked){ 
   
    httpService.invokeLocationDetails(itemClicked.entity_id,itemClicked.entity_type).then(function(response){
      alert(JSON.stringify(response));
      $scope.loginData={'popularity':response.data,'bestrestaurants':response.data.best_rated_restaurant};       
     $scope.modal1.show();
    });
  };

  })

.controller('PlaylistsCtrl', function($scope,$rootScope) {

$rootScope.bookingDetails = 
{
   "BookingStatus":"Confirmed",
   "PNR":"VQ3RYQ",
   "BookingContacts":{
      "BookingContact":[
         {
            "OtherPhone":"9999999999",
            "EmailAddress":"sudarcool.prabu36@gmail.com",
            "HomePhone":"00000000000",
            "WorkPhone":null,
            "Name":{
               "MiddleName":null,
               "FirstName":"XXX",
               "Title":"MR",
               "LastName":"XXXX"
            }
         }
      ]
   },
   "BookingPassengers":{
      "BookingPassenger":[
         {
            "Infant":false,
            "PaxPriceType":{
               "PaxType":"ADULT"
            },
            "PassengerFees":null
         },
         {
            "Infant":false,
            "PaxPriceType":{
               "PaxType":"ADULT"
            },
            "PassengerFees":null
         },
         {
            "Infant":true,
            "PaxPriceType":{
               "PaxType":"CHILD"
            },
            "PassengerFees":123
         }
      ]
   },
   "JourneyServices":{
      "JourneyService":[
         {
            "Segments":{
               "Segment0":[
                  {
                     "DepartureStation":"CHENNAI",
                     "ArrivalStation":"BANGALORE",
                     "FlightDesignator":{
                        "FlightNumber":"XXXX123"
                     },
                     "DepartureTime":"2017-03-07T13:30:00",
                     "ArrivalTime":"2017-03-07T14:40:00"
                  }
               ],
               "Segment1":[
                  {
                     "DepartureStation":"BANGALORE",
                     "ArrivalStation":"SINGAPORE",
                     "FlightDesignator":{
                        "FlightNumber":"XXXX345"
                     },
                     "DepartureTime":"2017-03-07T20:30:00",
                     "ArrivalTime":"2017-04-07T05:40:00"
                  }
               ]
            }
         }
      ]
   }
}
  
})

.controller('PlaylistCtrl', function($scope, $stateParams,httpService,$ionicLoading,$rootScope) {

  $scope.myModel = {};

  $scope.getData = function(searchTerm){ 
    httpService.invokeAjax(searchTerm).then(function(response){
      $rootScope.data = response.data.data;
        $scope.showDetails = true;     
      //$rootScope.data.request[0].query = address;
      //alert($rootScope.data);
  
    });
  };

  $scope.customMarkers = [{
    lat: 43.07493,
    lng: -89.381388
  }];

  var bengauluru = {lat:12.977878559628712,lng:77.57231712341309}

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
    marker = new google.maps.Marker({
              position: bengauluru,
              map: map
            });
    $scope.centerOnMe();
  });

  
  var marker;

  $scope.centerOnMe= function(){
  $scope.positions = [];
    
    
    $ionicLoading.show({
      template: 'Loading...'
    });

//$cordovaGeolocation.getCurrentPosition(function(position) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.centerOnMe = {};
      $scope.centerOnMe.latitude = position.coords.latitude;
      $scope.centerOnMe.longitude = position.coords.longitude;
      var myLatlng = new google.maps.LatLng(parseFloat(position.coords.latitude),parseFloat(position.coords.longitude));
      marker.setPosition(myLatlng);

      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.positions.push({lat: pos.k,lng: pos.B});
      console.log(pos);
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
      google.maps.event.addListener($scope.map, "click", clickHandler);
    });

  };
  var geocoder = new google.maps.Geocoder;
  function clickHandler(e){    
  $scope.showDetails = true;     
              bengauluru.lat = e.latLng.lat();
              bengauluru.lng = e.latLng.lng();              
              marker.setPosition(e.latLng);
       
              geocoder.geocode({'location': e.latLng}, function(results, status) {
                  address = results[0].formatted_address;   
                  var latLong = e.latLng.toString();
                  $scope.getData(latLong.replace(/[()]/g, ''));
              });                   
        } 

});
