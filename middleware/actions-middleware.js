const db = require("../data/helpers/actionModel")

function validateAction() {
    return (req, res, next) => {
        if (!req.body.description && !req.body.project_id && !req.body.notes){
            res.status(400).json({
                error: "Missing values"
            })
            next()
        }

        next()
    }
}

function validateActionId() {
    return (req, res, next) => {
        db.get(req.params.action_id)
        .then(action => {
            if (action) {
                req.action = action
                next()
            } else {
                res.status(404).json({
                    error: "Action does not exist"
                })
            }
        })
    }
}

module.exports = {
    validateAction,
    validateActionId
}