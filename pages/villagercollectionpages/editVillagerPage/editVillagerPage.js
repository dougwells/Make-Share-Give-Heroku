/**
 * Created by wesley on 6/8/15.
 */

if (Meteor.isClient) {

    Navbar.add({
        url: '/chefs',
        menuName: 'Edit Profile',
        menuOrientation: 'left'
    });

    Router.route('/chefs/:_id/edit', function() {

        //we must subscribe to the villager we are showing!!!
        this.subscribe('villager', this.params._id);

        //now let's query that villager
        var villager = Villagers.findOne({_id: this.params._id});
        console.log(this.params._id);

        //then set it as the 'this' object on the page
        this.render('editVillagerPage', {data: villager});
    });

    //after they insert a new villager, redirect back to
    //list of villagers

    //'insertVillager' is the id of the quickform we
    //and 'updateVillager' are the id's of the quickforms
    //we want to listen to, not the name of the page level templates
    AutoForm.addHooks('updateVillager', {

        //the onSuccess method gets called after
        //a successful submit on either of the forms
        onSuccess: function(formType, result) {

            //this.docId is the _id of the document
            //the form just changed, so we will
            //load the url of that item and show the user
            //the result
            Router.go('/chefs');

            //Router.go('/chefs/' + this.docId);
        }
    });

}