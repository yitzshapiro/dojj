// Send the visible email content to the background script
const extractEmailContent = (): string => {
    // Simplified example; needs specific targeting based on Gmail's structure
    const emailBody = document.querySelector('[role="listitem"]')?.textContent || "";
    return emailBody;
  };
  
  chrome.runtime.sendMessage({ email: extractEmailContent() });
  