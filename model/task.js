const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        estimate: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            // required: true,
            enum: ['To Do', 'Doing', 'Done'],
            default: "To Do",

        },
        importance: {
            type: String,
            enum: ['low', 'medium', 'high', "null"],
            default: " ",

        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        collection: 'tasks',
        versionKey: false,
        timestamps: true,
    }
    
);

taskSchema.pre(["find", "findOne", "save"], function () {
    this.populate(["user_id", "category_id"]);
});

module.exports = mongoose.model("Task", taskSchema);