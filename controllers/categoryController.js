const db = require("../db/queries");
const validator = require("../utils/formValidator");

exports.showCreateForm = (req, res) => {
    res.render("createCategory", { errors: [], values: {} });
};

exports.list = async (req, res) => {
    const categories = await db.getAllCategories();

    res.render("categories", {
        categories,
    });
};

exports.details = async (req, res) => {
    const category = await db.getCategory(req.params.id);
    const items = await db.getItemsByCategory(req.params.id);

    if (!category) {
        return res.status(404).send("Category not found");
    }

    res.render("category", {
        category,
        items,
    });
};

exports.showEditForm = async (req, res) => {
    const category = await db.getCategory(req.params.id);

    if (!category) {
        return res.status(404).send("Category not found");
    }

    res.render("editCategory", {
        category,
        errors: [],
        values: category,
    });
};

exports.create = async (req, res) => {
    const errors = validator.getValidationErrors(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("createCategory", {
            errors: errors.array(),
            values: req.body,
        });
    }

    const { name, description } = req.body;
    const category = await db.createCategory({ name, description });

    res.redirect(`/categories/${category.id}`);
};

exports.update = async (req, res) => {
    const errors = validator.getValidationErrors(req);

    if (!errors.isEmpty()) {
        const category = await db.getCategory(req.params.id);
        return res.status(400).render("editCategory", {
            category,
            errors: errors.array(),
            values: req.body,
        });
    }

    const { name, description } = req.body;
    const category = await db.updateCategory(req.params.id, { name, description });

    if (!category) {
        return res.status(404).send("Category not found");
    }

    res.redirect(`/categories/${category.id}`);
};

exports.delete = async (req, res) => {
    await db.deleteCategory(req.params.id);
    res.redirect("/categories");
};