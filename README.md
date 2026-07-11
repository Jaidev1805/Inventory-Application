# Inventory Application

A modern, lightweight inventory management web application built with Node.js and Express, created as part of The Odin Project's Node.js curriculum. It allows users to create, view, update, and delete product categories and inventory items, with form validation and PostgreSQL-backed persistence.

## Overview

This project provides a simple but practical interface for tracking inventory data. Users can organize items into categories, review item details, and maintain stock information through a clean web UI.

## Tech Stack

- Node.js
- Express.js
- EJS templating engine
- PostgreSQL with the pg driver
- express-validator for server-side form validation

## Features

- Create, view, edit, and delete categories
- Create, view, edit, and delete inventory items
- Associate items with specific categories
- Display item details, including price and stock information
- Server-side validation for forms
- Responsive, simple UI powered by EJS templates and CSS

## Project Structure

```text
inventory-application/
├── app.js
├── package.json
├── package-lock.json
├── .env
├── README.md
├── controllers/
│   ├── categoryController.js
│   ├── indexController.js
│   └── itemController.js
├── db/
│   ├── pool.js
│   └── queries.js
├── public/
│   └── styles.css
├── routes/
│   ├── categoryRouter.js
│   ├── indexRouter.js
│   └── itemRouter.js
├── utils/
│   └── formValidator.js
└── views/
    ├── categories.ejs
    ├── category.ejs
    ├── createCategory.ejs
    ├── createItem.ejs
    ├── editCategory.ejs
    ├── editItem.ejs
    ├── index.ejs
    ├── items.ejs
    └── itemsDetails.ejs
```

## Installation Guide

### Prerequisites

Make sure the following are installed on your machine:

- Node.js (v18 or newer recommended)
- npm
- PostgreSQL database

### 1. Clone the Repository

```bash
git clone https://github.com/Jaidev1805/Inventory-Application
cd inventory-application
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add your PostgreSQL connection string:

```env
DATABASE_URL=postgres://username:password@localhost:5432/inventory_db
PORT=3000
```

### 4. Create the Database Tables

Connect to PostgreSQL and run the following SQL:

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2),
  stock INTEGER DEFAULT 0,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
```

### 5. Start the Application

Run the app in development mode:

```bash
npm run dev
```

Or start it normally:

```bash
npm start
```

### 6. Open the Application

Visit the app in your browser at:

```text
http://localhost:3000
```

## Usage

- Navigate to the home page to access the application.
- Use the category pages to manage product groups.
- Use the item pages to add items, view details, and update stock or pricing.
