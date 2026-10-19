                            
// Data Store for Lost & Found Items
const INITIAL_ITEMS = [
{
    id: 1,
    title: "Brown Leather Wallet",
    status: "Found",
    category: "Wallets",
    location: "Main Library",
    timeAgo: "2 hrs ago",
    timestamp: Date.now() - 2 * 3600 * 1000,
    desc: "Contains student ID and red key fob card.",
    bgClass: "bg-amber-100/90",
    borderClass: "border-amber-200/80",
    iconBgClass: "bg-amber-200/80",
    iconColorClass: "text-amber-800",
    secQuestion: "What color is the key fob card inside?",
    svgType: "wallet"
},
{
    id: 2,
    title: "Black Phone, Clear Case",
    status: "Lost",
    category: "Phones",
    location: "Engineering Block",
    timeAgo: "Yesterday",
    timestamp: Date.now() - 24 * 3600 * 1000,
    desc: "iPhone 13 with small sticker on bottom corner.",
    bgClass: "bg-sky-100/90",
    borderClass: "border-sky-200/80",
    iconBgClass: "bg-sky-200/80",
    iconColorClass: "text-sky-800",
    secQuestion: "What wallpaper image is on the lock screen?",
    svgType: "phone"
},
{
    id: 3,
    title: "Set of Three Keys",
    status: "Found",
    category: "Keys",
    location: "Central Cafeteria",
    timeAgo: "Yesterday",
    timestamp: Date.now() - 26 * 3600 * 1000,
    desc: "3 silver keys attached to a blue lanyard.",
    bgClass: "bg-slate-200/80",
    borderClass: "border-slate-300",
    iconBgClass: "bg-slate-300/80",
    iconColorClass: "text-slate-700",
    secQuestion: "What brand name is written on the lanyard?",
    svgType: "keys"
},
{
    id: 4,
    title: "Teal Backpack",
    status: "Lost",
    category: "Bags",
    location: "Bus Stop Gate 2",
    timeAgo: "2 days ago",
    timestamp: Date.now() - 48 * 3600 * 1000,
    desc: "Contains notebook and silver water bottle.",
    bgClass: "bg-emerald-100/90",
    borderClass: "border-emerald-200/80",
    iconBgClass: "bg-emerald-200/80",
    iconColorClass: "text-emerald-800",
    secQuestion: "What is the label name on the front notebook?",
    svgType: "backpack"
},
{
    id: 5,
    title: "Red Wireless Headphones",
    status: "Lost",
    category: "Headphones",
    location: "Lecture Hall B",
    timeAgo: "3 days ago",
    timestamp: Date.now() - 72 * 3600 * 1000,
    desc: "Over-ear Sony Bluetooth headphones.",
    bgClass: "bg-rose-100/90",
    borderClass: "border-rose-200/80",
    iconBgClass: "bg-rose-200/80",
    iconColorClass: "text-rose-800",
    secQuestion: "Are there any scratch marks on the left ear cup?",
    svgType: "headphones"
},
{
    id: 6,
    title: "Student ID Card",
    status: "Found",
    category: "ID cards",
    location: "Admin Office",
    timeAgo: "3 days ago",
    timestamp: Date.now() - 75 * 3600 * 1000,
    desc: "University of Ghana Student ID card.",
    bgClass: "bg-indigo-100/90",
    borderClass: "border-indigo-200/80",
    iconBgClass: "bg-indigo-200/80",
    iconColorClass: "text-indigo-800",
    secQuestion: "What is the initials/first name on the ID?",
    svgType: "idcard"
}
];

let itemsData = [...INITIAL_ITEMS];
let categories = ["Wallets", "Phones", "Keys", "Bags", "ID cards", "Headphones"];
let activeStatusFilter = 'all';
let currentModalReportType = 'Lost';
let activeSelectedItem = null;

