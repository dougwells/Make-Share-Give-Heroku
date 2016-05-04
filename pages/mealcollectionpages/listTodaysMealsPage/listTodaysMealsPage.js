/**
 * Created by dougwells on 6/18/15.
 */

if (Meteor.isClient) {
    Session.setDefault("neighborSort",1);
    Session.setDefault("priceSort",1);
    Session.setDefault("sortField","neighborhood");

    Navbar.add({
        url: '/todaysMeals',
        menuName: 'Meals Avail Today',
        menuOrientation: 'left'
    });

    Router.route('/todaysMeals', function() {
        //this.render('listTodaysMealsPage');

        //we must subscribe to the meals we are showing!!!
        this.subscribe('todaysMeals');

        //now let's query that subscription subset of Meals
        var mealToday = Meals.find({
            isAvailableToday: true,
            //servingsAvailable: true
        });

        //then set it as the 'this' object on the page, using the data object
        this.render('listTodaysMealsPage', {data: mealToday});
    });

    Template.listTodaysMealsPage.helpers({
        mealsToday: function () {
            if(Session.get("sortField") === "neighborhood") {
                return Meals.find(
                    {isAvailableToday: true},
                    {sort: {neighborhood: Session.get("neighborSort")}}
                )
            } else if(Session.get("sortField") === "costPerServing") {
                return Meals.find(
                    {isAvailableToday: true},
                    {sort: {costPerServing: Session.get("priceSort")}}
                )

            }
        }
    });

    Template.listTodaysMealsPage.events({
        'click #cheapest-first': function() {
            Session.set("sortField", "costPerServing");
            return Session.set("priceSort",1)
        },
        'click #expensive-first': function() {
            Session.set("sortField", "costPerServing");
            return Session.set("priceSort",-1)
        },

        'click #neighborhood-az': function() {
            Session.set("sortField", "neighborhood");
            return Session.set("neighborSort",1)
        },

        'click #neighborhood-za': function() {
            Session.set("sortField", "neighborhood");
            return Session.set("neighborSort",-1)
        }

    });

}