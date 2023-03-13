import { PLPage } from "../pages/PLP.pom";

describe("Checking the functionality of sorting in the product listing page", () => {
  beforeEach(() => {
    cy.visit("/search/category-mobile-phone/apple/");
  });

  it("Should sort PLP items by the newest", () => {
    let pageItemsTitles = [];
    cy.intercept("GET", "**/search/?sort=1&page=1", (req) => {
      req.on("response", (res) => {
        let temp;
        res.body.data.products.forEach((element) => {
          temp ? expect(element.id).to.be.below(temp) : false;
          temp = element.id;
          pageItemsTitles.push(element.title_fa);
        });
      });
    }).as("sortReq");

    PLPage.clickNewest();

    cy.wait("@sortReq").then(() => {
      cy.wrap(pageItemsTitles).each((title, index) => {
        cy.get(`[data-product-index="${index + 1}"]`)
          .find("h3")
          .invoke("text")
          .should("equal", title);
        if (index === 6) {
          return false;
        }
      });
    });
  });
});
