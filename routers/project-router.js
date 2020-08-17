const express = require("express");
const db = require("../data/helpers/projectModel");
const { validateProject, validateProjectId } = require("../middleware/project-middleware");

const router = express.Router();

//Creates a project
router.post("projects/", validateProject, (req, res) => {
    db.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Reads all projects
router.get("projects/", (req, res) => {
    //no model function for this??
})

//Reads projects by ID
router.get("projects/:project_id", validateProjectId, (req, res) => {
    db.get(req.params.project_id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Reads project actions by project ID
router.get("/projects/:project_id/actions", validateProjectId, (req, res) => {
    db.getProjectActions(req.params.project_id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Updates project by ID
router.put("projects/:project_id", validateProjectId, validateProject, (req, res) => {
    db.update(req.params.id, req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Deletes project by ID
router.delete("projects/:project_id", validateProjectId, (req, res) => {
    db.remove(req.params.project_id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router