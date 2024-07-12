/** Generated from: tests/features/example.feature */
import { test } from "playwright-bdd";

test.describe("Example test", () => {

  test("Example with google", async ({ Given, When, Then }) => {
    await When("I open \"https://www.google.com\" page");
    await When("I \"type\" \"playwright\" on the keyboard");
    await When("I \"press\" \"Enter\" on the keyboard");
    await Then("I verify that \"1\" element with \"playwright.dev\" \"text\" is \"visible\"");
    await Then("I wait \"1\" seconds");
    await When("I go back in the browser");
    await Then("I verify if URL \"contains\" \"https://www.google.com\"");
    await When("I get a part of the URL based on \"www.(.*?).com\" regular expression and save it as \"websiteNameVariable\"");
    await When("I \"type\" \"websiteNameVariable\" on the keyboard");
    await Then("I verify that \"1\" element with \"websiteNameVariable\" \"text\" is \"visible\"");
    await When("I \"type\" \" test with playwright-bdd-wizard finished!\" on the keyboard");
    await Then("I wait \"1.5\" seconds");
  });

});