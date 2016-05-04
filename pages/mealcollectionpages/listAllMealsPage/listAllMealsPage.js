/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/allmeals',
        menuName: 'All Meals',
        menuOrientation: 'left'
    });

    Router.route('/allmeals', function() {
       //this.render('listMealsPage');

        //we must subscribe to the meals we are showing!!!
        this.subscribe('allMeals');

        //now let's query that allMeals
        var allMeals = Meals.find();

        //then set it as the 'this' object on the page, using the data object
        this.render('listAllMealsPage', {data: allMeals});

    });

    //Template.findMyMeals.helpers({
    //    myMeals: function() {
    //        return Meals.find({createdBy: Meteor.userId()});
    //    }
    //});


    Template.listAllMealsPage.helpers({
       hasResults: function() {
           return Meals.find().count();
       },

        allMeals: function(){
            return Meals.find();
        }

        //needPagination: function() {
        //    var count = Meals.find().count();
        //    if(count>= 3){
        //        return true;
        //    } else {
        //        return false;
        //    }
        //}
    });

    Template.listAllMealsPage.events({
        'click #cheapest-first': function() {
            Meals.findList.set({
               sort: {
                   costPerServing: 1
               }
            });
        },
        'click #expensive-first': function() {
            Meals.findList.set({
                sort: {
                    costPerServing: -1
                }
            });
        }
    });

}