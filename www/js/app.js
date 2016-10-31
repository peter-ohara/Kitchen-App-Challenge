// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.current', {
    url: '/current',
    views: {
      'tab-current': {
        templateUrl: 'templates/tab-current.html',
        controller: 'CurrentWeekCtrl'
      }
    }
  })
    .state('tab.current-detail', {
      url: '/current/:dayId',
      // templateUrl: 'templates/choose-meals.html',
      views: {
        'tab-current': {
          templateUrl: 'templates/choose-meals.html',
          controller: 'ThisWeeksDetailsCtrl'
        }
      }
    })

  .state('tab.next', {
      url: '/next',
      views: {
        'tab-next': {
          templateUrl: 'templates/tab-next.html',
          controller: 'NextWeekCtrl'
        }
      }
    })
    .state('tab.next-detail', {
      url: '/next/:dayId',
      // templateUrl: 'templates/choose-meals.html',
      views: {
        'tab-next': {
          templateUrl: 'templates/choose-meals.html',
          controller: 'NextWeeksDetailsCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/current');

});



angular.module('starter.directives', [])
.directive('bibble', function($rootScope){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    controller: function($rootScope, $scope,  $ionicPopup, $firebaseAuth) {
      var auth = $firebaseAuth();


      $rootScope.auth = auth;

      // console.log("hello", firebaseUser)


      // any time auth state changes, add the user data to scope
      $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
        $rootScope.firebaseUser = firebaseUser;
      });


      $scope.showLoginPopup = function () {
        $rootScope.firebaseUser = null;
        $scope.error = null;
        $scope.message = null;

        $scope.data = {};

        var myPopup = $ionicPopup.show({
            template: '<input type="email" required ng-model="data.email"> <br> <input type="password" required ng-model="data.password">',
            title: 'Enter Login Details',
            subTitle: 'Please use your meltwater email',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Login</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if (!$scope.data.email) {
                    console.log("Please enter a valid email");
                    //don't allow the user to close unless he enters a valid email
                    e.preventDefault();
                  }
                  if (!$scope.data.password) {
                    console.log("Please enter a valid password");
                    //don't allow the user to close unless he enters a valid password
                    e.preventDefault();
                  } else {
                    return $scope.data;
                  }
                }
              }
            ]
          });

        myPopup.then(function(res) {
            console.log('Signing in with!', res);

            var auth = $firebaseAuth();

            auth
            .$signInWithEmailAndPassword(res.email, res.password)
            .then(function(firebaseUser) {
              $rootScope.firebaseUser = firebaseUser;
              console.log("Signed in as:", firebaseUser.uid);
            })
            .catch(function(error) {
              console.error("Authentication failed:", error);

              // Create a new user
              auth.$createUserWithEmailAndPassword(res.email, res.password)
                .then(function(firebaseUser) {
                  $rootScope.firebaseUser = firebaseUser;
                  $scope.message = "User created with uid: " + firebaseUser.uid;
                }).catch(function(error) {
                  $scope.error = error;
                });
            });

          });
      }  
    },
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<ion-nav-buttons side="primary">' +
    '<button ng-show="firebaseUser === null" class="button" ng-click="showLoginPopup()">Login</button>' +
    '<button ng-hide="firebaseUser === null" class="button" ng-click="auth.$signOut()">Logout</button>' +
    '</ion-nav-buttons>',
    // templateUrl: 'templates/auth-view.html',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      console.log("I was here som");
    }
  };
});