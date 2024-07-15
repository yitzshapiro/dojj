document.getElementById('extractTasks')?.addEventListener('click', () => {
  const apiKey = (document.getElementById('apiKey') as HTMLInputElement).value;
  const boardId = (document.getElementById('boardId') as HTMLInputElement).value;
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    // Send a message to the background script to relay to the content script
    chrome.tabs.sendMessage(tabs[0].id!, {action: "requestEmailContent", apiKey, boardId});
  });
});
