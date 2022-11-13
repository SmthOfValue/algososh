describe('Кнопка "Добавить"', function() {
    before(function() {
        cy.visit('http://localhost:3000/queue');
    });

    it('Кнопка недоступна при пустом поле ввода', function() {
        cy.get('input').clear(); 
        cy.contains("button", "Добавить").should('be.disabled');                    
    });
}); 

describe('Добавление элементов в очередь', function() {
    before(function() {
        cy.visit('http://localhost:3000/queue');
    });

    it('Элементы добавляются корректно', function() {
        cy.get('input').type('1');            
        cy.contains("button", "Добавить").click();

        cy.get('p[class*="circle_letter"]').eq(0).as('element1');
        cy.get('div[class*="circle_circle"]').eq(0).as('circle1');
        cy.get('li[class*="queue-page_item"]').eq(0).as('item1');

        cy.get('@element1').should('have.text', '1');
        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.get('@item1').find('div[class*="circle_head"]').should('exist');
        cy.get('@item1').find('div[class*="circle_tail"]').should('exist');

        cy.wait(300)

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        
        cy.get('input').type('2');
        cy.contains("button", "Добавить").click();

        cy.get('p[class*="circle_letter"]').eq(1).as('element2');
        cy.get('div[class*="circle_circle"]').eq(1).as('circle2');
        cy.get('li[class*="queue-page_item"]').eq(1).as('item2');

        cy.get('@element1').should('have.text', '1');
        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(0, 50, 255)')

        cy.get('@element2').should('have.text', '2');
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get('@item1').find('div[class*="circle_head"]').should('exist');
        cy.get('@item2').find('div[class*="circle_tail"]').should('exist');

        cy.wait(300)

        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    });
}); 

describe('Удаление элемента из очереди', function() {
    before(function() {
        cy.visit('http://localhost:3000/queue');
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

        cy.get('p[class*="circle_letter"]').eq(0).as('element1');
        cy.get('div[class*="circle_circle"]').eq(0).as('circle1');

        cy.get('li[class*="queue-page_item"]').eq(1).as('item2');
        cy.get('li[class*="queue-page_item"]').eq(2).as('item3');

        cy.contains("button", "Удалить").click();

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.wait(300);

        cy.get('@element1').should('not.have.text');
        cy.get('@item2').find('div[class*="circle_head"]').should('exist');
        cy.get('@item3').find('div[class*="circle_tail"]').should('exist');

    });
}); 

describe('Очистка стэка', function() {
    before(function() {
        cy.visit('http://localhost:3000/queue');
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
            .find('p[class*="circle_letter"]')
            .then(($p) => {
                if ($p.text() !== '') {
                    queueLength++;
                }
            });

        expect(queueLength).to.equal(0);
    });
}); 