const Post = require("../models/postModels.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        createAt: req.body.createAt
    });

    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the post"
            });
        else res.send(data);
    })
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {

};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {

};

// find all published Tutorials
exports.findAllPublished = (req, res) => {

};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
