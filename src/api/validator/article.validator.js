const { body } = require('express-validator');


exports.createArticleValidator = [
       
        body("title")
            .isString()
            .withMessage("Title must be a string")
            .exists({checkFalsy: true})
            .withMessage("Title is required"),
        body("description")
            .isString()
            .withMessage("Description must be a string")
            .exists({checkFalsy: true})
            .withMessage("Description is required"),
        body("body")
            .exists({checkFalsy: true})
            .withMessage("Body is required")
]


exports.updateArticleValidator = [
        body("title")
            .isString()
            .withMessage("Title must be a string"),
        body("description")
            .isString()
            .withMessage("Description must be a string"),
        body("state")
            .isString()
            .withMessage("State must be a string")
]
