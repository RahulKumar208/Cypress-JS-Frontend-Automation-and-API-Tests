// cypress/integration/insurance_xpath_spec.js

describe('Insurance Premium Calculator Using XPath', () => {
  
  beforeEach(() => {
    // Navigate to the insurance calculator page
    cy.visit('https://www.ottonova.de/online-beitragsrechner');

    // Check if the "Alles Akzeptieren" button for cookies is present
   
  });

  it('Selects employment type and inputs income', () => {
    // Load fixture data
    cy.fixture('testData').then((data) => {
      // Select "Angestellt" employment type
      cy.xpath("//*[@data-cy='employment-status-option-employed']").click();
      // Enter an income of "70000"
      cy.xpath("//*[@data-cy='income-input' and @placeholder='Bitte hier eingeben']").type('70000');
      cy.xpath("//button[@type='submit' and @data-cy='employment-status-continue']").click();
      
      // Ensure we are on the correct page
      cy.url().should('include', '/versicherungswunsch');
      // Select "Vollversicherung" insurance type
      cy.xpath("//*[text()='Vollversicherung']").click();
      // Click start date dropdown
      cy.get('#undefined').select('3: 2024-10-01').should('have.value', '3: 2024-10-01');
      cy.xpath("//button[@type='submit' and @data-cy='insurance-product-continue']").click();

      // Ensure we are on the correct page
      cy.url().should('include', '/geburtstag');
      
      // Enter an invalid birthdate using data from the fixture
      cy.xpath("//input[@placeholder='TT']").type(data.birthdate.invalid.day); // Invalid day
      cy.xpath("//input[@placeholder='MM']").type(data.birthdate.invalid.month); // Invalid month
      cy.xpath("//input[@placeholder='JJJJ']").type(data.birthdate.invalid.year); // Invalid year
      // Assert the error message is shown
      cy.xpath("//*[@data-cy='invalid-age-validation-message']").should('contain', 'Bitte gib ein korrektes Datum ein.');

      // Clear and enter a valid birthdate using data from the fixture
      cy.xpath("//input[@placeholder='TT']").clear().type(data.birthdate.valid.day);
      cy.xpath("//input[@placeholder='MM']").type(data.birthdate.valid.month);
      cy.xpath("//input[@placeholder='JJJJ']").type(data.birthdate.valid.year);
      // Click on the 'Weiter' button to proceed
      cy.xpath("//button[contains(text(), 'Weiter')]").click();
      // Check if the URL includes '/versicherungsstatus'
      cy.url().should('include', '/versicherungsstatus');
    });
  });

});