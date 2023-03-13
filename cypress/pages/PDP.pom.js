export const PDPage = {
  addToCartBtn: "[data-cro-id='pdp-add-to-cart']",

  clickAddToCart() {
    cy.get(this.addToCartBtn).click({
      multiple: true,
      force: true,
    });
  },
};
