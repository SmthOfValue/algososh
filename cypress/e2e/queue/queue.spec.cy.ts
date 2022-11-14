import {CIRCLE_LETTER_SELECTOR, CIRCLE_CIRCLE_SELECTOR, QUEUE_ITEM_SELECTOR, CIRCLE_HEAD_SELECTOR, CIRCLE_TAIL_SELECTOR} from '../../support/constants'

describe('Кнопка "Добавить"', function() {
    before(function() {
        cy.visit('queue');
    });

    it('Кнопка недоступна при пустом поле ввода', function() {
        cy.get('input').clear(); 
        cy.contains("button", "Добавить").should('be.disabled');                    
    });
}); 

describe('Добавление элементов в очередь', function() {
    before(function() {
        cy.visit('queue');
    });

    it('Элементы добавляются корректно', function() {
        cy.get('input').type('1');            
        cy.contains("button", "Добавить").click();

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('element1');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).as('circle1');
        cy.get(QUEUE_ITEM_SELECTOR).eq(0).as('item1');

        cy.get('@element1').should('have.text', '1');
        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item1').find(CIRCLE_TAIL_SELECTOR).should('exist');

        cy.wait(300)

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        
        cy.get('input').type('2');
        cy.contains("button", "Добавить").click();

        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).as('element2');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).as('circle2');
        cy.get(QUEUE_ITEM_SELECTOR).eq(1).as('item2');

        cy.get('@element1').should('have.text', '1');
        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')

        cy.get('@element2').should('have.text', '2');
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item2').find(CIRCLE_TAIL_SELECTOR).should('exist');

        cy.wait(300)

        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    });
}); 

describe('Удаление элемента из очереди', function() {
    before(function() {
        cy.visit('queue');
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

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('element1');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).as('circle1');

        cy.get(QUEUE_ITEM_SELECTOR).eq(1).as('item2');
        cy.get(QUEUE_ITEM_SELECTOR).eq(2).as('item3');

        cy.contains("button", "Удалить").click();

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.wait(300);

        cy.get('@element1').should('not.have.text');
        cy.get('@item2').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item3').find(CIRCLE_TAIL_SELECTOR).should('exist');

    });
}); 

describe('Очистка стэка', function() {
    before(function() {
        cy.visit('queue');
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

        let queueLength = 0;

        cy.get('div[class*="solution-layout_contentCard"]')
            .find(CIRCLE_LETTER_SELECTOR)
            .then(($p) => {
                if ($p.text() !== '') {
                    queueLength++;
                }
            });

        expect(queueLength).to.equal(0);
    });
}); 
