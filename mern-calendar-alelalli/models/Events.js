const {Schema, model} = require("mongoose")

const Events = Schema({

    title:{
        type: String,
        required:true
    },
    notes:{
        type: String
    },
    start:{
        type: Date,
        required:true

    },
    end:{
        type: Date,
        required:true
    },
    user:{
        type: Object,
        required:true
    }

})

//Este metodo hace que en vez de devolver
// Events.method("toJSON", function() {
    
//     const {__v, _id,...object} = this.toObject();
//     object.id =id;
//     return object;

// })

module.exports = model("Event", Events)