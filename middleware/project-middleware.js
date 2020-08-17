const db = require("../data/helpers/projectModel");

function validateProject() {
    return (req, res, next) => {
        if (!req.body.name) {
            res.status(400).json({
                error: "Name is required"
            })
            next()
        } else if (!req.body.description) {
            res.status(400).json({
                error: "Description is required"
            })
            next()
        }
        next()
    }
}

function validateProjectId () {
    return (req, res, next) => {
        db.get(req.params.project_id)
        .then(project => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(404).json({
                    error: "Project does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}


module.exports = {
    validateProject,
    validateProjectId
}