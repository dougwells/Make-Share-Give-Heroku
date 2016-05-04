
/*
    Here we create our collection. This is the same as
    a normal mongo collection, but you must also pass
    an object with configuration settings for the admin panel
 */
Meals = new orion.collection('meals', {
    singularName: 'meal', // The name of one of these items
    pluralName: 'meals', // The name of more than one of these items

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
    Now we will attach the schema for the meals collection.
    The schema defines the structure and rules of data
    that allowed for each document in this collection.
 */
Meals.attachSchema(new SimpleSchema({
    title: {
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


    //Doug's code for description
    description: {
        type: String,
        defaultValue:"",
        label: "Meal Description",
        min: 5,
        max: 200,
        autoform: {
            rows: 3
        }
    },

    isAvailableToday: {
        type: Boolean,
        defaultValue: false,
        label: "Available for Pickup TODAY"
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
        label: "Select Neighborhood in which Meal can be Picked Up (or the one you live closest to)"
    },

    pickupStartTime: {
        type: String,
        allowedValues: [
            '12noon',
            '1 PM',
            '2 PM',
            '3 PM',
            '4 PM',
            '5 PM',
            '6 PM',
            '7 PM',
            '8 PM',
            '9 PM'
        ],
        label: "Pickup Time: Start (choose one)"
    },

    pickupEndTime: {
        type: String,
        allowedValues: [
            '1 PM',
            '2 PM',
            '3 PM',
            '4 PM',
            '5 PM',
            '6 PM',
            '7 PM',
            '8 PM',
            '9 PM',
            '10 PM'
        ],
        label: "Pickup Time: End (choose one)"
    },


    costPerServing: {
        type: Number,
        allowedValues: [
            2.95,
            3.95,
            4.95,
            5.95,
            6.95,
            7.95,
            8.95,
            9.95
        ],
        //defaultValue: 4.95,
        decimal: true,
        label: "Suggested Donation per Serving to the Chef"
    },

    numServings: {
        type: Number,
        allowedValues: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ],
        decimal: false,
        label: "Number of Servings (Consumers Must Buy ALL or None)"
    },

    numServingsPurchased: {
        type: Number,
        optional: true,
        decimal: false,
        allowedValues: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ],
        defaultValue: 0,
        autoform: {
            omit: true
        }
    },

    servingsAvailable: {
        type: Boolean,
        defaultValue: true,
        autoform: {
            omit: true
        }
    },


    isNutFree: {
        type: Boolean,
        defaultValue: false,
        label: "Nut-free"
    },

    isGlutenFree: {
        type: Boolean,
        defaultValue: false,
        label: "Gluten Free"
    },

    isDairyFree: {
        type: Boolean,
        defaultValue: false,
        label: "Dairy-free"
    },
    isPaleo: {
        type: Boolean,
        defaultValue: false,
        label: "Paleo"
    },


    isOrganic: {
        type: Boolean,
        defaultValue: false,
        label: "Organic"
    },

    isKosher: {
        type: Boolean,
        defaultValue: false,
        label: "Kosher"
    },
    isLowCal: {
        type: Boolean,
        defaultValue: false,
        label: "Low-Cal"

    },
    isRaw: {
        type: Boolean,
        defaultValue: false,
        label: "Raw"
    },

    isKidsLove: {
        type: Boolean,
        defaultValue: false,
        label: "Kids Love!"
    },


    isBeef: {
        type: Boolean,
        defaultValue: false,
        label: "Beef"
    },

    isPork: {
        type: Boolean,
        defaultValue: false,
        label: "Pork"
    },

    isPoultry: {
        type: Boolean,
        defaultValue: false,
        label: "Poultry"
    },

    isSeafood: {
        type: Boolean,
        defaultValue: false,
        label: "Seafood"
    },

    isVeg: {
        type: Boolean,
        defaultValue: false,
        label: "Vegetarian"
    },

    //Doug's code - trying to capture document ID for specific meal document
    //mealId: {
    //    type: String,
    //    autoValue:function(){ return this._id }
    //},

    /*
    This attribute sets the user id to that of the user that created
    this meal automatically.  */

    createdBy: orion.attribute('createdBy'),

    createdAt: orion.attribute('createdAt'),

    updatedAt: orion.attribute('updatedAt')

}));


//save the created at time each time is inserted
//this is an example of an insert 'hook'
//Meals.before.insert(function(userId, doc) {
//   doc.createdAt = Date.now();
//});

/*
This is our pagination object. It lets us do an infinite
scroll through our list. You probably don't want to change
this unless you know what you are doing.
 */
Meals.findList = new Meteor.Pagination(Meals, {
    infinite: true,
    infiniteItemsLimit: 100,
    itemTemplate: 'mealInFindList',
    sort: {
        createdAt: -1
    },
    availableSettings: {
        sort: true
    }
});
