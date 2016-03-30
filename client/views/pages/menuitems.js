Template.menuitems.onCreated(function() {
	this.subscribe("menuItems");
});

Template.menuitems.helpers({
	"menuItems": function() {
		return Menu.find();
	}
});


Template.menuitems.events({
	"click .btn-default": function() {
		Meteor.call("orderItem", this.name, this.price, Router.current().params._id);
	}
});