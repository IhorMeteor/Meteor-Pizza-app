Template.groupedit.events({
"keyup [name=describe]":function(event){
	event.preventDefault();
        if(event.which == 13 || event.which == 27){
          $(event.target).blur();
        }else{
        var documentId = this._id;
        var desc = $(event.target).val();
      	var currentUser = Meteor.userId();
      	
      Groups.update({_id:documentId},{$set: {describe: desc}});
       }

  },
  "click .button-invite":function(){
    $("[name='users-invite-form']").focus();
  },

  "click .button-add-item":function(event){
    Session.set("showItemForm",true);
  }
});

Template.groupedit.helpers({
  "showFormItem":function(event){
    return Session.get("showItemForm");
  },
  "items":function(){
    var GroupId = this._id;
    return Items.find({"belongTo":GroupId});
  },
  "noItems":function(){
     var GroupId = this._id;
    if(!Items.find({"belongTo":GroupId}).count()){
      return true;
    }
  },
  "sum":function(){
     var GroupId = this._id;
    var sum = 0; 
    Items.find({"belongTo":GroupId}).forEach(function (doc) { sum += Number(doc.price); }); 
    return sum;
  }
});