// SVG Render Helpers
function getSVGIcon(type, colorClass = "") {
switch(type) {
    case 'wallet':
        return `<svg class="w-10 h-10 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>`;
    case 'phone':
        return `<svg class="w-10 h-10 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`;
    case 'keys':
        return `<svg class="w-10 h-10 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>`;
    case 'backpack':
        return `<svg class="w-10 h-10 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>`;
    case 'headphones':
        return `<svg class="w-10 h-10 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 00-14 0m0 0v6a2 2 0 002 2h2a2 2 0 002-2v-4a2 2 0 00-2-2H5zm14 0v6a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4a2 2 0 012-2h2z"/></svg>`;
    case 'idcard':
        return `<svg class="w-10 h-10 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4m-6 7a2 2 0 11-4 0 2 2 0 014 0zm6 4p-3 0 00-6 0"/></svg>`;
    default:
        return `<svg class="w-10 h-10 ${colorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`;
}
}

// Initialize Page
window.addEventListener('DOMContentLoaded', () => {
renderHeroPills();
renderCategoryCheckboxes();
renderRecentHomeGrid();
renderBrowseGrid(itemsData);
});

// Navigation Switcher
function switchView(viewName) {
const homeView = document.getElementById('view-home');
const browseView = document.getElementById('view-browse');
const navHome = document.getElementById('nav-home');
const navBrowse = document.getElementById('nav-browse');

if (viewName === 'home') {
    homeView.classList.remove('hidden');
    browseView.classList.add('hidden');
    navHome.classList.add('text-brand-900', 'border-b-2', 'border-brand-900', 'pb-1');
    navBrowse.classList.remove('text-brand-900', 'border-b-2', 'border-brand-900', 'pb-1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
} else {
    homeView.classList.add('hidden');
    browseView.classList.remove('hidden');
    navBrowse.classList.add('text-brand-900', 'border-b-2', 'border-brand-900', 'pb-1');
    navHome.classList.remove('text-brand-900', 'border-b-2', 'border-brand-900', 'pb-1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
}

// Hero Quick Pill Rendering
function renderHeroPills() {
const container = document.getElementById('hero-pills');
container.innerHTML = categories.map(cat => `
    <button onclick="filterByQuickPill('${cat}')" class="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-brand-900 hover:text-brand-900 transition-all shadow-sm">
        ${cat}
    </button>
`).join('');
}

function filterByQuickPill(category) {
switchView('browse');
// Check only selected category
categories.forEach(cat => {
    const el = document.getElementById(`cat-check-${cat.replace(/\s+/g, '')}`);
    if (el) el.checked = (cat === category);
});
applyFilters();
}

// Render Category Filter Checkboxes
function renderCategoryCheckboxes() {
const container = document.getElementById('filter-categories-container');
container.innerHTML = categories.map(cat => `
    <label class="flex items-center space-x-2.5 cursor-pointer text-sm text-slate-700 hover:text-slate-900">
        <input type="checkbox" id="cat-check-${cat.replace(/\s+/g, '')}" value="${cat}" onchange="applyFilters()" class="w-4 h-4 text-brand-900 rounded border-slate-300 focus:ring-brand-900">
        <span class="font-medium">${cat}</span>
    </label>
`).join('');
}

// Card HTML Template Generator
function createCardHTML(item) {
const isFound = item.status === 'Found';
const badgeBg = isFound ? 'bg-emerald-600' : 'bg-rose-500';

return `
    <div onclick="openClaimModal(${item.id})" class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group transform hover:-translate-y-1">
        <!-- Top Illustration Banner -->
        <div class="${item.bgClass} p-6 border-b ${item.borderClass} flex items-center justify-center relative min-h-[140px]">
            <div class="${item.iconBgClass} p-4 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                ${getSVGIcon(item.svgType, item.iconColorClass)}
            </div>
            <span class="absolute top-3 right-3 ${badgeBg} text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                ${item.status}
            </span>
        </div>
        <!-- Body Content -->
        <div class="p-5">
            <div class="text-xs text-slate-500 font-medium mb-1">
                ${item.location} &bull; ${item.timeAgo}
            </div>
            <h3 class="font-bold text-slate-900 text-lg group-hover:text-brand-900 transition-colors">${item.title}</h3>
            <p class="text-xs text-slate-600 mt-1.5 line-clamp-2">${item.desc}</p>
            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">${item.category}</span>
                <span class="text-xs font-bold text-brand-900 group-hover:underline inline-flex items-center">
                    Claim / Contact &rarr;
                </span>
            </div>
        </div>
    </div>
`;
}

// Render Home Grid (6 Recent)
function renderRecentHomeGrid() {
const container = document.getElementById('home-recent-grid');
const recent = itemsData.slice(0, 6);
container.innerHTML = recent.map(item => createCardHTML(item)).join('');
}

// Render Browse Grid
function renderBrowseGrid(data) {
const container = document.getElementById('browse-items-grid');
const countEl = document.getElementById('results-count');
const noResults = document.getElementById('no-results');

countEl.textContent = `Showing ${data.length} of ${itemsData.length} reports`;

if (data.length === 0) {
    container.innerHTML = '';
    noResults.classList.remove('hidden');
} else {
    noResults.classList.add('hidden');
    container.innerHTML = data.map(item => createCardHTML(item)).join('');
}
}

// Handle Hero Search
function handleHeroSearch(event) {
event.preventDefault();
const query = document.getElementById('hero-search-input').value.trim();
switchView('browse');
document.getElementById('filter-search').value = query;
applyFilters();
}

// Filter Logic
function applyFilters() {
const searchQuery = document.getElementById('filter-search').value.toLowerCase().trim();
const locationQuery = document.getElementById('filter-location').value.toLowerCase().trim();
const dateVal = document.getElementById('filter-date').value;

// Selected Categories
const selectedCats = categories.filter(cat => {
    const el = document.getElementById(`cat-check-${cat.replace(/\s+/g, '')}`);
    return el && el.checked;
});

const filtered = itemsData.filter(item => {
    // Status Filter
    if (activeStatusFilter !== 'all' && item.status !== activeStatusFilter) return false;

    // Search Query
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery) && !item.desc.toLowerCase().includes(searchQuery)) return false;

    // Location Filter
    if (locationQuery && !item.location.toLowerCase().includes(locationQuery)) return false;

    // Category Checkboxes
    if (selectedCats.length > 0 && !selectedCats.includes(item.category)) return false;

    // Date Filter logic
    if (dateVal === '24h' && (Date.now() - item.timestamp > 24 * 3600 * 1000)) return false;
    if (dateVal === 'week' && (Date.now() - item.timestamp > 7 * 24 * 3600 * 1000)) return false;
    if (dateVal === 'month' && (Date.now() - item.timestamp > 30 * 24 * 3600 * 1000)) return false;

    return true;
});

renderBrowseGrid(filtered);
}

function setStatusFilter(status) {
activeStatusFilter = status;

// Tab Styling
['all', 'lost', 'found'].forEach(t => {
    const btn = document.getElementById(`status-tab-${t}`);
    if (t === status.toLowerCase()) {
        btn.className = "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all bg-brand-900 text-white shadow-sm";
    } else {
        btn.className = "px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all";
    }
});

applyFilters();
}

function resetFilters() {
document.getElementById('filter-search').value = '';
document.getElementById('filter-location').value = '';
document.getElementById('filter-date').value = 'all';
categories.forEach(cat => {
    const el = document.getElementById(`cat-check-${cat.replace(/\s+/g, '')}`);
    if (el) el.checked = false;
});
setStatusFilter('all');
applyFilters();
}

// REPORT MODAL LOGIC
function openReportModal(defaultType = 'Lost') {
setReportType(defaultType);
document.getElementById('modal-report').classList.remove('hidden');
}

function closeReportModal() {
document.getElementById('modal-report').classList.add('hidden');
}

function setReportType(type) {
currentModalReportType = type;
const lostBtn = document.getElementById('toggle-type-lost');
const foundBtn = document.getElementById('toggle-type-found');

if (type === 'Lost') {
    lostBtn.className = "py-2 text-xs font-bold rounded-lg transition-all bg-white text-slate-900 shadow-sm";
    foundBtn.className = "py-2 text-xs font-bold rounded-lg transition-all text-slate-600";
    document.getElementById('report-modal-title').textContent = "Report a Lost Item";
} else {
    foundBtn.className = "py-2 text-xs font-bold rounded-lg transition-all bg-white text-slate-900 shadow-sm";
    lostBtn.className = "py-2 text-xs font-bold rounded-lg transition-all text-slate-600";
    document.getElementById('report-modal-title').textContent = "Report a Found Item";
}
}

function handleReportSubmit(event) {
event.preventDefault();
const title = document.getElementById('report-title').value;
const category = document.getElementById('report-category').value;
const location = document.getElementById('report-location').value;
const dateStr = document.getElementById('report-date').value;
const desc = document.getElementById('report-desc').value;
const secQuestion = document.getElementById('report-sec-q').value;

// Simple map SVG type
let svgType = 'wallet';
if (category.includes('Phone')) svgType = 'phone';
else if (category.includes('Key')) svgType = 'keys';
else if (category.includes('Bag')) svgType = 'backpack';
else if (category.includes('Headphone')) svgType = 'headphones';
else if (category.includes('ID')) svgType = 'idcard';

const newItem = {
    id: Date.now(),
    title: title,
    status: currentModalReportType,
    category: category,
    location: location,
    timeAgo: dateStr,
    timestamp: Date.now(),
    desc: desc,
    bgClass: currentModalReportType === 'Found' ? "bg-emerald-100/90" : "bg-sky-100/90",
    borderClass: currentModalReportType === 'Found' ? "border-emerald-200" : "border-sky-200",
    iconBgClass: currentModalReportType === 'Found' ? "bg-emerald-200/80" : "bg-sky-200/80",
    iconColorClass: currentModalReportType === 'Found' ? "text-emerald-800" : "text-sky-800",
    secQuestion: secQuestion,
    svgType: svgType
};

itemsData.unshift(newItem);
renderRecentHomeGrid();
renderBrowseGrid(itemsData);
closeReportModal();

// Clear Form
document.getElementById('report-title').value = '';
document.getElementById('report-desc').value = '';
document.getElementById('report-sec-q').value = '';

// Switch to Browse to see listing
switchView('browse');
}


// CLAIM / VERIFY MODAL LOGIC
function openClaimModal(itemId) {
const item = itemsData.find(i => i.id === itemId);
if (!item) return;

activeSelectedItem = item;
document.getElementById('claim-modal-title').textContent = `${item.title}`;
document.getElementById('claim-item-name').textContent = item.title;
document.getElementById('claim-item-location').textContent = `${item.location} · ${item.timeAgo}`;
document.getElementById('claim-item-desc').textContent = item.desc;
document.getElementById('claim-sec-question').textContent = `"${item.secQuestion}"`;

const badge = document.getElementById('claim-modal-badge');
badge.textContent = item.status;
badge.className = item.status === 'Found' 
    ? "px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white" 
    : "px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white";

const iconContainer = document.getElementById('claim-modal-svg');
const iconBg = document.getElementById('claim-modal-icon-bg');
iconBg.className = `w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${item.iconBgClass}`;
iconContainer.innerHTML = getSVGIcon(item.svgType, item.iconColorClass);

// Reset Steps
document.getElementById('claim-verification-step').classList.remove('hidden');
document.getElementById('claim-success-step').classList.add('hidden');
document.getElementById('claim-answer').value = '';
document.getElementById('claim-contact').value = '';

document.getElementById('modal-claim').classList.remove('hidden');
}

function closeClaimModal() {
document.getElementById('modal-claim').classList.add('hidden');
}

function submitClaimAnswer() {
const answer = document.getElementById('claim-answer').value.trim();
const contact = document.getElementById('claim-contact').value.trim();

if (!answer || !contact) {
    alert('Please provide both an answer and your contact number to proceed.');
    return;
}

document.getElementById('claim-verification-step').classList.add('hidden');
document.getElementById('claim-success-step').classList.remove('hidden');
}