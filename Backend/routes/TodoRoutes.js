import express  from "express";
import {Todo} from '../model/TodoModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (!req.body.text) return res.status(400).send({message: 'send the text!'});

        const newTodo = {
            text: req.body.text,
            completed: false
        };

        const todo = await Todo.create(newTodo);
        return res.status(201).send(todo)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// getting all notes
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({});

        return res.status(200).json({
            count: todos.length,
            data: todos
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// getting one note details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await Todo.findById(id);

        return res.status(200).json(todo);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// update note
router.put('/:id', async (req, res) => {
    try {
        if(!req.body.text) return res.status(400).send({message: 'somthing is messing!'});

        const { id } = req.params;

        const newTodo = {
            ...req.body,
            completed: req.body.hasOwnProperty('completed') ? req.body.completed : false,
        } 

        const result = await Todo.findByIdAndUpdate(id, newTodo);

        if (!result) return res.status(404).send({message: 'todo not found!' }); 

        return res.status(200).send({message: 'todo updated successfully!'}); 
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: err.message });
    }
});

// delete a note
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Todo.findByIdAndDelete(id);

        if (!result) return res.status(404).send({message: 'note not found'});

        return res.status(200).send({message: 'todo deleted successfully'});
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({message: err.message});
    }
});

export default router;