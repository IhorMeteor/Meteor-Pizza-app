Template.groupedit.onCreated(function() {
  this.showAddItemForm = new ReactiveVar(false);
  this.showMenuItems = new ReactiveVar(false);
});



Template.groupedit.events({
  // update the text of the group description on keypress but throttle the event to ensure
  // we don't flood the server with updates (handles the event at most once 
  // every 300ms)
  "keyup [name=describe]": _.throttle(function(event){

    if(event.which == 13 || event.which == 27){
      $(event.target).blur();
    }else{
      var description = $(event.target).val();
      Meteor.call("groupDescription", this._id, description, function(error) {
        if (error) { alert(error.message); }
      });

    }
    $(event.target).val(this.describe);
    
    
  }, 300),

  "click .button-invite": function(){
    $("[name='users-invite-form']").focus();
  },

  "click .button-add-item": function(event, template) {
    template.showAddItemForm.set(true);
    template.showMenuItems.set(false);
  },

  "click .button-menu-items": function(event, template){
    template.showAddItemForm.set(false);
    template.showMenuItems.set(true);
  },

  "click .button-group-home": function(event, template) {
    template.showAddItemForm.set(false);
    template.showMenuItems.set(false);
  },

  // remove item from order button
  "click .btn-danger": function(){
    if(this.author == Meteor.user().emails[0].address){
      Meteor.call("deleteItem", this._id);
    }else{
      alert("You can delete only your items in order list");
    }

  }
});

Template.groupedit.helpers({
  // show form or menu
  "showFormItem": function(event){
    return Template.instance().showAddItemForm.get() || Template.instance().showMenuItems.get();
  },

  "items": function(){
    var GroupId = this._id;
    return Items.find({belongTo: GroupId});
  },

  "noItems": function(){
    var GroupId = this._id;
    if(!Items.find({belongTo: GroupId}).count()){
      return "Currently no orders...";
    }
  },

  "sum": function(){
    var GroupId = this._id;
    var sum = 0; 
    Items.find({belongTo: GroupId}).forEach(function (doc) { sum += Number(doc.price); }); 
    return sum;
  },
  // dynamic template change with menu buttons in group
  "template": function() {
    if (Template.instance().showAddItemForm.get() == true) {
      return "additem";
    }else if(Template.instance().showMenuItems.get() == true){
      return "menuitems";
    }

    
    
    
  }

});


