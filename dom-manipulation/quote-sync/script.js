// script.js
import { fetchQuotesFromServer } from './server.js';

const quoteList = document.getElementById('quote-list');
let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

function renderQuotes() {
  quoteList.innerHTML = '';
  localQuotes.forEach(quote => {
    const li = document.createElement('li');
    li.textContent = `"${quote.text}" — ${quote.author}`;
    quoteList.appendChild(li);
  });
}

function showNotification(message) {
  const div = document.createElement('div');
  div.textContent = message;
  div.style.backgroundColor = 'lightgreen';
  div.style.padding = '10px';
  div.style.textAlign = 'center';
  document.body.prepend(div);
  setTimeout(() => div.remove(), 3000);
}

function syncWithServer() {
  fetchQuotesFromServer().then(serverQuotes => {
    let updated = false;

    serverQuotes.forEach(serverQuote => {
      const localQuote = localQuotes.find(q => q.id === serverQuote.id);

      if (!localQuote) {
        // New quote from server
        localQuotes.push(serverQuote);
        updated = true;
      } else if (new Date(serverQuote.updatedAt) > new Date(localQuote.updatedAt)) {
        // Conflict: server version is newer
        Object.assign(localQuote, serverQuote);
        updated = true;
      }
    });

    if (updated) {
      localStorage.setItem('quotes', JSON.stringify(localQuotes));
      renderQuotes();
      showNotification('Quotes synced with server');
    }
  }).catch(() => {
    showNotification('Failed to sync with server');
  });
}

renderQuotes();
setInterval(syncWithServer, 10000); // Sync every 10 seconds
