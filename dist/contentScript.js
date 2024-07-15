/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!******************************!*\
  !*** ./src/content/index.ts ***!
  \******************************/

// Send the visible email content to the background script
const extractEmailContent = () => {
    var _a;
    // Simplified example; needs specific targeting based on Gmail's structure
    const emailBody = ((_a = document.querySelector('[role="listitem"]')) === null || _a === void 0 ? void 0 : _a.textContent) || "";
    return emailBody;
};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractEmail") {
        const emailContent = extractEmailContent();
        chrome.runtime.sendMessage({ email: emailContent });
        sendResponse({ status: 'emailSent' });
    }
});

/******/ })()
;
//# sourceMappingURL=contentScript.js.map