Router.configure({
	layoutTemplate: "layout",
	loadingTemplate: "loading",
	notFoundTemplate: "notFound"
});


Router.route("/",{
	template: "home",
	name: "home"
});

Router.route("/groups",{
	
	waitOn: function(){
  	return Meteor.subscribe("availableGroups");
  }
});

Router.route("/info");


Router.route("/edit/:_id", {
	name: "groupedit",
	template: "groupedit",

	data: function(){
		return Groups.findOne({_id: this.params._id});
	},

	waitOn: function(){
  	return [Meteor.subscribe("currentlyOpenGroup", this.params._id), Meteor.subscribe("itemsInGroup", this.params._id)];
  }
});

Router.onBeforeAction(function () {
		var currentUser = Meteor.userId();
		if(currentUser){
			this.next();
		}else{
			this.render("login");
		}

	}, {only: ['groups', 'groupedit']});

Router.onBeforeAction("dataNotFound");