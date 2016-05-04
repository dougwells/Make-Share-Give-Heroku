/**
 * Created by wesley on 6/4/15.
 */

/**
 * Define publications here
 */
Meteor.publish('meal', function(mealId) {
    return Meals.find({_id: mealId});
});

Meteor.publish('allMeals', function() {
    return Meals.find();
});

Meteor.publish('todaysMeals', function() {
    return Meals.find({isAvailableToday: true});
});

Meteor.publish('mealOwner', function() {
    return Meals.find({createdBy: this.userId });
});

Meteor.publish('mealsByChef', function(chefId) {
    return Meals.find({createdBy: chefId });
});

Meteor.publish('todaysSelectedMeal', function(tsmId) {
    return Meals.find({_id: tsmId});
});


/**
 *
 * Define your security permissions here
 *
 */

//they can only insert if they are a user
Meals.permit('insert').ifLoggedIn().apply();

//can update if they are logged in and the document was created by them
Meals.permit('update').ifLoggedIn().ifCreatedByUser().apply();
Meals.permit('update').ifLoggedIn().apply();

//can update if they are an admin
Meals.permit('update').ifHasRole('admin').apply();

//can remove if they are logged in and the document was created by them
Meals.permit('remove').ifLoggedIn().ifCreatedByUser().apply();

//can remove if they are an admin
Meals.permit('remove').ifHasRole('admin').apply();