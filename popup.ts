document.getElementById('extractTasks')?.addEventListener('click', () => {
    const apiKey = (document.getElementById('apiKey') as HTMLInputElement).value;
    const boardId = (document.getElementById('boardId') as HTMLInputElement).value;
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id!, {action: "extractTasks", apiKey, boardId});
    });
  });
  