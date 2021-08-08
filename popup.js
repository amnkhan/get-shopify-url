window.addEventListener("DOMContentLoaded", () => {
  // UI Variables
  let bg = chrome.extension.getBackgroundPage();
  let wrapper = document.querySelector(".wrapper");
  let generalMessage = document.querySelector(".general-message");
  let shopifyInfoUi = document.querySelector(".shopify-info");
  let shopUrl = document.querySelector(".shop-url");
  let shopTheme = document.querySelector(".shop-theme");

  // Create the UI
  // not a shopify store
  function notAShopifyStore() {
    let p = document.createElement("p");
    p.classList.add("normal-case");
    // let i = document.createElement("a");
    // i.classList.add("fas,fa-exclamation-circle");
    // p.prepend(i);
    // p.innerText = "Sorry not a shopify website";
    p.innerHTML = `<i class="fas fa-exclamation-circle"></i>Sorry not a shopify website`;
    generalMessage.append(p);
  }

  // shopify store
  function shopifyStore(shop, theme, currency) {
    // shop
    let shopifyUrlElem = document.createElement("p");
    shopifyUrlElem.classList.add("shop-url");
    shopifyUrlElem.innerHTML = `<i class="fas fa-clipboard-check"></i>${shop}`;
    shopifyInfoUi.appendChild(shopifyUrlElem);
    // theme
    let shopifyThemeElem = document.createElement("p");
    shopifyThemeElem.classList.add("shop-theme", "normal-case");
    shopifyThemeElem.innerHTML = `<i class="fas fa-clipboard-list"></i>${theme}`;
    shopifyInfoUi.appendChild(shopifyThemeElem);
    // currency
    let shopifyCurrencyElem = document.createElement("p");
    shopifyCurrencyElem.classList.add("shop-currency", "uppercase");
    shopifyCurrencyElem.innerHTML = `<i class="fas fa-dollar-sign"></i>${currency}`;
    shopifyInfoUi.appendChild(shopifyCurrencyElem);
  }

  // Check for the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentTabId = tabs[0].id;
    let currentPerf = bg.perfWatch[currentTabId];

    // safety check: when page is still loading
    if (!currentPerf) {
      return;
    }
    // If the URL is not a shopify store
    if (currentPerf.shopify == false) {
      notAShopifyStore();
    }
    // If the URL is a shopify store
    if (currentPerf.shopify) {
      shopifyStore(
        currentPerf.shopify.shop,
        currentPerf.shopify.theme.name,
        currentPerf.shopify.currency.active
      );
    }
    // // check if shopify
    // if (shopify.shop == "undefined") {
    //   // not shopify
    //   generalMessage.innerText = "Sorry no text found";
    // } else {
    //   // shopify
    //   shopifyInfoUi.style.display = "block";
    //   generalMessage.style.display = "hidden";
    //   shopUrl.innerText = shopify.shop;
    //   shopTheme.innerText = shopify.theme.name;
    // }

    console.log(currentPerf.shopify);
  });
});
