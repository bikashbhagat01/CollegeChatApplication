angular.module('collegechatApp')
  .controller('MessagesCtrl', function(profile, topicName, messages){
    var messagesCtrl = this;

    messagesCtrl.messages = messages;
	messagesCtrl.topicName = topicName;

	messagesCtrl.message = '';

	messagesCtrl.sendMessage = function (){
		  if(messagesCtrl.message.length > 0){
		    messagesCtrl.messages.$add({
		      uid: profile.$id,
		      body: messagesCtrl.message,
		      timestamp: firebase.database.ServerValue.TIMESTAMP
		    }).then(function (){
		      messagesCtrl.message = '';
		    });
		  }
		};
	
  });