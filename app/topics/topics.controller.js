angular.module('collegechatApp')
  .controller('TopicsCtrl', function($state, Auth, Users, profile, topics){
    var topicsCtrl = this;
    topicsCtrl.profile = profile;
	topicsCtrl.topics = topics;

	topicsCtrl.getDisplayName = Users.getDisplayName;
	topicsCtrl.getGravatar = Users.getGravatar;
	
	topicsCtrl.users = Users.all;
	Users.setOnline(profile.$id);

	topicsCtrl.logout = function(){
	  topicsCtrl.profile.online = null;
	  topicsCtrl.profile.$save().then(function(){
	    Auth.$signOut().then(function(){
	      $state.go('home');
	    });
	  });
	};
/* Initializing new topic object*/
	topicsCtrl.newTopic = {
  		name: ''
		};

	topicsCtrl.createTopic = function(){
  	topicsCtrl.topics.$add(topicsCtrl.newTopic).then(function(ref){
    $state.go('topics.messages', {topicId: ref.key});
  });
	};

  });

  /*for adding names of topics only:
   (function(){
    topicsCtrl.newTopic = {
      name: ''
    			};
 		 });*/