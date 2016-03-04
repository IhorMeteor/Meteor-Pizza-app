Template.additem.events({
	"submit .item-form":function (event) {
		event.preventDefault();
		Session.set("showItemForm",false);
		var itemPrice = $("[name='item-price']").val();
		var itemName = $("[name='item-name']").val();
		var groupId = this._id;
		
		Items.insert({"belongTo":groupId,"name":itemName,"price":itemPrice,"author":Meteor.user().emails[0].address});

		
	
		

	}

});