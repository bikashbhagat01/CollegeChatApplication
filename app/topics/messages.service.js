angular.module('collegechatApp')
  .factory('Messages', function($firebaseArray){
    var topicMessagesRef = firebase.database().ref('topicMessages');
    var userMessagesRef = firebase.database().ref('userMessages');

   
    
    return {
		  forTopic: function(topicId){
		    return $firebaseArray(topicMessagesRef.child(topicId));
		  },
		  /*Direct Messaging between 2 Users*/
		  forUsers: function(uid1, uid2){
		    var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

		    return $firebaseArray(userMessagesRef.child(path));
		  }
		};

  });
