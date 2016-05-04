
/*
    Here we create our collection. This is the same as
    a normal mongo collection, but you must also pass
    an object with configuration settings for the admin panel
 */
Villagers = new orion.collection('villagers', {
    singularName: 'villager', // The name of one of these items
    pluralName: 'villagers', // The name of more than one of these items

    /*
        Tabular settings for this collection, this must be filled out
        correctly for the admin panel to work
     */
    tabular: {
        columns: [
            { data: "title", title: "Title" },
        /*
            If you want to show a custom orion attribute in
            the index table you must call this function
            orion.attributeColumn(attributeType, key, label)
         */
            orion.attributeColumn('image', 'image', 'Image'),
            orion.attributeColumn('summernote', 'body', 'Content'),
            orion.attributeColumn('createdBy', 'createdBy', 'Created By')
        ]
    }
});

/*
    Now we will attach the schema for the villagers collection.
    The schema defines the structure and rules of data
    that allowed for each document in this collection.
 */
Villagers.attachSchema(new SimpleSchema({
    name: {
        type: String
    },

    /*
        The file attribute is a custom orion attribute
        This is where orion does its magic. Just set
        the attribute type and it will automatically
        create the form for the file.
        WARNING: the url of the image will not be saved in
        .image, it will be saved in .image.url.
     */
    image: orion.attribute('file', {
        label: 'Image',
        optional: true
    }),

    /*
        Here it's the same with an image attribute.
        summernote is an html editor.
     */
    //body: orion.attribute('summernote', {
    //    label: 'Body'
    //}),

    userName: {
        type: String,
        max: 25,
        label: "User Name:"
    },

    isChef: {
        type: Boolean,
        defaultValue: false,
        label: "Chef"
    },

    isPatron: {
        type: Boolean,
        defaultValue: false,
        label: "Patron"
    },

    userEmail:{
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Email,
        label: "Email"
    },

    userCell: {
        type: String,
        optional: false,
        min: 12,
        max: 12,
        label: "Cell Phone Number (ex: 435-649-1234)"
    },

    aboutMe: {
        type: String,
        label: "About Me (200 Characters Max)",
        min: 5,
        max: 200,
        autoform: {
            rows: 3
        }
    },

    neighborhood: {
        type: String,
        optional: false,
        allowedValues: [
            "Canyons",
            "Deer Crest",
            "Deer Valley - Upper",
            "Deer Valley - Lower",
            "Empire/Flagstaff",
            "Glenwild",
            "Jeremy Ranch",
            "Jordanelle",
            "Kimball Junction",
            "Old Ranch Road",
            "Old Town",
            "Olympic Park",
            "Pinebrook",
            "Park Meadows",
            "Promentory",
            "Prospector Square",
            "Quinn's Junction",
            "RanchPlace",
            "Silver Creek",
            "Silver Springs",
            "Summit Park",
            "Thaynes Canyon",
            "The Aerie",
            "Trailside",
            "Willow Creek",
            "Other"
        ],
        label: "Select your Neighborhood (or the one you live closest to)"
    },

    street: {
        type: String,
        max: 100
    },
    city: {
        type: String,
        max: 50
    },
    state: {
        type: String,
        regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
    },
    zip: {
        type: String,
        regEx: /^[0-9]{5}$/
    },

    shareProfile: {
        type: Boolean,
        defaultValue: false,
        label: "If Chef, You agree to share your profile with others"
    },

    isLegalSigned: {
        type: Boolean,
        defaultValue: false,
        label: "Agree to Terms of Service & Legal Disclaimers",
        optional: false
    },

    createdBy: {
        type: String,
        autoValue:function(){ return this.userId }
    },

    /*
    This attribute sets the user id to that of the user that created
    this villager automatically.  */
    createdBy: orion.attribute('createdBy'),

    createdAt: orion.attribute('createdAt'),

    updatedAt: orion.attribute('updatedAt')

}));


//save the created at time each time is inserted
//this is an example of an insert 'hook'
//Villagers.before.insert(function(userId, doc) {
//   doc.createdAt = Date.now();
//});

/*
This is our pagination object. It lets us do an infinite
scroll through our list. You probably don't want to change
this unless you know what you are doing.
 */
Villagers.findList = new Meteor.Pagination(Villagers, {
    infinite: true,
    infiniteItemsLimit: 100,
    itemTemplate: 'villagerInFindList',
    sort: {
        createdAt: -1
    },
    availableSettings: {
        sort: true
    }
});
