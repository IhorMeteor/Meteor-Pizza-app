Template.users.events({
	"submit .users-form":function (event) {

		event.preventDefault();
		var user = $("[name='users-invite-form']").val();
		var groupId = this._id;
		Meteor.call("userExists",user,groupId,function(error){
			if(error){
				alert(error.message);
			}
			else{
				$("[name='users-invite-form']").val("");
			}
		});
		
	  
	  	
	  
	},

	"click .times":function(){
		event.preventDefault();
		var currentEmail = this.email;
		var currentUser = Meteor.userId();
		var groupId = this.group;
		if(Groups.find({"_id":groupId,"createdBy":currentUser}).count()){ 
		
		Meteor.call("deleteUser",currentEmail,groupId,function(error){
			if (error) {
				alert(error.message);
			}
		});
		}
	}
});


Template.users.helpers({
	"userInGroup":function(){
		var groupId = this._id;
		return Groups.find({"_id":groupId});
	},
	"owner":function(){
    var currentUser = Meteor.userId();
    if(this.createdBy == currentUser){
      return true;
    }
  }
});