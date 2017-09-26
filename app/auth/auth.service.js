angular.module('collegechatApp')
  .factory('Auth', function($firebaseAuth){
  	var auth = $firebaseAuth();

  	return auth;
  });