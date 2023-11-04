document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "getDollarAmounts"}, function(response) {
        const infoDiv = document.getElementById('inflation-info');
        console.log('response', response)
        if (response && response.dollarAmounts) {
          response.dollarAmounts.forEach(amount => {
            const p = document.createElement('p');
            p.textContent = `Original: ${amount.original} - Adjusted: ${amount.adjusted}`;
            infoDiv.appendChild(p);
          });
        } else {
          infoDiv.textContent = 'No dollar amount found to adjust for inflation.';
        }
      });
    });
  });