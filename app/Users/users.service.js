angular.module('collegechatApp')
  .factory('Users', function($firebaseArray, $firebaseObject){

    var usersRef = firebase.database().ref('users');
    var connectedRef = firebase.database().ref('.info/connected');
    var users = $firebaseArray(usersRef);

    var Users = {
  		getProfile: function(uid){
    		return $firebaseObject(usersRef.child(uid));
 			},
      /*hELPER FUNCTION FOR DISPLAY NAME AND USERTYPE*/
  		getDisplayName: function(uid){
    		return users.$getRecord(uid).displayName;
  			},
        setOnline: function(uid){
            var connected = $firebaseObject(connectedRef);
            var online = $firebaseArray(usersRef.child(uid+'/online'));

            connected.$watch(function (){
              if(connected.$value === true){
                online.$add(true).then(function(connectedRef){
                  connectedRef.onDisconnect().remove();
                });
              }
            });
          },
  		getGravatar: function(uid){
			return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
			},
  		all: users
		};

    return Users;
  });