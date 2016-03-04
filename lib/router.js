Router.configure({
	layoutTemplate:"layout",
	loadingTemplate: "loading"
});


Router.route("/",{
	template:"home",
	name:"home"
});

Router.route("/groups",{
	onBeforeAction:function () {
		var currentUser = Meteor.userId();
		if(currentUser){
			this.next();
		}else{
			this.render("login");
		}
	},
	waitOn:function(){
        return [Meteor.subscribe("groups"),Meteor.subscribe("items")]
      }
});

Router.route("/info");


Router.route("/edit/:_id", {
	name:"groupedit",
	template:"groupedit",
	data:function(){
		var currentGroup = this.params._id;
		return Groups.findOne({_id:currentGroup});
	},
	waitOn:function(){
        return [Meteor.subscribe("groups"),Meteor.subscribe("items")]
      }
});

