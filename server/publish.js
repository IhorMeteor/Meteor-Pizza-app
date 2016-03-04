Meteor.publish("groups",function () {
	return Groups.find();
});

Meteor.publish("items",function () {
	return Items.find();
});