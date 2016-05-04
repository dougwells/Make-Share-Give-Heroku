/**
 * Created by dougwells on 6/28/15.
 */

if (Meteor.isClient) {

    Router.route('/buyMeal/:_id', function() {

        //we must subscribe to the meal we are showing!!!
        this.subscribe('meal', this.params._id);

        //now let's query that meal
        var meal = Meals.findOne({_id: this.params._id});
        var chef = Meals.findOne({_id: this.params._id}).createdBy;
        this.subscribe('villagersSoldMeal',chef);

        //then set it as the 'this' object on the page, using the data object
        this.render('buyMealPage', {data: meal});
    });


    //Here we define a helper on the single meal page
    //In this case we check if the loggedin user
    //created the meal

    Template.buyMealPage.helpers({
        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        },

        'forSale': function() {
            return this.isAvailableToday === true;
        }
    });

    Template.buyMeal.helpers({
        'isOwner': function() {
            return this.createdBy === Meteor.userId();
        },

        'chefSelected': function(createdById) {
            return Villagers.findOne({createdBy: createdById});
        },

        'availableToday': function() {
            if (this.isAvailableToday === true) {
                return true;
            } else {
                return false;
            }
        },

        'totalMealCost': function() {
            return this.numServing * this.costPerServing
        }

    });



}