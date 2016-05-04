/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    /*
     After they click the confirm delete button,
     we remove the meal document, hide the modal,
     and re-direct them to the list of meals
     */
    Template.confirmMealDeleteModal.events({
        'click #confirmDelete': function() {
            Meals.remove(this._id, function() {
                Modal.hide();
                Router.go('/meals');
            });
        }
    });

}