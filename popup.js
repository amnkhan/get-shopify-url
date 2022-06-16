window.addEventListener("DOMContentLoaded", () => {
  // UI Variables
  let bg = chrome.extension.getBackgroundPage();
  let generalMessage = document.querySelector(".general-message");
  let shopifyInfoUi = document.querySelector(".shopify-info");

  // Create the UI
  // not a shopify store
  function notAShopifyStore() {
    let p = document.createElement("p");
    let i = document.createElement("i");
    p.classList.add("normal-case");
    i.classList.add("fas", "fa-exclamation-circle");

    p.innerText = "Sorry, not a shopify store!";
    p.prepend(i);

    generalMessage.append(p);
  }

  function generateUI(
    elem,
    icon,
    elemClass,
    fontCase,
    iconClass,
    title,
    content
  ) {
    elem = document.createElement("p");
    icon = document.createElement("i");
    elem.classList.add(elemClass, fontCase);
    icon.classList.add("fas", iconClass);
    elem.textContent = `${title}: ${content}`;
    elem.prepend(icon);
    shopifyInfoUi.appendChild(elem);
  }

  // shopify store
  function shopifyStore(shop, theme, currency, productId) {
    // shop
    if (shop !== undefined) {
      generateUI(
        "shopifyUrlElem",
        "shopifyUrlIcon",
        "shop-url",
        "normal-case",
        "fa-clipboard-check",
        "URL",
        shop
      );
    }

    // theme
    if (theme !== undefined) {
      generateUI(
        "shopifyThemeElem",
        "shopifyThemeIcon",
        "shop-theme",
        "normal-case",
        "fa-clipboard-list",
        "Theme",
        theme
      );
    }
    // currency
    if (currency !== undefined) {
      generateUI(
        "shopifyCurrencyElem",
        "shopifyCurrencyIcon",
        "shop-currency",
        "normal-case",
        "fa-file-invoice-dollar",
        "Currency",
        currency
      );
    }

    // Product ID
    if (productId !== undefined) {
      // Product ID
      generateUI(
        "shopifyProductId",
        "shopifyProductIcon",
        "shop-product-id",
        "normal-case",
        "fa-id-badge",
        "Product id",
        productId
      );
    }
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
      console.log(currentPerf.shopify);
    }
    // If the URL is a shopify store
    if (currentPerf.shopify) {
      shopifyStore(
        currentPerf.shopify.shop,
        currentPerf.shopify.theme.name,
        currentPerf.shopify.currency.active,
        currentPerf.product.rid
      );
    }
  });
});
