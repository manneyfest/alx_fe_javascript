// ✅ Global Quotes Array (loaded from localStorage or defaults)
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Productivity" }
  ];
  
  // ✅ DOM Elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const newQuoteTextInput = document.getElementById('newQuoteText');
  const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
  
  // ✅ Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // ✅ Show random quote and store it in sessionStorage
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerText = "No quotes available.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
  
    // Save last shown quote in sessionStorage
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
  }
  
  // ✅ Add a new quote
  function addQuote() {
    const newText = newQuoteTextInput.value.trim();
    const newCategory = newQuoteCategoryInput.value.trim();
  
    if (!newText || !newCategory) {
      alert("Please fill in both quote and category.");
      return;
    }
  
    quotes.push({ text: newText, category: newCategory });
    saveQuotes();
  
    newQuoteTextInput.value = "";
    newQuoteCategoryInput.value = "";
  
    alert("Quote added successfully!");
  }
  
  // ✅ Export quotes to JSON file
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  // ✅ Import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
  
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
  
        if (!Array.isArray(importedQuotes)) {
          throw new Error("Invalid format");
        }
  
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } catch (error) {
        alert('Error importing quotes. Please check the JSON file format.');
      }
    };
  
    fileReader.readAsText(event.target.files[0]);
  }
  
  // ✅ Event listener for Show New Quote
  newQuoteBtn.addEventListener('click', showRandomQuote);
  
  // ✅ Optional: Show last viewed quote on page load (if it exists)
  window.onload = function () {
    const lastQuote = sessionStorage.getItem('lastQuote');
    if (lastQuote) {
      const quote = JSON.parse(lastQuote);
      quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
    }
  };
  