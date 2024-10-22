# playwright-bdd-wizard

## Description

`playwright-bdd-wizard` is an easy-to-use TypeScript library designed to simplify Playwright BDD (Behavior-Driven Development) tests by providing a comprehensive set of reusable and flexible common steps. With these steps, you can write test scenarios using human-understandable language, significantly reducing or even avoiding the need for coding.

## Benefits

Using `playwright-bdd-wizard` offers several benefits:

- **Speeds up writing tests**: By providing pre-built, reusable steps, you can quickly write and modify tests without deep coding knowledge.
- **Enhances readability**: Test scenarios are written in human-understandable language, making them easy to read and understand.
- **Reduces maintenance**: With reusable steps, maintaining and updating tests becomes simpler and less time-consuming.
- **Facilitates collaboration**: Non-technical team members can contribute to writing and reviewing test scenarios.

### Example generated by the library:

- **Scenario: Example with Google**
   - **When I open "https://www.google.com" page**
   - **Then If its visible, I "click" the "2" element with "Reject all" "text"**
   - **And I "type" "playwright" in the "1" element with "Search" "title"**
   - **And I "press" "Enter"**
   - **Then I verify that "1" element with "playwright.dev" "text" is "visible"**
   - **And I wait "1" seconds**
   - **When I go back in the browser**
   - **Then I verify if the URL "contains" "https://www.google.com"**
   - **When I get a part of the URL based on "www.(.*?).com" regular expression and save it as "websiteNameVariable"**
   - **When I "type" "websiteNameVariable"**
   - **Then I verify that "1" element with "websiteNameVariable" "text" is "visible"**
   - **When I "type" " test with playwright-bdd-wizard finished!"**
   - **And I wait "1.5" seconds**
   - **Then I verify that "1" element with "finished!" "text" is "visible"**

These steps encapsulate common interactions and validations within your Playwright tests, allowing you to focus more on defining scenarios in natural language and less on writing and maintaining test automation code.

To add your own tests, just create more .feature files with your scenarios in the tests/features directory. One feature file can contain multiple scenarios. Remember that the steps have to be built exactly like the examples in the HOW TO USE section. Words need to be in the correct order, and the parameters need to be in quotation marks. Every step should start with either Given, When, or Then.

If you're running your tests using the Playwright UI runner, remember you need to run the npx bddgen command every time you add or edit a scenario so the Playwright runner can pick up the changes.

## Installation Guide

### Step 1: Initialize Playwright Project

If you don’t have a Playwright project yet, you'll need to install it. If you already have it, skip to Step 2.

1. Initialize Playwright:
    ```sh
    npm init playwright@latest
    ```
2. During the installation, it will ask if you prefer using JavaScript or TypeScript. It is recommended to use TypeScript.
3. It is also preferred to choose the “tests” folder to store your tests.

