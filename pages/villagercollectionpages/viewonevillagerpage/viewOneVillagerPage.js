/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {
    Router.route('/chefs/:_id', function() {

        //we must subscribe to the villager we are showing!!!
        this.subscribe('villager', this.params._id);

        //now let's query that villager
        var villager = Villagers.findOne({_id: this.params._id});
        var chefId = Villagers.findOne({_id: this.params._id}).createdBy;
        this.subscribe('mealsByChef', chefId);

        //then set it as the 'this' object on the page, using the data object
        this.render('viewOneVillagerPage', {data: villager});
    });


    //Here we define a helper on the single villager page
    //In this case we check if the loggedin user
    //created the villager
    Template.viewOneVillagerPage.helpers({
        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        },

        'currentChefMeals': function(createdBy) {
            return Meals.find({createdBy: createdBy});
        }

    });


    //This is how you display a modal
    //In this case, we are displaying a modal to
    //confirm that the user wants to delete a specific villager
    Template.viewOneVillagerPage.events({
        'click #deleteVillagerButton': function() {

            //'this' is the current doc we are showing
            Modal.show('confirmVillagerDeleteModal', this);
        }
    });

}