Template.group.helpers({
	"group":function () {
		var currentUser = Meteor.userId();
		if (!Session.get("onCheck")) {
		return Groups.find({$or :[{createdBy:currentUser},{"allowedUsers.userId":currentUser}]},{sort:{createdAt:-1}});
		}else{
		return Groups.find({createdBy:currentUser},{sort:{createdAt:-1}});
		}
	},
	"selected":function(){
		var isSelected = this.selected;
		var currentUser = Meteor.userId();
		var createdById = this.createdBy;
		if(isSelected && createdById == currentUser){
			return "selected";
		}else{
			return "";
		}
	},
	"invited":function(){
		var currentUser = Meteor.userId();
		var groupId = this._id;
		var group = Groups.find({"_id":groupId,"allowedUsers.userId":currentUser}).count();
		if(group){
			return "invited!";
		}
	}
});



Template.group.events({
	"click .thumbnail":function(event){
		if(event.target.tagName.toLowerCase() !== "a"){
		var documentId = this._id;
		var selected = this.selected;
		var currentUser = Meteor.userId();
		var createdById = this.createdBy;
		if(currentUser == createdById){ 
		if(selected){
			Groups.update(documentId, {$set:{selected:false}});
		}else{
			Groups.update(documentId, {$set:{selected:true}});
		}
	}
	 }
	}
});