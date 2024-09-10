describe('Insurance Premium Calculator Using XPath', () => {
  
  beforeEach(() => {
    // Navigate to the insurance calculator page
    cy.visit('https://www.ottonova.de/online-beitragsrechner');

    cy.document().then((doc) => {
      const consentButton = doc.evaluate(
        "//button[contains(text(),'Alles akzeptieren')]",
        doc,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (consentButton) {
        cy.wrap(consentButton).click({ force: true });
      }
    });
  


  });

  it('Selects employment type and inputs income', () => {
    // Load fixture data
    cy.fixture('testData').then((data) => {
      
      // Employment type selection
      cy.xpath("//*[@data-cy='employment-status-option-employed']")
        .should('be.visible')  // Assert it's visible before clicking
        .click();
      
      // Input income
      cy.xpath("//*[@data-cy='income-input' and @placeholder='Bitte hier eingeben']")
        .should('be.visible')
        .type('70000');
      
      // Submit income and proceed
      cy.xpath("//button[@type='submit' and @data-cy='employment-status-continue']")
        .should('be.visible')
        .click();
      
      // Validate navigation to the correct page
      cy.url().should('include', '/versicherungswunsch');
      
      // Select insurance type
      cy.xpath("//*[text()='Vollversicherung']")
        .should('be.visible')
        .click();

      // Start date selection
      cy.get('#undefined')
      .select('2: 2024-10-01')
      .should('have.value', '2: 2024-10-01');

        

      // Submit and navigate to the next page
      cy.xpath("//button[@type='submit' and @data-cy='insurance-product-continue']")
        .should('be.visible')
        .click();
      
      // Validate navigation to the birthdate page
      cy.url().should('include', '/geburtstag');

      // Enter invalid birthdate
      cy.xpath("//input[@placeholder='TT']").should('be.visible').type(data.birthdate.invalid.day); // Invalid day
      cy.xpath("//input[@placeholder='MM']").type(data.birthdate.invalid.month); // Invalid month
      cy.xpath("//input[@placeholder='JJJJ']").type(data.birthdate.invalid.year); // Invalid year

      // Assert error message is displayed
      cy.xpath("//*[@data-cy='invalid-age-validation-message']")
        .should('contain', 'Bitte gib ein korrektes Datum ein.');

      // Clear invalid date and enter valid date
      cy.xpath("//input[@placeholder='TT']").clear().type(data.birthdate.valid.day);
      cy.xpath("//input[@placeholder='MM']").clear().type(data.birthdate.valid.month);
      cy.xpath("//input[@placeholder='JJJJ']").clear().type(data.birthdate.valid.year);

      // Click the 'Weiter' button and validate navigation
      cy.xpath("//button[contains(text(), 'Weiter')]")
        .should('be.visible')
        .click();

      // Assert we are on the insurance status page
      cy.url().should('include', '/versicherungsstatus');
    });
  });

});