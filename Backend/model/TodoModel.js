import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean
    }
});

export const Todo = mongoose.model('Todos', TodoSchema);