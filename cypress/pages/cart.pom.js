export const cartPage = {
  deleteBtn: "[data-cro-id='cart-delete-item-right']",

  clickDelete() {
    cy.get(this.deleteBtn).eq(0).click();
  },
};
