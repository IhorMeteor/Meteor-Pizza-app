Meteor.methods({
	"userExists":function (user,groupId) {
		var userIden = Accounts.findUserByEmail(user);
		if(Accounts.findUserByEmail(user)){
		Groups.update(groupId,{$addToSet:{allowedUsers:{email:user,userId:userIden._id,group:groupId} }});
		}else{
			throw new Meteor.Error("No such user","Invalid email address");
		}
	},


	"deleteUser":function(currentEmail,groupId){
		Groups.update({"_id":groupId},{$pull:{allowedUsers:{"email":currentEmail}}} );
	}

	
});