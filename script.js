
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


// Define unit options based on type. This constant must be defined globally.
const unitOptions = {
    weight: [
        { value: 'किलो', text: 'किलो' },
        { value: 'ग्रॅम', text: 'ग्रॅम' },
    ],
    liquid: [
        { value: 'लिटर', text: 'लिटर' },
        { value: 'मिलीलीटर', text: 'मिलीलीटर' },
    ],
    unit: [
        { value: 'नग', text: 'नग' },
    ],
    pack: [
        { value: 'पॅक', text: 'पॅक' }, // For packaged goods
        { value: 'डबी', text: 'डबी' }, // For small boxes/tins
        { value: 'बरणी', text: 'बरणी' }, // For jars
    ],
    bundle: [
        { value: 'पेंडी', text: 'पेंडी' },
    ],
    other: [
        { value: 'other', text: '' }
    ]
};

// --- Data Model ---
let categories = {
    'भाजीपाला': [
        { id: 100, item: 'कांदा', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 101, item: 'बटाटा', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 102, item: 'टोमॅटो', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 103, item: 'हिरवी मिरची', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 104, item: 'आले', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 105, item: 'लसूण', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 106, item: 'गाजर', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 107, item: 'वांगी', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 108, item: 'दोडका', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 109, item: 'फ्लॉवर', unit: 'किलो', quantity: 0, type: 'unit' },
        { id: 111, item: 'ढोबळी मिरची', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 112, item: 'मटार (माफको)', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 113, item: 'शेवगा शेंगा', unit: 'किलो', quantity: 0, type: 'bundle' },
        { id: 114, item: 'काकडी', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 115, item: 'लिंबू', unit: 'नग', quantity: 0, type: 'weight' },
        { id: 116, item: 'कोथिंबीर', unit: 'किलो', quantity: 0, type: 'bundle' },
        { id: 117, item: 'कढीपत्ता', unit: 'ग्रॅम', quantity: 0, type: 'bundle' },
        { id: 118, item: 'पुदिना', unit: 'पेंडी', quantity: 0, type: 'bundle' },
        { id: 119, item: 'पालक', unit: 'किलो', quantity: 0, type: 'bundle' },
    ],
    'किराणा': [
        { id: 32, item: 'जायफळ', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 33, item: 'वेलदोडे', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 34, item: 'केशरी रंग (डबी)', unit: 'डबी', quantity: 0, type: 'pack' },
        { id: 35, item: 'खायचा सोडा', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 36, item: 'ओवा', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 37, item: 'सुंठ पावडर', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 38, item: 'बडीशेप', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 39, item: 'खसखस', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 40, item: 'हिंग (डबी)', unit: 'डबी', quantity: 0, type: 'pack' },
        { id: 41, item: 'मोठे मीठ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 42, item: 'बारीक मीठ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 43, item: 'हळद', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 44, item: 'जिरे', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 45, item: 'तीळ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 46, item: 'मगज बी', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 47, item: 'धने पावडर', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 48, item: 'कसुरी मेथी', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 49, item: 'मोहरी', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 50, item: 'काळी मिरी', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 51, item: 'लवंग', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 52, item: 'दालचिनी', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 53, item: 'तमालपत्र', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 54, item: 'जायपत्री', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 55, item: 'मसाले वेलदोडे', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 56, item: 'सांबर मसाला (MTR)', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 57, item: 'गरम मसाला (MTR)', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 58, item: 'बिर्याणी मसाला', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 59, item: 'गोडा मसाला', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 60, item: 'पुलाव मसाला', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 61, item: 'पनीर मसाला', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 62, item: 'चाट मसाला', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 63, item: 'जिरा पावडर', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 64, item: 'गुळ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 65, item: 'खोबरे किस', unit: 'ग्रॅम', quantity: 0, type: 'weight' },
        { id: 66, item: 'भाजके शेंगदाणे', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 67, item: 'चारमिनार चटणी', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 68, item: 'लिंबू अर्क', unit: 'मिलीलीटर', quantity: 0, type: 'liquid' },
        { id: 69, item: 'टोमॅटो सॉस', unit: 'पॅक', quantity: 0, type: 'pack' },
        { id: 70, item: 'लोणचे', unit: 'बरणी', quantity: 0, type: 'pack' },
        { id: 71, item: 'कस्टर्ड पावडर', unit: 'पॅक', quantity: 0, type: 'weight' },
        { id: 72, item: 'चहा पावडर', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 73, item: 'रवा', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 74, item: 'शेवया', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 75, item: 'तांदूळ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 76, item: 'तूर डाळ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 77, item: 'मूग डाळ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 78, item: 'उडीद डाळ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 79, item: 'फुटणे डाळ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 80, item: 'चिंच', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 81, item: 'बेसन', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 82, item: 'सुजी', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 83, item: 'खपली गहू', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 84, item: 'घवाचे पीठ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 85, item: 'मैदा', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 86, item: 'नाचणी पीठ', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 87, item: 'मटकी', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 88, item: 'मसूर', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 89, item: 'मुग', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 90, item: 'तूप', unit: 'लिटर', quantity: 0, type: 'liquid' },
        { id: 91, item: 'तेल', unit: 'लिटर', quantity: 0, type: 'liquid' },
        { id: 92, item: 'खारीक', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 93, item: 'काजू', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 94, item: 'बदाम', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 95, item: 'बेदाणे', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 96, item: 'चारोळी', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 97, item: 'पत्रावळी', unit: 'नग', quantity: 0, type: 'bundle' },
        { id: 98, item: 'चमचा', unit: 'नग', quantity: 0, type: 'bundle' },
        { id: 99, item: 'नास्ता प्लेट', unit: 'नग', quantity: 0, type: 'bundle' },
    ],
    'डेअरी': [
        { id: 23, item: 'खवा', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 24, item: 'दूध', unit: 'लिटर', quantity: 0, type: 'liquid' },
        { id: 25, item: 'बटर', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 26, item: 'पनीर', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 27, item: 'फ्रूटखंड', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 28, item: 'आम्रखंड', unit: 'किलो', quantity: 0, type: 'weight' },
        { id: 29, item: 'बासुंदी', unit: 'लिटर', quantity: 0, type: 'liquid' },
        { id: 30, item: 'दही', unit: 'किलो', quantity: 0, type: 'liquid' },
        { id: 31, item: 'मिल्क क्रीम', unit: 'किलो', quantity: 0, type: 'liquid' },
    ],
    'भांडी': [
        { id: 1, item: 'पातेले 05 कि', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 2, item: 'पातेले 10 कि', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 3, item: 'पातेले 15 कि', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 4, item: 'पातेले 20 कि', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 5, item: 'पातेले 30 कि', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 6, item: 'पातेले 40 कि', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 7, item: 'पातेले 50 कि', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 8, item: 'स्टील बकेट', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 9, item: 'स्टील बुट्टी', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 10, item: 'बर्डी', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 11, item: 'दांडा पातेले', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 12, item: 'वगराळे', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 13, item: 'भात वाडी', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 14, item: 'पंचपाळ', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 15, item: 'मोठी परात', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 16, item: 'कढई', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 17, item: 'ताट', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 18, item: 'वाटी', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 19, item: 'ग्लास', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 20, item: 'द्रोण', unit: 'नग', quantity: 0, type: 'unit' },
        { id: 21, item: 'पोळपाट लाटणे', unit: 'सेट', quantity: 0, type: 'unit' },
        { id: 22, item: 'उलतने', unit: 'नग', quantity: 0, type: 'unit' },
    ],
    'इतर': [
        { id: 120, item: 'बर्फ', unit: 'नग', quantity: 0 },
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

let currentCategory = 'भाजीपाला'; // Default category to display

// --- Functions ---

/**
 * Renders the category buttons dynamically.
 */
function renderCategoryButtons() {
    categoryButtonsContainer.innerHTML = '';
    for (const categoryName in categories) {
        const button = document.createElement('button');
        button.textContent = categoryName;
        button.classList.add('category-button', 'bg-blue-200', 'text-blue-800', 'font-semibold', 'py-2', 'px-2', 'rounded-lg', 'shadow-md', 'hover:bg-blue-300', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-opacity-50');
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
 * Generates the HTML options for the unit dropdown based on item type.
 * @param {string} itemType - The 'type' property of the item.
 * @param {string} selectedUnit - The unit currently selected for the item.
 * @returns {string} HTML string of <option> elements.
 */
function generateUnitOptionsHtml(itemType, selectedUnit) {
    const options = unitOptions[itemType] || unitOptions['other']; // Fallback to 'other' if type is not found
    let optionsHtml = '';
    options.forEach(option => {
        const isSelected = option.value === selectedUnit ? 'selected' : '';
        optionsHtml += `<option value="${option.value}" ${isSelected}>${option.text}</option>`;
    });
    return optionsHtml;
}




/**
 * Renders all ingredient rows for the current category in the table.
 */
function renderTable() {
    tableBody.innerHTML = ''; // Clear existing rows
    const itemsToDisplay = categories[currentCategory] || [];

    if (itemsToDisplay.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-gray-500">या श्रेणीमध्ये कोणतीही वस्तू नाही. कृपया श्रेणी निवडा किंवा नवीन वस्तू जोडा!</td></tr>`;
        return;
    }

    itemsToDisplay.forEach((item, index) => {
        const row = document.createElement('tr');
        row.classList.add(index % 2 === 0 ? 'table-row-even' : 'table-row-odd', 'hover:bg-gray-100');
        row.dataset.id = item.id;
        row.dataset.category = currentCategory; // Store category on row for updates

        const unitsHtml = generateUnitOptionsHtml(item.type, item.unit);

        row.innerHTML = `
            <td class="py-3 px-1 border-b border-gray-200 w-[55%]">
                <input type="text" value="${item.item}" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 item-input" data-field="item"  readonly>
            </td>
            <td class="py-3 px-1 border-b border-gray-200 flex items-center space-x-2 w-[100%]">
                <input type="number" step="0.01" value="${item.quantity}" class="w-[50%] p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 quantity-input" data-field="quantity" onfocus="if(this.value === '0') this.value='';" onblur="if(this.value === '') this.value='0';" >
                <select class="w-[100%] p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 unit-input" data-field="unit" >
                    ${unitsHtml}
                </select>
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
    const contentToPrint = generateAllCategoriesHtml();
    document.body.appendChild(contentToPrint); // Temporarily add to DOM for html2canvas

    const doc = new jsPDF('p', 'pt', 'a4');
    const canvas = await html2canvas(contentToPrint, { scale: 1.5 });
    const imgData = canvas.toDataURL('image/png');

    const imgWidth = 595.28;
    const pageHeight = 841.89;
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

    doc.save('साहित्य सूची.pdf');
    document.body.removeChild(contentToPrint); // Remove temporary element
}
/**
 * Downloads the currently displayed ingredient table as an image (PNG).
 */
async function downloadImage() {
    const contentToPrint = generateAllCategoriesHtml();
    document.body.appendChild(contentToPrint); // Temporarily add to DOM for html2canvas

    const canvas = await html2canvas(contentToPrint, { scale: 1.5 });
    const imgData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'साहित्य सूची.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Remove temporary element
    document.body.removeChild(contentToPrint);
}

/**
 * Shares the budget details via WhatsApp Web.
 * Note: Direct file attachment is not supported via simple web links.
 * User will need to manually share the downloaded PDF/Image.
 */
function shareWhatsapp() {
    let message = `नमस्कार! ही तुमची पूर्ण साहित्य सूची आहे:\n\n`;

    for (const categoryName in categories) {
        const items = categories[categoryName];
        const categoryItemsPresent = items.some(item => item.quantity > 0);

        if (categoryItemsPresent) { // Only include category if it has items with quantity > 0
            message += `--- ${categoryName} ---\n`;
            items.forEach(item => {
                if (item.quantity > 0) {
                    message += `- ${item.item}: ${item.quantity} ${item.unit}\n`;
                }
            });
            message += `\n`; // Add a new line after each category for readability
        }
    }

    if (message === `नमस्कार! ही तुमची पूर्ण साहित्य सूची आहे:\n\n`) {
        message += `(श्रेणीतून कोणतीही वस्तू निवडलेली नाही.)`;
    }


    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// script.js - inside the generateAllCategoriesHtml() function

function generateAllCategoriesHtml() {
    const tempDiv = document.createElement('div');
    // Main container for the PDF/Image output. Use padding for internal spacing.
    tempDiv.classList.add('p-6', 'bg-white', 'rounded-lg', 'shadow-xl');
    tempDiv.style.width = '700px'; // Fixed overall width for PDF/image consistency

    const title = document.createElement('h2');
    title.classList.add('text-2xl', 'font-bold', 'text-center', 'mb-6', 'text-gray-800', 'w-full');
    title.textContent = 'एकत्रित साहित्य सूची'; // Consolidated Ingredient List in Marathi
    tempDiv.appendChild(title);

    // Create two column containers
    const leftColumn = document.createElement('div');
    leftColumn.style.width = '340px'; // Fixed width for each column
    leftColumn.classList.add('pr-2'); // Reduced padding to the right for spacing

    const rightColumn = document.createElement('div');
    rightColumn.style.width = '340px'; // Fixed width for each column
    rightColumn.classList.add('pl-2'); // Reduced padding to the left for spacing

    // Create a flex container to hold both columns side-by-side
    const columnsContainer = document.createElement('div');
    columnsContainer.classList.add('flex', 'justify-between', 'items-start'); // align items to start for top alignment
    tempDiv.appendChild(columnsContainer); // Append this container to tempDiv

    // Get an array of category names that have items with quantity > 0
    const activeCategories = Object.keys(categories).filter(categoryName => {
        const items = categories[categoryName];
        return items.length > 0 && items.some(item => item.quantity > 0);
    });

    // Sort categories based on the number of items (as a proxy for height)
    // This helps distribute content more evenly
    activeCategories.sort((a, b) => categories[b].filter(item => item.quantity > 0).length - categories[a].filter(item => item.quantity > 0).length);


    // Distribute categories to columns based on current content height/count
    let leftColumnHeight = 0; // Using count as a proxy for height
    let rightColumnHeight = 0;

    activeCategories.forEach((categoryName) => {
        const items = categories[categoryName];
        const categoryItemCount = items.filter(item => item.quantity > 0).length;

        const categoryContentDiv = document.createElement('div'); // Container for header and table for each category
        categoryContentDiv.classList.add('mb-4'); // Reduced margin below each category block

        const categoryHeader = document.createElement('h3');
        categoryHeader.classList.add('text-lg', 'font-semibold', 'mb-1', 'text-blue-700', 'border-b-2', 'border-blue-300', 'pb-0.5'); // Reduced margin-bottom and padding-bottom
        categoryHeader.textContent = categoryName;
        categoryContentDiv.appendChild(categoryHeader);

        const categoryTable = document.createElement('table');
        // Applying the border styles to the table itself
        categoryTable.classList.add('min-w-full', 'bg-white', 'rounded-lg', 'shadow-md', 'table-fixed', 'border-collapse', 'border', 'border-black');

        // Table Header
        const thead = categoryTable.createTHead();
        const headerRow = thead.insertRow();
        headerRow.classList.add('table-header', 'text-left');
        const thItem = document.createElement('th');
        // Applying border styles and reduced padding to table header cells
        thItem.classList.add('py-1', 'px-2', 'w-[55%]', 'border', 'border-black'); // Reduced py-2 to py-1, px-3 to px-2
        thItem.textContent = 'आयटम'; // Item in Marathi
        const thQuantity = document.createElement('th');
        // Applying border styles and reduced padding to table header cells
        thQuantity.classList.add('py-1', 'px-2', 'w-[45%]', 'border', 'border-black'); // Reduced py-2 to py-1, px-3 to px-2
        thQuantity.textContent = 'प्रमाण'; // Quantity in Marathi
        headerRow.appendChild(thItem);
        headerRow.appendChild(thQuantity);
        categoryTable.appendChild(thead);

        // Table Body
        const tbody = categoryTable.createTBody();
        items.forEach((item, itemIndex) => {
            if (item.quantity > 0) { // Only include items with quantity > 0
                const row = tbody.insertRow();
                // No alternating row background classes for PDF/Image generation for solid white background
                const tdItem = row.insertCell();
                // Applying border styles and reduced padding to table data cells
                tdItem.classList.add('py-1', 'px-2', 'border-b', 'border-gray-200', 'border', 'border-black'); // Reduced py-2 to py-1, px-3 to px-2
                tdItem.textContent = item.item;
                const tdQuantity = row.insertCell();
                // Applying border styles and reduced padding to table data cells
                tdQuantity.classList.add('py-1', 'px-2', 'border-b', 'border-gray-200', 'border', 'border-black'); // Reduced py-2 to py-1, px-3 to px-2
                tdQuantity.textContent = `${item.quantity} ${item.unit}`;
            }
        });
        categoryTable.appendChild(tbody);
        categoryContentDiv.appendChild(categoryTable); // Append table to its content div

        // Append to the shorter column
        if (leftColumnHeight <= rightColumnHeight) {
            leftColumn.appendChild(categoryContentDiv);
            leftColumnHeight += categoryItemCount; // Add item count to height proxy
        } else {
            rightColumn.appendChild(categoryContentDiv);
            rightColumnHeight += categoryItemCount; // Add item count to height proxy
        }
    });

    // Append the two columns to their container
    columnsContainer.appendChild(leftColumn);
    columnsContainer.appendChild(rightColumn);

    return tempDiv;
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


