import {CIRCLE_CIRCLE_SELECTOR, CIRCLE_LETTER_SELECTOR} from '../../support/constants'

describe('Кнопка "Развернуть"', function() {
    before(function() {
        cy.visit('recursion');
    });

    it('Кнопка недоступна при пустом поле ввода', function() {
        cy.get('input').clear();                 
        cy.get('button[class*="text_type_button"]').as('reverseButton');
        cy.get('@reverseButton').should('be.disabled');                
    });
  }); 

  describe('Разворот строки', function() {
    before(function() {
        cy.visit('recursion');
    });

    beforeEach(() => {
        cy.get('input').clear();
    })

    it('Корректно разворачивает и анимириует строку', function() {
        cy.get('input').type('1234');                 
        cy.get('button[class*="text_type_button"]').click();

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('letter1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).as('letter2');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).as('letter3');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(3).as('letter4');

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).as('circle1');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).as('circle2');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(2).as('circle3');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(3).as('circle4');

        cy.get('@letter1').should('have.text', '1');
        cy.get('@letter2').should('have.text', '2');
        cy.get('@letter3').should('have.text', '3');
        cy.get('@letter4').should('have.text', '4');

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle3').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle4').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        
        cy.wait(1000);
        
        cy.get('@letter1').should('have.text', '1');
        cy.get('@letter2').should('have.text', '2');
        cy.get('@letter3').should('have.text', '3');
        cy.get('@letter4').should('have.text', '4');

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle3').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle4').should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.wait(1000);

        cy.get('@letter1').should('have.text', '4');
        cy.get('@letter2').should('have.text', '2');
        cy.get('@letter3').should('have.text', '3');
        cy.get('@letter4').should('have.text', '1');

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle3').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get('@circle4').should('have.css', 'border', '4px solid rgb(127, 224, 81)')

        cy.wait(1000);

        cy.get('@letter1').should('have.text', '4');
        cy.get('@letter2').should('have.text', '2');
        cy.get('@letter3').should('have.text', '3');
        cy.get('@letter4').should('have.text', '1');

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle3').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@circle4').should('have.css', 'border', '4px solid rgb(127, 224, 81)')

        cy.wait(1000);

        cy.get('@letter1').should('have.text', '4');
        cy.get('@letter2').should('have.text', '3');
        cy.get('@letter3').should('have.text', '2');
        cy.get('@letter4').should('have.text', '1');

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle3').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        cy.get('@circle4').should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        
    });
  }); 