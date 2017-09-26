'use strict';

/**
 * @ngdoc overview
 * @name collegechatApp
 * @description
 * # collegechatApp
 *
 * Main module of the application.
 */
angular
  .module('collegechatApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
           requireNoAuth: function($state, Auth){
          return Auth.$requireSignIn().then(function(auth){
          $state.go('topics');
          }, function(error){
             return;
            });
            }
        }

      })
    

      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
           requireNoAuth: function($state, Auth){
          return Auth.$requireSignIn().then(function(auth){
          $state.go('topics');
          }, function(error){
              return;
        });
      }
      }
       
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
           requireNoAuth: function($state, Auth){
          return Auth.$requireSignIn().then(function(auth){
          $state.go('topics');
          }, function(error){
              return;
        });
      }
      }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('topics', {
        url: '/topics',
        controller: 'TopicsCtrl as topicsCtrl',
        templateUrl: 'topics/index.html',
        resolve: {
          topics: function (Topics){
            return Topics.$loaded();
          },
          profile: function ($state, Auth, Users){
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                if(profile.displayName){
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('topics.create', {
          url: '/create',
          templateUrl: 'topics/create.html',
          controller: 'TopicsCtrl as topicsCtrl'
        })
      .state('topics.messages', {
            url: '/{topicId}/messages',
            templateUrl: 'topics/messages.html',
            controller: 'MessagesCtrl as messagesCtrl',

            resolve: {
              messages: function($stateParams, Messages){
                return Messages.forTopic($stateParams.topicId).$loaded();
              },
              topicName: function($stateParams, topics){
                return '#'+topics.$getRecord($stateParams.topicId).name;
              }
            }
          })

      .state('topics.direct', {
            url: '/{uid}/messages/direct',
            templateUrl: 'topics/messages.html',
            controller: 'MessagesCtrl as messagesCtrl',
            resolve: {
              messages: function($stateParams, Messages, profile){
                return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
              },
              topicName: function($stateParams, Users){
                return Users.all.$loaded().then(function(){
                  return '@'+Users.getDisplayName($stateParams.uid);
                });
              }
            }
          });
    
       


    $urlRouterProvider.otherwise('/');
  })


  .config(function(){
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBkpCttxU2GPBIX8eziAK9625NfP0wrPB8",
    authDomain: "collegechat-8ddb6.firebaseapp.com",
    databaseURL: "https://collegechat-8ddb6.firebaseio.com",
    projectId: "collegechat-8ddb6",
    storageBucket: "collegechat-8ddb6.appspot.com",
    messagingSenderId: "441400148915"
  };
  firebase.initializeApp(config);
  })