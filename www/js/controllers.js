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

.controller('RestaurantCtrl', function($scope,$rootScope,httpService) {
  $scope.getData = function(searchTerm){
    $scope.zomatoApi();
  };
   $scope.myModel = {};
  
$scope.zomatoApi = {
    "location_suggestions": [
        {
            "entity_type": "city",
            "entity_id": 4,
            "title": "Bangalore",
            "latitude": 12.971606,
            "longitude": 77.594376,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "group",
            "entity_id": 1992,
            "title": "Bengaluru Marriott Hotel Whitefield, Bangalore",
            "latitude": 12.9790579876,
            "longitude": 77.727449052,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "zomato_place",
            "entity_id": 99258,
            "title": "Bengaluru - Mangaluru Highway, Peenya II Phase, Bangalore",
            "latitude": 13.03729385,
            "longitude": 77.522398375,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "group",
            "entity_id": 40130,
            "title": "VR Bengaluru, Whitefield, Bangalore",
            "latitude": 12.9966520355,
            "longitude": 77.695222646,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "group",
            "entity_id": 41725,
            "title": "Conrad Bengaluru, Ulsoor, Bangalore",
            "latitude": 12.975249,
            "longitude": 77.62069,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "group",
            "entity_id": 854,
            "title": "Novotel Bengaluru Techpark, Marathahalli, Bangalore",
            "latitude": 12.9295270052,
            "longitude": 77.6833961159,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "group",
            "entity_id": 978,
            "title": "Casa de Bengaluru, Koramangala, Bangalore",
            "latitude": 12.9362248335,
            "longitude": 77.6223148406,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "group",
            "entity_id": 2022,
            "title": "Radha Regent Bengaluru, Electronic City, Bangalore",
            "latitude": 12.8363858304,
            "longitude": 77.6616092026,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "group",
            "entity_id": 3108,
            "title": "JW Marriott Bengaluru, Lavelle Road, Bangalore",
            "latitude": 12.971681,
            "longitude": 77.595208,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        },
        {
            "entity_type": "group",
            "entity_id": 6158,
            "title": "Aloft Bengaluru Cessna Business Park, Bellandur, Bangalore",
            "latitude": 12.9374070729,
            "longitude": 77.6935704052,
            "city_id": 4,
            "city_name": "Bangalore",
            "country_id": 1,
            "country_name": "India"
        }
    ],
    "status": "success",
    "has_more": 0,
    "has_total": 0
};
$scope.data = $scope.zomatoApi.location_suggestions;
  httpService.invokeZomato('bengaluru').then(function(response){
      $rootScope.data = response.data.data;
        $scope.showDetails = true;     
      //alert($rootScope.data);
  
    });
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
