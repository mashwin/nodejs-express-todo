const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const ObjectID = require('objectid');

/**
 * POST request to create a new todo
 */
router.post('/todo', function (req, res) {

    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then((response) => {
            res.status(200).send(response);
        }).catch((error) => {
            res.status(400).send(error);
        })

});


/**
 * GET request to retrieve all todos
 */
router.get('/todos', function (req, res) {
    Todo.find({})
        .then((response) => {
            res.status(200).send({ response });
        })
        .catch((error) => {
            res.status(400).send(error);
        })
});

/**
 * GET request to retrive todo by id
 */
router.get('/todos/:id', function (req, res) {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({
            message: 'Invalid id'
        })
    }

    Todo.findById(req.params.id)
        .then((response) => {
            if (!response) {
                return res.status(404).send();
            }
            return res.status(200).send(response);
        })
        .catch((error) => {
            return res.status(400).send(error);
        })
});

/**
 * PUT request to update existing todo
 */
router.put('/todos/:id', function (req, res) {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({
            message: 'Invalid id'
        })
    }

    Todo.findByIdAndUpdate(
        req.params.id,
        {
            text: req.body.text,
            completed: req.body.completed, completedAt: new Date()
        })
        .then((response) => {
            if (!response) {
                return res.status(404).send(response);
            }
            return res.status(200).send(response);
        })
        .catch((error) => {
            return res.status(400).send(error);
        })
})

/**
 * DELETE request to delete a todo
 */
router.delete('/todos/:id', function (req, res) {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send({
            message: 'Invalid id'
        })
    }

    Todo.deleteOne({ _id: req.params.id })
        .then((response) => {
            return res.status(200).send(response);
        })
        .catch((response) => {
            return res.status(400).send();
        })
})


module.exports = router;