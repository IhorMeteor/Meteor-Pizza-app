Template.users.events({
	"submit .users-form": function (event) {
		event.preventDefault();
		var userEmail = $("[name='users-invite-form']").val();
		var groupId = this._id;
		// check if user exists and invite him to group
		Meteor.call("userExists", userEmail, groupId, function(error){

			if(error){
				alert(error.message);
			}else{
				$("[name='users-invite-form']").val("");
			}

		});  
	},

	"click .times": function(){
		var groupId = this.group;

		if(Groups.find({_id: groupId, createdBy: Meteor.userId()}).count()){ 	
			Meteor.call("deleteUser", this.email, groupId, function(error){

				if (error) {
					alert(error.message);
				}

			});
		}
	}

});


Template.users.helpers({
	"userInGroup": function(){
		var groupId = this._id;
		return Groups.find({_id: groupId});
	},
	
	"owner": function(){
    if(this.createdBy == Meteor.userId()){
      return true;
    }
  }
});