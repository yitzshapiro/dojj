/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!****************************!*\
  !*** ./src/popup/index.ts ***!
  \****************************/

var _a;
(_a = document.getElementById('extractTasks')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    const boardId = document.getElementById('boardId').value;
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        // Send a message to the background script to relay to the content script
        chrome.tabs.sendMessage(tabs[0].id, { action: "requestEmailContent", apiKey, boardId });
    });
});

/******/ })()
;
//# sourceMappingURL=popup.js.map