Items = new Meteor.Collection("items");

Groups.allow({
	insert: function() {
		return Meteor.user();
	},
	remove: function() {
		return Meteor.user();
	}
});

Meteor.methods({
	//add item to group order list
	"orderItem": function(itemName, itemPrice, groupId) {
		check(itemName, String);
		check(itemPrice, Match.Integer);
		check(groupId, String);

		Items.insert({belongTo: groupId, name: itemName, price: itemPrice, author: Meteor.user().emails[0].address});
	},
	//delete item from order list
	"deleteItem": function(itemId) {
		check(itemId, String);

		Items.remove({_id: itemId});
	},
});