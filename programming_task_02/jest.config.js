const dynaLite = require("jest-dynalite/jest-preset");

module.exports = {
  ...dynaLite,
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
};
