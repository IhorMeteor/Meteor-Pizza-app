Template.groups.helpers({
	"showForm":function(){
		return Session.get("createForm");
	},
	"itemsTrue":function(){
		 var currentUser = Meteor.userId();
		if (Groups.find({$or :[{createdBy:currentUser},{"allowedUsers.userId":currentUser}]}).count()) {
			return false;
		}else{
			return true;
		}
	},
	"checked":function(){
		if(Session.get("onCheck")){ 
		return "checked";
		}
	}
});


Template.groups.events({
	"click .create-group":function (event) {
		event.preventDefault();
		Session.set("createForm",true);
		},
	"submit .group-form":function(event){
		event.preventDefault();
		var groupName = $("[name='name']").val();
		var currentUser = Meteor.userId();
		Groups.insert({
			name:groupName,
			createdBy:currentUser,
			createdAt:new Date(),
			allowedUsers:[]

		});
		Session.set("createForm",false);
		Router.go("/groups");
	},
	"click .remove-button":function(){
		var selected = Groups.findOne({selected:true});
		if(selected.createdBy == Meteor.userId() ){
		if(selected){
		Groups.remove(selected._id);
		 }
		}else{
			alert("You can remove only your groups");
		}
	},

	"change [name='invit']":function(event){
		event.preventDefault();
		Session.set("onCheck",event.target.checked);

	}
});