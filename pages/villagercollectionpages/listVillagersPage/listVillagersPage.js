/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Session.setDefault("vneighborSort",1);
    Session.setDefault("vnameSort",1);
    Session.setDefault("vsortField","name");

    Navbar.add({
        url: '/chefs',
        menuName: 'View the Chefs',
        menuOrientation: 'left'
    });

    Router.route('/chefs', function() {
        //we must subscribe to the villager we are showing!!!
        this.subscribe('villagersAll');

        //now let's query that villager
        var villagersPublic = Villagers.find(
            {shareProfile: true}
        );

        var allVillagers = Villagers.find();

       this.render('listVillagersPage', {data: allVillagers});
    });

    Template.villagerInFindList.helpers({
        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        }
    });

    Template.listVillagersPage.helpers({
       hasResults: function() {
           return Villagers.find().count();
       },

        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        },

        'loggedInUser': function() {
            //console.log(Villagers.find({createdBy: Meteor.userId()}));
            return Villagers.find({createdBy: Meteor.userId()});
        },

        'villagerSort': function () {
            if(Session.get("vsortField") === "neighborhood") {
                return Villagers.find(
                    {shareProfile: true},
                    {sort: {neighborhood: Session.get("vneighborSort")}}
                )
            } else if(Session.get("vsortField") === "name") {
                return Villagers.find(
                    {shareProfile: true},
                    {sort: {name: Session.get("vnameSort")}}
                )

            }
        }
    });

    Template.listVillagersPage.events({
        //'click #oldest-first': function() {
        //    Villagers.findList.set({
        //       sort: {
        //           createdAt: 1
        //       }
        //    });
        //},
        //'click #newest-first': function() {
        //    Villagers.findList.set({
        //        sort: {
        //            createdAt: -1
        //        }
        //    });
        //},

        'click #name-az': function() {
            Session.set("vsortField", "name");
            console.log(Session.get("vsortField"));
            return Session.set("vnameSort",1)
        },

        'click #name-za': function() {
            Session.set("vsortField", "name");
            console.log('z-a');
            return Session.set("vnameSort",-1)
        },

        'click #neighborhood-az': function() {
            Session.set("vsortField", "neighborhood");
            return Session.set("vneighborSort",1)
        },

        'click #neighborhood-za': function() {
            Session.set("vsortField", "neighborhood");
            return Session.set("vneighborSort",-1)
        }

        });

}