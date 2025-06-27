// ✅ Load quotes from localStorage or use defaults
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Productivity" }
  ];
  
  // ✅ DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const newQuoteTextInput = document.getElementById('newQuoteText');
  const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
  const categoryFilter = document.getElementById('categoryFilter');
  
  // ✅ Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // ✅ Populate dropdown with unique categories
  function populateCategories() {
    const uniqueCategories = [...new Set(quotes.map(q => q.category))];
    
    // Clear dropdown except the first "All" option
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    uniqueCategories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    }
  
    );
  
    // Restore last selected filter from storage (if any)
    const savedFilter = localStorage.getItem('selectedCategory');
    if (savedFilter) {
      categoryFilter.value = savedFilter;
      filterQuotes();
    }
  }
  
  // ✅ Filter and display quotes by selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory); // remember user choice
  
    let filteredQuotes = quotes;
  
    if (selectedCategory !== 'all') {
      filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes found in this category.</p>";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
  
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
  }
  
  // ✅ Add a new quote
  function addQuote() {
    const text = newQuoteTextInput.value.trim();
    const category = newQuoteCategoryInput.value.trim();
  
    if (!text || !category) {
      alert("Please enter both quote and category.");
      return;
    }
  
    quotes.push({ text, category });
    saveQuotes();
  
    newQuoteTextInput.value = "";
    newQuoteCategoryInput.value = "";
  
    populateCategories(); // update dropdown
    alert("Quote added!");
  }
  
  // ✅ Export quotes as JSON file
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  // ✅ Import quotes from uploaded JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
  
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (!Array.isArray(importedQuotes)) throw new Error("Invalid JSON");
  
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
      } catch (err) {
        alert('Invalid file. Please upload a valid JSON.');
      }
    };
  
    fileReader.readAsText(event.target.files[0]);
  }
  
  // ✅ Show random quote button listener
  newQuoteBtn.addEventListener('click', filterQuotes);
  
  // ✅ Load on page load
  window.onload = function () {
    populateCategories();
  };
  