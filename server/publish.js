// groups available to you
Meteor.publish("availableGroups", function() {
	return Groups.find({$or: [{createdBy: this.userId}, {"allowedUsers.userId": this.userId}]});
});

// currently open group
Meteor.publish("currentlyOpenGroup", function(currentGroupId) {
	check(currentGroupId, String);

	return Groups.find({_id: currentGroupId});
});

// publish items that belong to specific group
Meteor.publish("itemsInGroup", function(GroupId) {
	check(GroupId, String);

	return Items.find({belongTo: GroupId});
});

// publish menu (same to all groups)
Meteor.publish("menuItems", function() {
	return Menu.find();
});

