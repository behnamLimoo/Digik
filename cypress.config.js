const { defineConfig } = require("cypress");
let tempValue;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.digikala.com/",
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      on("task", {
        setTempValue: (val) => {
          return (tempValue = val);
        },

        getTempValue: () => {
          return tempValue;
        },
      });
    },
  },
});
