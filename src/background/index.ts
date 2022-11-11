import injectedHelper from "./injected-helper"

chrome.tabs.onUpdated.addListener((tabId) => {
  injectedHelper(tabId)
})
