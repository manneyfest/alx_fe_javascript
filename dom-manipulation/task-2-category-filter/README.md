# Task 2: Dynamic Quote Generator with Category Filtering

This project builds on the previous quote generator by adding a **category filtering system** and using **web storage** to remember user preferences.

## 🧠 Features

- Display random quotes
- Filter quotes by category using a dropdown
- Remember the last selected category using localStorage
- Add new quotes and update category options dynamically
- Persist all quotes across sessions
- Import/export quotes as `.json` files

## 🛠 Technologies Used

- HTML5
- JavaScript (Vanilla)
- Web Storage API (localStorage + sessionStorage)
- FileReader API for importing JSON

## 📝 How to Use

1. Select a category from the dropdown to filter quotes.
2. Click “Show New Quote” to view a filtered quote.
3. Add a new quote and category — the dropdown updates automatically.
4. Export your quotes to a JSON file or import an existing one.

## 📦 Storage Behavior

- **Quotes** are stored in `localStorage` to persist across browser sessions.
- **Last selected category** is saved so it loads automatically on the next visit.
