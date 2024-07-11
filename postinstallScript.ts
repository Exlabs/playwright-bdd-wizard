const fs = require('fs');
const path = require('path');

// Get the original working directory where `npm install` was run
const projectRoot = process.env.INIT_CWD || process.cwd();

// Define the files and their contents
const filesToCreate = [
  {
    path: 'tests/features/example.feature',
    content: `Feature: Example test

    Scenario: Example with google
        When I open "https://www.google.com" page
        Then If its visible, I "click" the "2" element with "Reject all" "text"
        And I "type" "playwright" in the "1" element with "Search" "title"
        And I "press" "Enter" on the keyboard
        Then I verify that "1" element with "playwright.dev" "text" is "visible"
        And I wait "1" seconds
        When I go back in the browser
        Then I verify if URL "contains" "https://www.google.com"
        When I get a part of the URL based on "www.(.*?).com" regular expression and save it as "websiteNameVariable"
        When I "type" "websiteNameVariable" on the keyboard
        Then I verify that "1" element with "websiteNameVariable" "text" is "visible"
        When I "type" " test with playwright-bdd-wizard finished!" on the keyboard
        Then I wait "1.5" seconds
  `
  },
  {
    path: 'cucumber.mjs',
    content: `export default {
  paths: ['tests/**/*.feature'],
  import: ['tests/**/*.ts'],
  requireModule: ['playwright-bdd-wizard']
}
`
  }
];

// Create the files
filesToCreate.forEach(file => {
  const filePath = path.join(projectRoot, file.path);
  const dir = path.dirname(filePath);

  // Ensure the directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(filePath, file.content, 'utf8');
});

// Remove tests/example.spec.ts
const exampleSpecPath = path.join(projectRoot, 'tests/example.spec.ts');
if (fs.existsSync(exampleSpecPath)) {
  fs.unlinkSync(exampleSpecPath);
}

// Remove tests-examples folder
const testsExamplesPath = path.join(projectRoot, 'tests-examples');
if (fs.existsSync(testsExamplesPath)) {
  fs.rmdirSync(testsExamplesPath, { recursive: true });
}

console.log('Sample files created successfully in project root.');
