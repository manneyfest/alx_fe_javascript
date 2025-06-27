// ✅ Step 1: Store initial quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Productivity" }
  ];
  
  // ✅ Step 2: Get DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteBtn = document.getElementById('newQuote');
  const newQuoteTextInput = document.getElementById('newQuoteText');
  const newQuoteCategoryInput = document.getElementById('newQuoteCategory');
  
  // ✅ Step 3: Show a random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerText = "No quotes available. Please add one.";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
  }
  
  // ✅ Step 4: Add a new quote
  function addQuote() {
    const newText = newQuoteTextInput.value.trim();
    const newCategory = newQuoteCategoryInput.value.trim();
  
    if (newText === "" || newCategory === "") {
      alert("Please fill in both the quote and category.");
      return;
    }
  
    // Add the new quote to the array
    quotes.push({ text: newText, category: newCategory });
  
    // Clear input fields
    newQuoteTextInput.value = "";
    newQuoteCategoryInput.value = "";
  
    alert("Quote added successfully!");
  }
  
  // ✅ Step 5: Attach event listener to button
  newQuoteBtn.addEventListener('click', showRandomQuote);
  