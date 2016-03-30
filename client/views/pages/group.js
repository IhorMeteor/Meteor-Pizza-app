Template.group.helpers({
	"group": function () {
		var currentUser = Meteor.userId();
		if (!Session.get("onCheck")) {
			return Groups.find({$or: [{createdBy: currentUser}, {"allowedUsers.userId": currentUser}]}, {sort: {createdAt:-1}});
		}else{
			return Groups.find({createdBy: currentUser}, {sort: {createdAt: -1}});
		}
	},

	"selected": function(){
		if(this.selected && this.createdBy == Meteor.userId()){
			return "selected";
		}else{
			return "";
		}
	},

	"invited": function(){
		var groupId = this._id;
		var group = Groups.find({_id: groupId, "allowedUsers.userId": Meteor.userId()}).count();
		if(group){
			return "invited!";
		}
	}
});


//You can select only your groups
Template.group.events({
	"click .thumbnail": function(event){
		if(event.target.tagName.toLowerCase() !== "a"){

			//make element selected
			Meteor.call("makeElementSelected", this._id, this.selected, this.createdBy);
			
	  }
	}
});