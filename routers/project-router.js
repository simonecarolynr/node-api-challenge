const express = require("express");
const db = require("../data/helpers/projectModel");
const { validateProject, validateProjectId } = require("../middleware/project-middleware");

const router = express.Router();

//Creates a project
router.post("/projects", (req, res) => {
    console.log("This is happening")
    db.insert(req.body)
    .then(project => {
        if (!req.body.name) {
            res.status(400).json({
                error: "Name is required"
            })
        } else if (!req.body.description) {
            res.status(400).json({
                error: "Description is required"
            })
        } else {
            res.status(201).json(project)
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Reads all projects
router.get("/projects", (req, res) => {
    //no model function for this??
})

//Reads projects by ID
router.get("/projects/:project_id", (req, res) => {
    db.get(req.params.project_id)
    .then(project => {
        if (project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({
                error: "Project does not exist"
            })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Reads project actions by project ID
router.get("/projects/:project_id/actions", (req, res) => {
    db.getProjectActions(req.params.project_id)
    .then(actions => {
        if (actions) {
            res.status(200).json(actions)
        } else if (!actions) {
            res.status(404).json({
                error: "Action does not exist"
            })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Updates project by ID
router.put("/projects/:project_id", (req, res) => {
    db.update(req.params.id, req.body)
    .then(project => {
        if (project) {
            res.status(201).json(project)
        } else if (!project) {
            res.status(404).json({
                error: "project does not exist"
            })
        } else if (!req.body.name && !req.body.description) {
            res.status(400).json({
                error: "Missing input"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: "We don't know what went wrong"
        })
    })
})

//Deletes project by ID
router.delete("projects/:project_id", (req, res) => {
    db.remove(req.params.project_id)
    .then(project => {
        if (project) {
            res.status(200).json(project)
        } else if (!project) {
            res.status(404).json({
                error: "project does not exist"
            })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router