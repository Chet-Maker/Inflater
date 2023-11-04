// Function to scan for dollar amounts and wrap them with a span
function highlightDollarAmounts() {
    const regex = /\$\d+(\.\d{2})?/g; // RegEx to find dollar amounts
    const bodyText = document.body.innerHTML;
    const matches = bodyText.match(regex);
    console.log('matches: ', matches)
    console.log('bodyText: ', bodyText)
    if (matches) {
      matches.forEach((match) => {
        // Replace the dollar amount with a highlighted span
        const highlighted = `<span class="highlighted-inflation" title="Adjusted for inflation: $${adjustForInflation(match)}">${match}</span>`;
        document.body.innerHTML = document.body.innerHTML.replace(match, highlighted);
      });
    }
  }
  
  // Dummy function to simulate inflation adjustment
  function adjustForInflation(amount) {
    // Remove the dollar sign and convert to a number
    const numericAmount = Number(amount.replace(/\$/, ''));
    // Here we use a dummy value for inflation adjustment, in a real case you'd calculate this
    const adjustedAmount = numericAmount + 200;
    return adjustedAmount.toFixed(2); // Convert back to a string with two decimal places
  }
  
  // This function adds the CSS needed to highlight the amounts
  function addHighlightingStyles() {
    console.log('addHighlighting.')
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .highlighted-inflation {
        background-color: yellow;
        cursor: pointer;
      }
      .highlighted-inflation::after {
        content: attr(title);
        visibility: hidden;
        display: block;
        position: absolute;
        padding: 5px;
        background: #000;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        z-index: 100;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
      }
      .highlighted-inflation:hover::after {
        visibility: visible;
      }
    `;
    document.head.appendChild(style);
  }
  
  // This function initializes the script
  function init() {
    addHighlightingStyles();
    highlightDollarAmounts();
    // You might need to handle dynamically loaded content as well, which is not covered here
  }
  
  // Start the script
  init();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('reques: ', request)
    if (request.action === "getDollarAmounts") {
      // Assuming you have a function that returns all dollar amounts with their adjusted values
      const dollarAmounts = getAllDollarAmountsWithAdjusted();
      sendResponse({dollarAmounts: dollarAmounts});
    }
  });
  
  // Function that scans the page for dollar amounts and returns them with adjusted values
  function getAllDollarAmountsWithAdjusted() {
    console.log('getAllDollarAmountsWithAdjusted')
    const highlightedElements = document.querySelectorAll('.highlighted-inflation');
    return Array.from(highlightedElements).map(el => {
      return { original: el.textContent, adjusted: el.getAttribute('title') };
    });
  }
  
  