For more information, visit the [Playwright documentation](https://playwright.dev/docs/intro).

### Step 2: Install `playwright-bdd-wizard`

1. Install the provided version of `playwright-bdd-wizard`:
    ```sh
    npm i @exlabs/playwright-bdd-wizard
    ```
    This will create example tests in the `tests/features` directory.

### Step 3: Update Configuration

1. Update playwright `defineConfig()` in your `playwright.config.ts` file, so that the tests are taken from the autogenerated files in the `.features-gen` directory:
    ```ts
      testDir: '.features-gen',
    ```

### Step 4: Running the Tests
  
1. To run the tests, use the following command:
    ```sh
    npx bddgen && npx playwright test --project=chromium --headed
    ```
    This command specifies that you want to run it just on Chrome in headed mode.

You should now be set up to use the `playwright-bdd-wizard` library in your Playwright BDD tests!



## How to use

### Steps are divided into 4 groups:

1. General Action
2. Click
3. Insert
4. Verify

Every step should start with either **Given**, **When** or **Then**.

### General Action steps:

1. **I open {string} page**
   - Under the {string}, you can put:
     - an URL that starts with “http”/”https”
     - a process variable you've saved before
     - an URL name from URLs you have saved. How to set up test data, which can be used by `playwright-bdd-wizard` steps, will be described later.
    
    Examples:
     - When I open "https://www.google.com" in the browser
     - When I open "savedUrl" in the browser

2. **I go back in the browser**
   - Just go back to the previous page.

3. **I save the current URL as {string}**
   - It saves current URL to the variable that you can use later
   
   Example:
    - When I save the current URL as "savedUrl"


4. **I zoom to {string} in the browser**
   - It zooms in or out in the browser.
   
   Example:
     - Then I zoom to "0.5" in the browser

5. **I reload the page**
   - Just reloads the page in the browser.

6. **I wait {string} seconds**
   - Makes the test wait for a given amount of seconds.
   
   Example:
     - Then I wait "1.5" seconds

7. **I wait for the page to load**
   - It uses `await this.page.waitForLoadState('load')` but also uses `playwright-bdd-wizard` function to wait for the loading messages to disappear (how to set up test data loading messages will be described later).

8. **I get a part of the URL based on {string} regular expression and save it as {string}**
   - Under the first {string}, you put your regular expression based on which you want to receive a string taken from the browser's URL. The second {string} will be a name for your env.process variable, which you can then reuse in other steps.
   
   Examples:
     - When I get a part of the URL based on "https:\/\/www\.(.*?)\.com" regular expression and save it as "websiteNameVariable"
     - When I "type" "websiteNameVariable"
     - Then I verify that "1" element with "websiteNameVariable" "text" is "visible"

9. **I {'press' | 'type'} {string}**
   - It types a given text or text saved in the process variable. It can also press keys from the keyboard.
   
   Examples:
     - Then I "press" "Enter"
     - Then I "type" "Some text"
     - Then I "type" "previouslySavedVariable"


### Click Actions:

1. **I {'click' | 'dispatch click' | 'force click' | 'force dispatch click'} the {string} element that contains {string}**
   - The first {string} defines the type of click you want to perform. Available types of clicks: 'click' | 'dispatch click' | 'force click' | 'force dispatch click'.
   - The second {string} defines the type of element you want to click.
   - The third {string} defines a text that the element you want to click contains.
   
   Example:
     - Then I "click" the "button" element that contains "save"

2. **I {'click' | 'dispatch click' | 'force click' | 'force dispatch click'} the {string} element with {string} {string}**
   - The first {string} defines the type of click you want to perform. Available types of clicks: 'click' | 'dispatch click' | 'force click' | 'force dispatch click'.
   - The second {string} specifies which element you want to click. Since there may be multiple similar elements on the page, you should define whether you want to click the first, second, third, and so on.
   - The third {string} specifies the text used to locate the element.
   - The fourth {string} specifies how you want to locate it. Available methods to locate it are: 'text' | 'label' | 'placeholder' | 'role' | 'test ID' | 'alternative text' | 'title' | 'locator'.
   
   Examples:
     - When I "click" the "1" element with "Save and Refresh" "text"
     - When I "force click" the "3" element with "exit" "label"
     - When I "force click" the "3" element with "[class^='class-name']" "locator"


## Insert Actions:

1. **I fill {string} into the {string} dropdown**
   - The first {string} specifies the text you want to select.
   - The second {string} specifies the label of the dropdown where you want to select the text.
   
   Example:
     - Then I fill "United Kingdom" into the "Country" dropdown

2. **I {'type' | 'fill' | 'choose' } {string} in the {string} element with {string} {string}**
   - The first {string} defines the type of action you want to perform: 'type' | 'fill' | 'choose'.
   - The second {string} specifies the text you want to use.
   - The third {string} specifies which element you want to interact with. There may be multiple similar elements on the page, so you should define whether you want to interact with the first, second, third, and so on.
   - The fourth {string} specifies the text used to locate the element.
   - The fifth {string} specifies how you want to locate it. Available ways to locate it are: 'text' | 'label' | 'placeholder' | 'role' | 'test ID' | 'alternative text' | 'title' | 'locator'.
   
   Examples:
     - When I "type" "United Kingdom" in the "1” element with "Country" "label"
     - When I "choose" "United Kingdom" in the "2" element with "Country dropdown" "label"
     - When I "type" "United Kingdom" in the "3" element with "Type country" "placeholder"


## Verify Actions:

1. **I verify if a new tab which URL {'contains' | 'doesntContain' | 'equals'} {string} opens**
   - It verifies if a new browser tab opens with a specified URL.
   - The first {string} defines the assertion type. It can be: 'contains' | 'doesntContain' | 'equals'
   - The second {string} defines what it should be asserted against. It can be any text, a saved URL name, or a saved process variable.
   
   Examples:
     - Then I verify if a new tab which URL "contains" "mySavedVariable" opens
     - Then I verify if a new tab which URL "equals" "https://www.google.com" opens
     - Then I verify if a new tab which URL "doesntContain" "landingPageUrl" opens

2. **I verify if the URL {'contains' | 'doesntContain' | 'equals'} {string}**
   - It verifies the current page URL.
   - The first {string} defines the assertion type. It can be: 'contains' | 'doesntContain' | 'equals'
   - The second {string} defines what it should be asserted against. It can be any text, a saved URL name, or a saved process variable.

   Examples:
     - Then I verify if the URL "contains" "mySavedVariable" opens
     - Then I verify if the URL "equals" "https://www.google.com" opens
     - Then I verify if the URL "doesntContain" "landingPageUrl" opens

3. **I verify that a {string} element with {string} text {"is" | "is not"} visible**
   - It verifies if a given element is visible or not.
   - The first {string} specifies which element you want to interact with. There may be multiple similar elements on the page, so you should define whether you want to interact with the first, second, third, and so on.
   - The second {string} specifies the type of element you want to interact with.
   - The third {string} specifies whether you are doing a positive or negative assertion. It can be: "is" | "is not".
   
   Examples:
     - Then I verify that a "button" element with "Save" text "is" visible
     - Then I verify that a "h2" element with "Wrong page title" text "is not" visible

4. **I verify that {string} element with {string} {'text' | 'label' | 'placeholder' | 'role' | 'test ID' | 'alternative text' | 'title' | 'locator'} is {'visible' | 'hidden' | 'editable' | 'disabled' | 'enabled' | 'read-only'}**
   - It verifies the state of a given element.
   - The first {string} specifies which element you want to interact with. There may be multiple similar elements on the page, so you should define whether you want to interact with the first, second, third, and so on.
   - The second {string} specifies the text used to locate the element. It can also be a saved process variable.
   - The third {string} specifies how you want to locate it. Available ways to locate are: 'text' | 'label' | 'placeholder' | 'role' | 'test ID' | 'alternative text' | 'title' | 'locator'.
   - The fourth {string} specifies the state you are expecting. Available states are: 'visible' | 'hidden' | 'editable' | 'disabled' | 'enabled' | 'read-only'.

   Examples:
     - Then I verify that "1" element with "User password" "label" is "visible"
     - Then I verify that "1" element with "savedText" "text" is "hidden"
     - Then I verify that "1" element with "button" "role" is "disabled"

5. **I verify that {string} element with {string} {string} becomes {string} during {string} seconds**
   - It verifies if a given element reaches a specified state within a certain amount of time.
   The first {string} specifies which element you want to interact with. There may be multiple similar elements on the page, so you should define whether you want to interact with the first, second, third, and so on.
   - The second {string} specifies the text used to locate the element. It can also be a saved process variable.
   - The third {string} specifies how you want to locate it. Available ways to locate are: 'text' | 'label' | 'placeholder' | 'role' | 'test ID' | 'alternative text' | 'title' | 'locator'.
   - The fourth {string} specifies the state you are expecting. Available states are: 'visible' | 'hidden' | 'editable' | 'disabled' | 'enabled' | 'read-only'.
   - The fifth {string} specifies the amount of time, in seconds, within which the element should reach the specified state.

   Examples:
     - Then I verify that "1" element with "Save" "text" becomes "visible" during "5" seconds
     - Then I verify that "1" element with "Exit" "role" becomes "hidden" during "2" seconds
