// add item to group order list
Template.additem.events({
	"submit .item-form": function (event) {
		event.preventDefault();
		var itemPrice = parseInt($("[name='item-price']").val());
		var itemName = $("[name='item-name']").val();
		
		Meteor.call("orderItem", itemName, itemPrice, this._id);
		$("[name='item-name']").val("");
		$("[name='item-price']").val("");
		
			
		
	}
});