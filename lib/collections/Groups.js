Groups = new Meteor.Collection("groups");

Groups.allow({
	insert: function() {
		return Meteor.user();
	},
	update: function(userId, doc) {
		return ownsDocument(userId, doc);
	},
	remove: function(userId, doc) {
		return ownsDocument(userId, doc);
	}
});



Meteor.methods({
	"userExists": function (userEmail, groupId) {
		check(userEmail, String);
		check(groupId, String);

		if(Meteor.isServer){ 
			var userObject = Accounts.findUserByEmail(userEmail);
		  //check if user exists and add him to group invited array (allowedUsers);
			if(userObject){
				Groups.update(groupId, {$addToSet: {allowedUsers: {email: userEmail, userId: userObject._id, group: groupId}}});
			}else{
				throw new Meteor.Error("No such user", "Invalid email address");
			}
	  }
	},

	//delete user from invited users
	"deleteUser": function(userEmail, groupId){
		check(userEmail, String);
		check(groupId, String);

		Groups.update({_id: groupId}, {$pull: {allowedUsers: {email: userEmail}}});
	},
	//Group creation
	"groupCreate": function(groupName) {
		check(groupName, String);

		Groups.insert({
			name: groupName,
			createdBy: this.userId,
			createdAt: new Date(),
			allowedUsers: [],
			selected: false
		});

	},
	// Delete group
	"deleteGroup": function(selectedGroupId) {
		check(selectedGroupId, String);

		Groups.remove(selectedGroupId);
	},
	//only owner can select his group
	"makeElementSelected": function(documentId, selected, createdBy) {
		check(documentId, String);
		check(selected, Boolean);
		check(createdBy, String);

		var userSelected = selected ? false : true;
		if(this.userId == createdBy){ 	
			Groups.update(documentId, {$set: {selected: userSelected}});				
		}
	},
	
	// saving group description
	"groupDescription": function(documentId, description) {
		check(documentId, String);
		check(description, String);

		var result = Groups.update({_id:documentId, createdBy: this.userId}, {$set: {describe: description}});
		if(!result){
			throw new Meteor.Error("Only for group owners", "Only owner can discribe his group");
		}
	}

});

