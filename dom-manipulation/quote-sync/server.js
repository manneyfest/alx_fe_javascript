// server.js
const serverQuotes = [
    {
      id: 1,
      text: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde",
      updatedAt: "2025-06-26T12:00:00Z"
    },
    {
      id: 2,
      text: "Stay hungry, stay foolish.",
      author: "Steve Jobs",
      updatedAt: "2025-06-26T14:00:00Z"
    }
  ];
  
  // Simulate fetching from a remote server
  export function fetchQuotesFromServer() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(serverQuotes), 1000); // Simulate 1s delay
    });
  }
  