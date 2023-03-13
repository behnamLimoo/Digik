export const bestSellingPage = {
  selectBestSellingItem(index = 1) {
    cy.get(`[data-product-index="${index}"]`)
      .find("a")
      .invoke("removeAttr", "target")
      .click();
  },
};
