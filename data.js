// data.js
// This file holds the static ingredient categories and their initial items.

/**
 * @typedef {Object} IngredientItem
 * @property {number} id - Unique identifier for the ingredient.
 * @property {string} item - The name of the ingredient.
 * @property {string} unit - The unit of measurement (e.g., 'kg', 'liter', 'units', 'g').
 * @property {number} quantity - The current quantity of the ingredient.
 */

/**
 * @type {Object.<string, IngredientItem[]>}
 * Stores ingredient data categorized by type.
 */
export let categories = {
    'Vegetables': [
        { id: 1, item: 'Onions', unit: 'kg', quantity: 0 },
        { id: 2, item: 'Potatoes', unit: 'kg', quantity: 0 },
        { id: 3, item: 'Tomatoes', unit: 'kg', quantity: 0 },
        { id: 4, item: 'Green Chilies', unit: 'kg', quantity: 0 },
        { id: 16, item: 'Ginger', unit: 'kg', quantity: 0 },
        { id: 17, item: 'Garlic', unit: 'kg', quantity: 0 },
    ],
    'Masalas': [
        { id: 5, item: 'Mixed Spices (Masala)', unit: 'kg', quantity: 0 },
        { id: 6, item: 'Salt', unit: 'kg', quantity: 0 },
        { id: 7, item: 'Sugar', unit: 'kg', quantity: 0 },
        { id: 18, item: 'Turmeric Powder', unit: 'kg', quantity: 0 },
        { id: 19, item: 'Chilli Powder', unit: 'kg', quantity: 0 },
        { id: 20, item: 'Coriander Powder', unit: 'kg', quantity: 0 },
    ],
    'Dals & Grains': [
        { id: 8, item: 'Rice', unit: 'kg', quantity: 0 },
        { id: 9, item: 'Wheat Flour', unit: 'kg', quantity: 0 },
        { id: 10, item: 'Lentils (Toor Dal)', unit: 'kg', quantity: 0 },
        { id: 21, item: 'Moong Dal', unit: 'kg', quantity: 0 },
        { id: 22, item: 'Basmati Rice', unit: 'kg', quantity: 0 },
    ],
    'Dairy & Oil': [
        { id: 11, item: 'Cooking Oil', unit: 'liter', quantity: 0 },
        { id: 12, item: 'Paneer (Cottage Cheese)', unit: 'kg', quantity: 0 },
        { id: 13, item: 'Curd (Yogurt)', unit: 'kg', quantity: 0 },
        { id: 14, item: 'Ghee', unit: 'liter', quantity: 0 },
        { id: 23, item: 'Milk', unit: 'liter', quantity: 0 },
    ],
    'Other': [
        { id: 15, item: 'Lemon', unit: 'units', quantity: 0 },
        { id: 24, item: 'Coriander Leaves', unit: 'kg', quantity: 0 },
        { id: 25, item: 'Curry Leaves', unit: 'g', quantity: 0 },
        { id: 26, item: 'Coconut', unit: 'units', quantity: 0 },
    ]
};

// Determine the highest ID across all categories to ensure unique IDs for new items
export let nextId = 0;
for (const category in categories) {
    categories[category].forEach(item => {
        if (item.id > nextId) {
            nextId = item.id;
        }
    });
}
nextId++; // Increment to get the next available ID
