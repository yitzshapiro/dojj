// Send the visible email content to the background script
const extractEmailContent = (): string => {
    // Simplified example; needs specific targeting based on Gmail's structure
    const emailBody = document.querySelector('[role="listitem"]')?.textContent || "";
    return emailBody;
  };

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractEmail") {
      const emailContent = extractEmailContent();
      chrome.runtime.sendMessage({email: emailContent});
      sendResponse({status: 'emailSent'});
    }
  });
  