const pool = require("./pool");

// Categories

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories ORDER BY name");
    return rows;
}

async function getCategory(id) {
    const { rows } = await pool.query(
        "SELECT * FROM categories WHERE id=$1",
        [id]
    );
    return rows[0];
}

async function getItemsByCategory(categoryId) {
    const { rows } = await pool.query(
        "SELECT * FROM items WHERE category_id=$1 ORDER BY name",
        [categoryId]
    );
    return rows;
}

async function createCategory(data) {
    const { name, description } = data;
    const { rows } = await pool.query(
        "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
    );
    return rows[0];
}

async function updateCategory(id, data){
    const { name, description } = data;
    const { rows } = await pool.query(
        "UPDATE categories SET name=$1, description=$2 WHERE id=$3 RETURNING *",
        [name, description, id]
    );
    return rows[0];
}

async function deleteCategory(id) {
    const { rows } = await pool.query(
        "DELETE FROM categories WHERE id=$1 RETURNING *",
        [id]
    );
    return rows[0];
}

// Items

async function getAllItems() {
    const { rows } = await pool.query(`
        SELECT items.*, items.stock AS quantity, categories.name AS category
        FROM items
        JOIN categories
        ON items.category_id = categories.id
    `);

    return rows;
}

async function getItem(id) {
    const { rows } = await pool.query(
        `SELECT items.*, items.stock AS quantity, categories.name AS category
        FROM items
        JOIN categories
        ON items.category_id = categories.id
        WHERE items.id=$1`,
        [id]
    );
    return rows[0];
}

async function createItem(data) {
    const { name, description, price, stock, category_id } = data;
    const qty = stock === undefined || stock === null ? 0 : Number(stock);
    const priceVal = price === undefined || price === null ? null : Number(price);
    const { rows } = await pool.query(
        "INSERT INTO items (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, description, priceVal, qty, category_id]
    );
    const item = rows[0];
    if (item) item.quantity = item.stock;
    return item;
}

async function updateItem(id, data) {
    const { name, description, price, stock, category_id } = data;
    const qty = stock === undefined || stock === null ? 0 : Number(stock);
    const priceVal = price === undefined || price === null ? null : Number(price);
    const { rows } = await pool.query(
        "UPDATE items SET name=$1, description=$2, price=$3, stock=$4, category_id=$5 WHERE id=$6 RETURNING *",
        [name, description, priceVal, qty, category_id, id]
    );
    const item = rows[0];
    if (item) item.quantity = item.stock;
    return item;
}

async function deleteItem(id) {
    const { rows } = await pool.query(
        "DELETE FROM items WHERE id=$1 RETURNING *",
        [id]
    );
    return rows[0];
}

module.exports = {
    getAllCategories,
    getCategory,
    getItemsByCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
};