# Inventory Application

A modern, lightweight inventory management web application built with Node.js and Express, created as part of The Odin Project's Node.js curriculum. It allows users to create, view, update, and delete product categories and inventory items, with form validation and PostgreSQL-backed persistence.

## Overview

This project provides a simple but practical interface for tracking inventory data. Users can organize items into categories, review item details, and maintain stock information through a clean web UI.

## Tech Stack

- Node.js
- Express.js
- EJS templating engine
- PostgreSQL
- Neon PostgreSQL (Cloud Database)
- pg (node-postgres)
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

Make sure the following are installed or available:

- Node.js (v18 or newer recommended)
- npm
- A PostgreSQL database (local PostgreSQL or a Neon PostgreSQL database)

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

Create a `.env` file in the project root and add your database connection string.

#### Using Neon PostgreSQL (Cloud Database)

```env
DATABASE_URL=postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require
PORT=3000
```

#### Using Local PostgreSQL

```env
DATABASE_URL=postgresql://username:password@localhost:5432/inventory
PORT=3000
```

### 4. Create the Database Tables

Connect to PostgreSQL and run the following SQL:

```sql
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    brand VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    category_id INTEGER NOT NULL,
    long_description TEXT,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
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
