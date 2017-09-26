angular.module('collegechatApp')
  .factory('Topics', function($firebaseArray){
    var ref = firebase.database().ref('topics');
    var topics = $firebaseArray(ref);

    return topics;
  });