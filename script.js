
        // Use window.jsPDF for ES Module in browser
        const { jsPDF } = window.jspdf;

        // --- DOM Elements ---
        const homeLink = document.getElementById('home-link');
        const aboutLink = document.getElementById('about-link');
        const homeSection = document.getElementById('home-section');
        const aboutSection = document.getElementById('about-section');
        const tableBody = document.getElementById('table-body');
        const addItemBtn = document.getElementById('add-item-btn');
        const downloadPdfBtn = document.getElementById('download-pdf-btn');
        const downloadImageBtn = document.getElementById('download-image-btn');
        const shareWhatsappBtn = document.getElementById('share-whatsapp-btn');
        const ingredientTable = document.getElementById('ingredient-table');
        const categoryButtonsContainer = document.getElementById('category-buttons');

        // --- Data Model ---
        let categories = {
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
        let nextId = 0;
        for (const category in categories) {
            categories[category].forEach(item => {
                if (item.id > nextId) {
                    nextId = item.id;
                }
            });
        }
        nextId++; // Increment to get the next available ID

        let currentCategory = 'Vegetables'; // Default category to display

        // --- Functions ---

        /**
         * Renders the category buttons dynamically.
         */
        function renderCategoryButtons() {
            categoryButtonsContainer.innerHTML = '';
            for (const categoryName in categories) {
                const button = document.createElement('button');
                button.textContent = categoryName;
                button.classList.add('category-button', 'bg-blue-200', 'text-blue-800', 'font-semibold', 'py-2', 'px-4', 'rounded-lg', 'shadow-md', 'hover:bg-blue-300', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-opacity-50');
                button.dataset.category = categoryName;
                if (categoryName === currentCategory) {
                    button.classList.add('active');
                }
                button.addEventListener('click', () => {
                    currentCategory = categoryName;
                    renderCategoryButtons(); // Re-render buttons to update active state
                    renderTable(); // Re-render table for the selected category
                });
                categoryButtonsContainer.appendChild(button);
            }
        }

        /**
         * Renders all ingredient rows for the current category in the table.
         */
        function renderTable() {
            tableBody.innerHTML = ''; // Clear existing rows
            const itemsToDisplay = categories[currentCategory] || [];

            if (itemsToDisplay.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-gray-500">No items in this category. Add a custom item!</td></tr>`;
                return;
            }

            itemsToDisplay.forEach((item, index) => {
                const row = document.createElement('tr');
                row.classList.add(index % 2 === 0 ? 'table-row-even' : 'table-row-odd', 'hover:bg-gray-100');
                row.dataset.id = item.id;
                row.dataset.category = currentCategory; // Store category on row for updates

                row.innerHTML = `
                    <td class="py-3 px-4 border-b border-gray-200">
                        <input type="text" value="${item.item}" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 item-input" data-field="item">
                    </td>
                    <td class="py-3 px-4 border-b border-gray-200 flex items-center space-x-2">
                        <input type="number" step="0.01" value="${item.quantity}" class="w-2/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 quantity-input" data-field="quantity">
                        <input type="text" value="${item.unit}" class="w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 unit-input" data-field="unit">
                    </td>
                    <td class="py-3 px-4 border-b border-gray-200 w-[10%]">
                        <button class="remove-item-btn bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">-</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        /**
         * Adds a new, empty ingredient row to the currently selected category.
         */
        function addNewItem() {
            if (!categories[currentCategory]) {
                // If for some reason currentCategory is not defined, default to 'Other'
                currentCategory = 'Other';
                if (!categories['Other']) {
                    categories['Other'] = [];
                }
            }
            categories[currentCategory].push({
                id: nextId++,
                item: 'New Custom Item',
                unit: 'units', // Default unit for new items
                quantity: 0
            });
            renderTable();
        }

        /**
         * Updates an ingredient's property in the data model for the correct category.
         * @param {number} id - The ID of the ingredient to update.
         * @param {string} categoryName - The category the item belongs to.
         * @param {string} field - The field to update (e.g., 'item', 'quantity', 'unit').
         * @param {string|number} value - The new value for the field.
         */
        function updateIngredient(id, categoryName, field, value) {
            const categoryItems = categories[categoryName];
            if (!categoryItems) return;

            const itemIndex = categoryItems.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                if (field === 'quantity') {
                    categoryItems[itemIndex][field] = parseFloat(value) || 0;
                } else {
                    categoryItems[itemIndex][field] = value;
                }
                // No need to re-render table for every input change if just updating data model,
                // only if display needs to change (e.g., total calculations, which are now removed)
            }
        }

        /**
         * Removes an ingredient from the data model for the correct category.
         * @param {number} id - The ID of the ingredient to remove.
         * @param {string} categoryName - The category the item belongs to.
         */
        function removeItem(id, categoryName) {
            if (!categories[categoryName]) return;
            categories[categoryName] = categories[categoryName].filter(item => item.id !== id);
            renderTable(); // Re-render the table for the current category
        }

        /**
         * Handles tab navigation.
         * @param {string} sectionId - The ID of the section to show.
         */
        function showSection(sectionId) {
            homeSection.classList.add('hidden');
            aboutSection.classList.add('hidden');

            if (sectionId === 'home') {
                homeSection.classList.remove('hidden');
            } else if (sectionId === 'about') {
                aboutSection.classList.remove('hidden');
            }
        }

        /**
         * Downloads the currently displayed ingredient table as a PDF.
         */
        async function downloadPdf() {
            // Temporarily hide actions column for cleaner PDF
            const actionCells = document.querySelectorAll('#ingredient-table th:last-child, #ingredient-table td:last-child');
            actionCells.forEach(cell => cell.style.display = 'none');

            // Set specific width for PDF generation (can adjust as needed)
            ingredientTable.style.width = '700px'; // A wider width for better PDF layout

            const doc = new jsPDF('p', 'pt', 'a4'); // 'p' for portrait, 'pt' for points, 'a4' for A4 size
            const tableElement = document.getElementById('ingredient-table');

            // Use html2canvas to render the table as an image
            const canvas = await html2canvas(tableElement, { scale: 2 }); // Scale up for better resolution
            const imgData = canvas.toDataURL('image/png');

            // Calculate image dimensions to fit PDF page
            const imgWidth = 595.28; // A4 width in points
            const pageHeight = 841.89; // A4 height in points
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            doc.save(`cook_ingredient_list_${currentCategory}.pdf`);

            // Restore original table width and action column
            ingredientTable.style.width = ''; // Reset to default (or Tailwind classes)
            actionCells.forEach(cell => cell.style.display = '');
        }

        /**
         * Downloads the currently displayed ingredient table as an image (PNG).
         */
        async function downloadImage() {
            // Temporarily hide actions column for cleaner image
            const actionCells = document.querySelectorAll('#ingredient-table th:last-child, #ingredient-table td:last-child');
            actionCells.forEach(cell => cell.style.display = 'none');

            const tableElement = document.getElementById('ingredient-table');
            const canvas = await html2canvas(tableElement, { scale: 2 }); // Scale up for better resolution
            const imgData = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = imgData;
            link.download = `cook_ingredient_list_${currentCategory}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Restore action column
            actionCells.forEach(cell => cell.style.display = '');
        }

        /**
         * Shares the budget details via WhatsApp Web.
         * Note: Direct file attachment is not supported via simple web links.
         * User will need to manually share the downloaded PDF/Image.
         */
        function shareWhatsapp() {
            let message = `Hello! Here's the ingredient list for the "${currentCategory}" category:\n\n`;
            const itemsToShare = categories[currentCategory] || [];

            if (itemsToShare.length === 0) {
                message += `No items listed in this category.`;
            } else {
                itemsToShare.forEach(item => {
                    if (item.quantity > 0) {
                        message += `- ${item.item}: ${item.quantity} ${item.unit}\n`;
                    }
                });
                if (itemsToShare.every(item => item.quantity === 0)) {
                    message += `(No quantities specified for items in this category.)`;
                }
            }

            message += `\n\nFor a detailed list including other categories, please refer to the downloaded PDF/Image.`;

            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }

        // --- Event Listeners ---

        // Navigation links
        homeLink.addEventListener('click', () => showSection('home'));
        aboutLink.addEventListener('click', () => showSection('about'));

        // Add new item button
        addItemBtn.addEventListener('click', addNewItem);

        // Event delegation for input changes and remove buttons in the table
        tableBody.addEventListener('input', (event) => {
            const target = event.target;
            const row = target.closest('tr');
            if (!row) return;

            const id = parseInt(row.dataset.id);
            const categoryName = row.dataset.category;
            const field = target.dataset.field; // 'item', 'quantity', 'unit'

            if (field) {
                updateIngredient(id, categoryName, field, target.value);
            }
        });

        tableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item-btn')) {
                const row = event.target.closest('tr');
                if (row) {
                    const id = parseInt(row.dataset.id);
                    const categoryName = row.dataset.category;
                    removeItem(id, categoryName);
                }
            }
        });

        // Download and Share buttons
        downloadPdfBtn.addEventListener('click', downloadPdf);
        downloadImageBtn.addEventListener('click', downloadImage);
        shareWhatsappBtn.addEventListener('click', shareWhatsapp);

        // --- Initial Load ---
        document.addEventListener('DOMContentLoaded', () => {
            renderCategoryButtons(); // Render category buttons initially
            renderTable(); // Render table for the default category
            showSection('home'); // Ensure home section is visible by default
        });