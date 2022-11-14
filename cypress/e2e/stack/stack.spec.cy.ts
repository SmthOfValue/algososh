import {CIRCLE_CIRCLE_SELECTOR, CIRCLE_LETTER_SELECTOR} from '../../support/constants'

describe('Кнопка "Добавить"', function() {
    before(function() {
        cy.visit('stack');
    });

    it('Кнопка недоступна при пустом поле ввода', function() {
        cy.get('input').clear(); 
        cy.contains("button", "Добавить").should('be.disabled');                    
    });
}); 

describe('Добавление элементов в стэк', function() {
    before(function() {
        cy.visit('stack');
    });

    it('Элементы добавляются корректно', function() {
        cy.get('input').type('1');            
        cy.contains("button", "Добавить").click();

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('element1');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).as('circle1');

        cy.get('@element1').should('have.text', '1');
        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.wait(300)

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        
        cy.get('input').type('2');            
        cy.contains("button", "Добавить").click();

        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).as('element2');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).as('circle2');

        cy.get('@element1').should('have.text', '1');
        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')

        cy.get('@element2').should('have.text', '2');
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.wait(300)

        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    });
}); 

describe('Удаление элемента из стэка', function() {
    before(function() {
        cy.visit('stack');
    });

    it('Элемент удаляется корректно', function() {
        cy.get('input').type('1');            
        cy.contains("button", "Добавить").click();

        cy.wait(600);

        cy.get('input').type('2');            
        cy.contains("button", "Добавить").click();

        cy.wait(600);

        cy.get('input').type('3');            
        cy.contains("button", "Добавить").click();

        cy.wait(600);

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(2).as('circle3');

        cy.contains("button", "Удалить").click();

        cy.get('@circle3').should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.wait(300);

        cy.get('@circle3').should('not.exist');
    });
}); 

describe('Очистка стэка', function() {
    before(function() {
        cy.visit('stack');
    });

    it('Стэк очищается корректно', function() {
        cy.get('input').type('1');            
        cy.contains("button", "Добавить").click();

        cy.wait(600);

        cy.get('input').type('2');            
        cy.contains("button", "Добавить").click();

        cy.wait(600);

        cy.get('input').type('3');            
        cy.contains("button", "Добавить").click();

        cy.wait(600);

        cy.contains("button", "Очистить").click();

        cy.get('div[class*="solution-layout_contentCard"]').find(CIRCLE_CIRCLE_SELECTOR).should('have.length', 0)
    });
}); 
