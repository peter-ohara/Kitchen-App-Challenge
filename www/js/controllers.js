angular.module('starter.controllers', [])

.controller('CurrentWeekCtrl', function($scope,  $firebaseArray) {
  var ref = firebase.database().ref().child("currentWeek");
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.days = $firebaseArray(ref);
})

.controller('NextWeekCtrl', function($scope,  $firebaseArray) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var ref = firebase.database().ref().child("nextWeek");
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.days = $firebaseArray(ref);
})


.controller('ThisWeeksDetailsCtrl', function($scope, $state, $stateParams, $firebaseObject) {

  var ref = firebase.database().ref().child("currentWeek").child($stateParams.dayId);

  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "menu");

  var days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  }

  $scope.title = days[$stateParams.dayId];


  $scope.options = {
    loop: false,
    // effect: 'fade',
    // speed: 500,
  }

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });

})





.controller('NextWeeksDetailsCtrl', function($scope, $state, $stateParams, $firebaseObject) {

  var ref = firebase.database().ref().child("nextWeek").child($stateParams.dayId);
  
  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "menu");

  var days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  }

  $scope.title = days[$stateParams.dayId];


  $scope.options = {
    loop: false,
    // effect: 'fade',
    // speed: 500,
  }

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });

});
