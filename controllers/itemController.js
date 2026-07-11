const db = require("../db/queries");
const validator = require("../utils/formValidator");

exports.showCreateForm = async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("createItem", { categories, errors: [], values: {} });
};

exports.list = async (req, res) => {
    const items = await db.getAllItems();

    res.render("items", {
        items,
    });
};

exports.details = async (req, res) => {
    const item = await db.getItem(req.params.id);
    if (!item) {
        return res.status(404).send("Item not found");
    }

    const category = await db.getCategory(item.category_id);

    if (item.price !== undefined && item.price !== null) {
        item.price = Number(item.price);
    }
    // map DB quantity -> stock for templates
    if (item.quantity !== undefined && item.quantity !== null) {
        item.stock = Number(item.quantity);
    } else {
        item.stock = 0;
    }

    res.render("itemsDetails", {
        item,
        category,
    });
};

exports.showEditForm = async (req, res) => {
    const item = await db.getItem(req.params.id);

    if (!item) {
        return res.status(404).send("Item not found");
    }

    const categories = await db.getAllCategories();

    // Coerce numeric fields for the form values
    if (item.price !== undefined && item.price !== null) {
        item.price = Number(item.price);
    }
    if (item.quantity !== undefined && item.quantity !== null) {
        item.stock = Number(item.quantity);
    } else {
        item.stock = 0;
    }

    res.render("editItem", {
        item,
        categories,
        errors: [],
        values: item,
    });
};

exports.create = async (req, res) => {
    const errors = validator.getValidationErrors(req);

    if (!errors.isEmpty()) {
        const categories = await db.getAllCategories();
        return res.status(400).render("createItem", {
            categories,
            errors: errors.array(),
            values: req.body,
        });
    }

    const { name, description, price, stock, category_id } = req.body;
    const stockNum = stock === undefined || stock === '' ? 0 : Number(stock);
    const priceNum = price === undefined || price === '' ? null : Number(price);
    const item = await db.createItem({ name, description, price: priceNum, stock: stockNum, category_id });

    res.redirect(`/items/${item.id}`);
};

exports.update = async (req, res) => {
    const { name, description, price, stock, category_id } = req.body;
    const stockNum = stock === undefined || stock === '' ? 0 : Number(stock);
    const priceNum = price === undefined || price === '' ? null : Number(price);
    const item = await db.updateItem(req.params.id, { name, description, price: priceNum, stock: stockNum, category_id });

    res.redirect(`/items/${item.id}`);
}

exports.delete = async (req, res) => {
    await db.deleteItem(req.params.id);
    res.redirect("/items");
}