// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  cy.request({
    method: "POST",
    url: "https://api.digikala.com/v1/user/authenticate/",
    headers: {
      "content-type": "application/json",
      authority: "api.digikala.com",
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,fa;q=0.8",
      origin: "https://www.digikala.com",
      referer: "https://www.digikala.com/",
    },
    body: {
      backUrl: "/",
      username: username,
      otp_call: false,
    },
  })
    .then(() => {
      cy.request({
        method: "POST",
        url: "https://api.digikala.com/v1/user/login/password/",
        headers: {
          "content-type": "application/json",
          authority: "api.digikala.com",
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          origin: "https://www.digikala.com",
          referer: "https://www.digikala.com/",
        },
        body: {
          backUrl: "/",
          type: "password",
          username: username,
          password: password,
        },
      });
    })
    .then((respons) => {
      const tokenExtractor = (string) => {
        return string.substring(string.indexOf("=") + 1, string.indexOf(";"));
      };

      const keyExtractor = (string) => {
        return string.substring(0, string.indexOf("="));
      };

      cy.setCookie(
        keyExtractor(respons.headers["set-cookie"][0]),
        tokenExtractor(respons.headers["set-cookie"][0])
      );
      cy.setCookie(
        keyExtractor(respons.headers["set-cookie"][1]),
        tokenExtractor(respons.headers["set-cookie"][1])
      );
    })
    .then(() => {
      cy.request({
        method: "GET",
        url: "https://api.digikala.com/v1/user/init/",
        qs: {
          backUrl: "%2F",
        },
        headers: {
          "content-type": "application/json",
          authority: "api.digikala.com",
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,fa;q=0.8",
          origin: "https://www.digikala.com",
          referer: "https://www.digikala.com/",
        },
      });
    });
});
