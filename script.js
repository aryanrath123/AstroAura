document.addEventListener("DOMContentLoaded", () => {
  const quote = document.getElementById("quote");
  const author = document.getElementById("author");
  const newQuoteButton = document.getElementById("new-quote");

  function cleanAuthor(authorName) {
    const unwantedTexts = ["type.fit"];

    unwantedTexts.forEach((text) => {
      authorName = authorName.replace(text, "").trim();
    });

    authorName = authorName.replace(/,\s*$/, "").trim();

    return authorName;
  }

  function fetchAndDisplayQuote() {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        quote.innerHTML = randomQuote.text;
        let authorName = randomQuote.author
          ? cleanAuthor(randomQuote.author)
          : "Unknown";
        author.innerHTML = authorName;
      })
      .catch((error) => {
        quote.innerHTML = "An error occurred. Please try again.";
        author.innerHTML = "";
      });
  }

  fetchAndDisplayQuote();
  newQuoteButton.addEventListener("click", fetchAndDisplayQuote);
});
