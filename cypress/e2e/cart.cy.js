import { bestSellingPage } from "../pages/bestSelling.pom";
import { cartPage } from "../pages/cart.pom";
import { homePage } from "../pages/home.pom";
import { PDPage } from "../pages/PDP.pom";

describe("Checking to add and delete an item from the cart", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("user").then((user) => {
      cy.login(user.userName, user.passWord);
    });
  });

  it("Should add an item and check the cart for it then delete the item", () => {
    cy.intercept("POST", "https://api.digikala.com/v1/cart/add/").as(
      "productIdAdded"
    );

    homePage.clickBestSelling();
    bestSellingPage.selectBestSellingItem();
    PDPage.clickAddToCart();
    cy.wait("@productIdAdded").then((obj) => {
      cy.task("setTempValue", obj.response.body.data.cart_items[0].product.id);
    });
    homePage.clickCart();
    homePage.goToCart();

    cy.task("getTempValue").then((productId) => {
      cy.intercept("GET", "https://api.digikala.com/v1/cart/", (req) => {
        req.on("response", (res) => {
          expect(productId).be.equal(res.body.data.cart_items[0].product.id);
        });
      }).as("cart");
    });

    cy.wait("@cart").then(() => {
      cartPage.clickDelete();
    });
  });
});
