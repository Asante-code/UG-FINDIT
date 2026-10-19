// 1. Starting list of items (with security questions baked in)
var foundItems = [
    {
        id: 1,
        title: "Black Samsung Phone",
        location: "Found on 2nd Floor Study Desk.",
        category: "Electronics",
        q1: "What is the phone wallpaper?",
        a1: "a sunset over the ocean",
        q2: "What colour is the phone case?",
        a2: "dark blue"
    },
    {
        id: 2,
        title: "Casio Scientific Calculator",
        location: "Found in NNB Lecture Hall 3.",
        category: "Electronics",
        q1: "What name is written on the back?",
        a1: "kwame",
        q2: "What is the model number?",
        a2: "fx-991es"
    },
    {
        id: 3,
        title: "Engineering Mathematics IV Book",
        location: "Found near Balme Library Entrance.",
        category: "Books",
        q1: "What is highlighted on the first page?",
        a1: "fourier series",
        q2: "What sticker is on the cover?",
        a2: "a red codetrain sticker"
    }
];

// 2. Check if the user just submitted a report (reads data from the URL)
var urlParams = new URLSearchParams(window.location.search);
var newTitle = urlParams.get("title");
var newCategory = urlParams.get("category");
var newLocation = urlParams.get("location");
var newQ1 = urlParams.get("q1");
var newA1 = urlParams.get("a1");
var newQ2 = urlParams.get("q2");
var newA2 = urlParams.get("a2");

// If data exists, add it to the front of our list
if (newTitle && newCategory && newLocation) {
    var reportedItem = {
        id: foundItems.length + 1,
        title: newTitle,
        category: newCategory,
        location: "Found at " + newLocation + ".",
        q1: newQ1 || "Describe the item in detail",
        a1: (newA1 || "").toLowerCase().trim(),
        q2: newQ2 || "Any unique marks on it?",
        a2: (newA2 || "").toLowerCase().trim()
    };
    foundItems.unshift(reportedItem);
}

// 3. Function to display cards on the page
function displayItems() {
    var container = document.getElementById("items-container");
    container.innerHTML = ""; // Clear container

    if (foundItems.length === 0) {
        container.innerHTML = '<p class="text-white text-center col-span-full text-lg">No items reported yet. Be the first to report a found item!</p>';
        return;
    }

    for (var i = 0; i < foundItems.length; i++) {
        var item = foundItems[i];

        // Encode the item data into the claim link so claim.html knows everything
        var claimLink = "claim.html?id=" + item.id +
                        "&title=" + encodeURIComponent(item.title) +
                        "&q1=" + encodeURIComponent(item.q1) +
                        "&a1=" + encodeURIComponent(item.a1) +
                        "&q2=" + encodeURIComponent(item.q2) +
                        "&a2=" + encodeURIComponent(item.a2);

        var cardHTML = '<div class="border border-gray-200 bg-white rounded-xl p-5 text-left shadow-sm">' +
            '<span class="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">' + item.category + '</span>' +
            '<h3 class="mt-3 font-bold text-lg text-slate-800">' + item.title + '</h3>' +
            '<p class="text-sm text-gray-500 mt-1"><i class="fa-solid fa-map-marker-alt mr-1 text-orange-500"></i> ' + item.location + '</p>' +
            '<a href="' + claimLink + '">' +
                '<button class="mt-4 w-full py-2 rounded-lg bg-slate-800 text-white text-sm font-semibold hover:bg-slate-900 cursor-pointer">' +
                    '<i class="fa-solid fa-magnifying-glass mr-2"></i>Answer to prove ownership' +
                '</button>' +
            '</a>' +
        '</div>';

        container.innerHTML += cardHTML;
    }
}

// Run when page loads
window.onload = function() {
    displayItems();
};