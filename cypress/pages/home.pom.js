export const homePage = {
  bestSellersBtn: "پرفروش‌ترین‌ها",
  cartBtn: "[data-cro-id='header-cart']",
  goToCartBtn: "[data-cro-id='header-see-cart']",

  clickBestSelling() {
    cy.contains(this.bestSellersBtn).click();
  },

  clickCart() {
    cy.get(this.cartBtn).click({ force: true });
  },

  goToCart() {
    cy.get(this.goToCartBtn).click({ force: true });
  },
};
