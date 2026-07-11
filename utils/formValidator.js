const { body, validationResult } = require("express-validator");

exports.categoryValidationRules = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Category name must be between 2 and 100 characters"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 5, max: 500 })
        .withMessage("Description must be between 5 and 500 characters"),
];

exports.itemValidationRules = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Item name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Item name must be between 2 and 100 characters"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 5, max: 500 })
        .withMessage("Description must be between 5 and 500 characters"),
    body("price")
        .trim()
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ gt: 0 })
        .withMessage("Price must be a positive number"),
    body("stock")
        .trim()
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be zero or greater"),
    body("category_id")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .isInt({ gt: 0 })
        .withMessage("Please select a valid category"),
];

exports.getValidationErrors = (req) => validationResult(req);
