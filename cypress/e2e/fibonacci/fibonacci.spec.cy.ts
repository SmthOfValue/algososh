import {CIRCLE_LETTER_SELECTOR} from '../../support/constants'

describe('Кнопка "Рассчитать"', function() {
    before(function() {
        cy.visit('fibonacci');
    });

    it('Кнопка недоступна при пустом поле ввода', function() {
        cy.get('input').clear();                 
        cy.get('button[class*="text_type_button"]').as('calculateButton');
        cy.get('@calculateButton').should('be.disabled');                
    });
}); 

describe('Генерация чисел', function() {
    before(function() {
        cy.visit('fibonacci');
    });

    it('Числа генерируются корректно', function() {
        cy.get('input').type('4');            
        cy.get('button[class*="text_type_button"]').click();

        cy.wait(5000)

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).should('have.text', '1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).should('have.text', '1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).should('have.text', '2');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(3).should('have.text', '3');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(4).should('have.text', '5');        
    });
}); 
