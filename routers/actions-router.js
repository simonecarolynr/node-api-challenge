const express = require("express")
const db = require("../data/helpers/actionModel")
const { validateAction, validateActionId } = require("../middleware/actions-middleware")
const { validateProjectId } = require("../middleware/project-middleware")

const router = express.Router()

//Creates an action by project ID
router.post("/projects/:project_id/actions", validateProjectId, (req, res) => {
    db.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


//Reads project action by ID
router.get("/projects/:project_id/actions/:action_id", (req, res) => {
    db.get(req.params.action_id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Updates an action by ID
router.put("/projects/:project_id/actions/:action_id", (req, res) => {
    db.update(req.params.action_id, req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Deletes an action by ID
router.delete("/projects/:project_id/actions/:action_id", (req, res) => {
    db.remove(req.params.action_id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router