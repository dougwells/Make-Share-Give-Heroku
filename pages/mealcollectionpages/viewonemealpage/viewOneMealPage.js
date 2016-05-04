/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {
    Session.setDefault(updateServings = null);
    //Session.setDefault(meal)
    //Session.setDefault(cellPhone = null);

    Router.route('/meals/:_id', function() {

        //we must subscribe to the meal we are showing!!!
        this.subscribe('meal', this.params._id);

        //now let's query that meal
        var meal = Meals.findOne({_id: this.params._id});
        var chef = Meals.findOne({_id: this.params._id}).createdBy;
        this.subscribe('villagersSoldMeal',chef);




        //then set it as the 'this' object on the page, using the data object
        this.render('viewOneMealPage', {data: meal});
    });


    //Here we define a helper on the single meal page
    //In this case we check if the loggedin user
    //created the meal
    Template.mealInFindList.helpers({
        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        },

        'availableToday': function() {
            if (this.isAvailableToday === true) {
                return true;
            } else {
                return false;
            }
        }

    });

    Template.viewOneMealPage.helpers({
        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        },

        'chefInfo': function(chef) {
            console.log(Villagers.findOne({createdBy: chef}));
            return Villagers.findOne({createdBy: chef});
        },


        'forSale': function() {
            return this.isAvailableToday === true;
        },


        'totalMealCost': function() {
            var totalMealCost2 = this.numServings * this.costPerServing;
            return totalMealCost2.toFixed(2)
        },

        'numServingsUpdate': function(id, purchased) {
            if (Session.get(updateServings)) {
                Meals.update({_id: id}, {$set: {numServingsPurchased:purchased}});
                Meals.update({_id: id}, {$set: {isAvailableToday: false}});
                //Meals.update({_id: id}, {$set: {servingsAvailable: false}});
                //Meals.update({_id: id}, {$set: {numServings:6}});
                return Session.set(updateServings, null);
            }
        }

        //'shareCellPhone': function(phone) {
        //    if (Session.get(updateServings)) {
        //        return console.log(Meals.findOne({createdBy: phone}));
        //    }
        //}
    });


    //This is how you display a modal
    //In this case, we are displaying a modal to
    //confirm that the user wants to delete a specific meal
    Template.viewOneMealPage.events({
        'click #deleteMealButton': function() {

            //'this' is the current doc we are showing
            Modal.show('confirmMealDeleteModal', this);
        },

        'click #buyMealButton': function() {
            Session.set(updateServings, true);
            //Meals.update({_id: id}, {$set: {numServingsPurchased:numServings}});
            //var cellPhone = Villagers.find({createdBy: this.createdBy}).userCell;
            //console.log(cellPhone);

        }
    });

}