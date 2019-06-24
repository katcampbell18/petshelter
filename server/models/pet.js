const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Pet name is required"],
        minlength:[3,"Pet name must be 3 characters or more"]
    },
    type:{
        type: String,
        required: [true,"Pet type is required"],
        minlength:[3,"Pet type must be 3 characters or more"]
    },
    description:{
        type: String,
        required: [true,"Description is required"],
        minlength: [10,"Description must be 10 characters or more"]
    },
    skill_one:{
        type: String
    },
    skill_two:{
        type: String
    },
    skill_three:{
        type: String
    },
    like:{
        type: Number,
        default: 0
    },
    liked:{
        type: Boolean,
        default: false
    },

}, {timestamps: true});

mongoose.model("Pet", PetSchema);