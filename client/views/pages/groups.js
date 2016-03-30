Template.groups.onCreated(function() {
	this.createGroupForm = new ReactiveVar(false);
});



Template.groups.helpers({
	"showForm": function(){
		return Template.instance().createGroupForm.get();
	},

	"itemsTrue": function(){
		if (Groups.find().count()) {
			return false;
		}else{
			return true;
		}
	},

	"checked": function(){
		if(Session.get("onCheck")){ 
			return "checked";
		}
	}
});


Template.groups.events({
	// click to make group creation form visible
	"click .create-group": function (event, template) {
		template.createGroupForm.set(true);
	},
	// create your own group
	"submit .group-form": function(event, template){
		event.preventDefault();
		var groupName = $("[name='name']").val();
		
		Meteor.call("groupCreate", groupName);
		template.createGroupForm.set(false);
		Router.go("/groups");
	},
	// remove your own group
	"click .remove-button": function(){
		var selected = Groups.findOne({selected:true});
		if(selected.createdBy == Meteor.userId()){

			if(selected)
				Meteor.call("deleteGroup", selected._id);

		}else{
			alert("You can remove only your groups");
		}
	},

	"change [name='invit']": function(event){
		Session.set("onCheck", event.target.checked);

	}
});