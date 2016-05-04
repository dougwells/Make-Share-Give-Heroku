/**
 * Created by wesley on 6/4/15.
 */

/**
 * Define publications here
 */
Meteor.publish('villager', function(villagerId) {
    return Villagers.find({_id: villagerId});
});

Meteor.publish('villagersPublic', function() {
    return Villagers.find({shareProfile: true});
});

Meteor.publish('villagersAll', function() {
    return Villagers.find();
});

Meteor.publish('villagersSoldMeal', function(mealCreatedBy) {
    return Villagers.find({createdBy: mealCreatedBy});
});


/**
 *
 * Define your security permissions here
 *
 */

//they can only insert if they are a user
Villagers.permit('insert').ifLoggedIn().apply();

//can update if they are logged in and the document was created by them
Villagers.permit('update').ifLoggedIn().ifCreatedByUser().apply();

//can update if they are an admin
Villagers.permit('update').ifHasRole('admin').apply();

//can remove if they are logged in and the document was created by them
Villagers.permit('remove').ifLoggedIn().ifCreatedByUser().apply();

//can remove if they are an admin
Villagers.permit('remove').ifHasRole('admin').apply();