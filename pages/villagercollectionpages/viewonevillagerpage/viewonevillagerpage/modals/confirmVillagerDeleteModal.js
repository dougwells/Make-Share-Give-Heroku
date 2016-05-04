/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    /*
     After they click the confirm delete button,
     we remove the villager document, hide the modal,
     and re-direct them to the list of villagers
     */
    Template.confirmVillagerDeleteModal.events({
        'click #confirmDelete': function() {
            Villagers.remove(this._id, function() {
                Modal.hide();
                Router.go('/villagers');
            });
        }
    });

}