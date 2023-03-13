export const PLPage = {
  newestBtn: "جدیدترین",

  clickNewest() {
    cy.contains(this.newestBtn).click({ force: true });
  },
};
