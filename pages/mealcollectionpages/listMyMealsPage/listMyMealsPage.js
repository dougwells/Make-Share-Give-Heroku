/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/mymeals',
        menuName: 'Your Meals',
        menuOrientation: 'left'
    });

    Router.route('/mymeals', function() {
       //this.render('listMealsPage');

        //we must subscribe to the meals we are showing!!!
        this.subscribe('mealOwner');

        //now let's query that mealToday
        var mealOwner = Meals.find({createdBy: this.userId});

        //then set it as the 'this' object on the page, using the data object
        this.render('listMyMealsPage', {data: mealOwner});

    });



    Template.listMyMealsPage.helpers({
       hasResults: function() {
           return Meals.find().count();
       },

        myMeals: function() {
            return Meals.find({createdBy: Meteor.userId()});
        }
    });

    Template.listMyMealsPage.events({
        'click #oldest-first': function() {
            Meals.findList.set({
               sort: {
                   createdAt: 1
               }
            });
        },
        'click #newest-first': function() {
            Meals.findList.set({
                sort: {
                    createdAt: -1
                }
            });
        }
    });

}