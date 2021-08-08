window.addEventListener("DOMContentLoaded", () => {
  // UI Variables
  let bg = chrome.extension.getBackgroundPage();
  let wrapper = document.querySelector(".wrapper");
  let generalMessage = document.querySelector(".general-message p");
  let shopifyInfoUi = document.querySelector(".shopify-info");
  let shopUrl = document.querySelector(".shop-url");
  let shopTheme = document.querySelector(".shop-theme");

  // Check for the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentTabId = tabs[0].id;
    let currentPerf = bg.perfWatch[currentTabId];
    let shopify = currentPerf.shopify;

    // safety check: when page is still loading
    if (!currentPerf) {
      return;
    }

    // check if shopify
    if (shopify.shop == "undefined") {
      // not shopify
      generalMessage.textContent = "Sorry no text found";
    } else {
      // shopify
      shopifyInfoUi.style.display = "block";
      generalMessage.style.display = "hidden";
      shopUrl.textContent = shopify.shop;
      shopTheme.textContent = shopify.theme.name;
    }
  });
});
