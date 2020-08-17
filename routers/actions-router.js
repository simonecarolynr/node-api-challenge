const express = require("express")
const db = require("../data/helpers/actionModel")
const { validateAction, validateActionId } = require("../middleware/actions-middleware")
const { validateProjectId } = require("../middleware/project-middleware")

const router = express.Router()

//Creates an action by project ID
router.post("/projects/:project_id/actions", validateProjectId, validateAction, (req, res) => {
    db.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Reads project action by ID
router.get("/projects/:project_id/actions/:action_id", validateProjectId, validateActionId, (req, res) => {

})

//Reads project actions by project ID
router.get("/projects/:project_id/actions", validateProjectId, (req, res) => {

})

//Updates an action by ID
router.put("/projects/:project_id/actions/:action_id", validateProjectId, validateActionId, validateAction, (req, res) => {
    db.update(req.params.action_id, req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Deletes an action by ID
router.delete("/projects/:project_id/actions/:action_id", validateActionId, validateProjectId, (req, res) => {
    
})