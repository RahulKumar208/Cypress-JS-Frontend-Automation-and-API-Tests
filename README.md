# Ottonova Cypress Automation
This repository contains Cypress-based automated tests for testing the Ottonova insurance premium calculator and interacting with the PokeAPI.

# Prerequisites:
- Node.js (v12.x or higher)
- npm (Node Package Manager)
- Cypress

Check if Node.js and npm are installed:
- node -v
- npm -v
Install Node.js and npm from here if not installed.

# Installation
1. Clone the repository: git clone https://github.com/RahulKumar208/Ottonova-Cypress-Automation.git
2. Navigate to the project directory: cd Ottonova-Cypress-Automation
3. Install dependencies: npm install

# Project Structure
Ottonova-Cypress-Automation/
│
├── cypress/
│   ├── e2e/
│   │   ├── automation.cy.js  # Frontend test file
│   │   ├── pokeapi.cy.js     # Backend API test file
│   │
│   ├── fixtures/
│   │   ├── index.html        # HTML for backend test simulation
│   │   ├── testData.json     # Test data for frontend tests
│   │
│   ├── support/
│       ├── commands.js
│       ├── e2e.js
│
├── QA Strategy.dox           # QA strategy documentation
├── cypress.config.js         # Cypress configuration file
├── package.json              # Project dependencies
├── README.md                 # Project documentation

# Running Tests
1. Open Cypress Test Runner: npx cypress open
   Select the test files (automation.cy.js for frontend, pokeapi.cy.js for backend).
2. Run tests in headless mode: npx cypress run

# Test Files
- automation.cy.js: Tests the insurance premium calculator's frontend functionality.
- pokeapi.cy.js: Tests PokeAPI responses and uses mock responses.

# Fixtures
- index.html: Simulates real API calls in the backend tests.
- testData.json: Contains hardcoded test data for frontend tests.

# QA Strategy
- Refer to QA Strategy.dox for details on the testing strategy, types of tests, and test case covera




