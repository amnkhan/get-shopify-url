if (window.Shopify) {
  const shopifyURL = Shopify.shop;
  const shopifyTheme = Shopify.theme;
  console.log(shopifyURL);
  console.log(shopifyTheme.name);
} else {
  console.log("This is not a Shopify store");
}
