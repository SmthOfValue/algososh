import {
    CIRCLE_LETTER_SELECTOR,
    CIRCLE_INDEX_SELECTOR,
    CIRCLE_CIRCLE_SELECTOR,
    LIST_ITEM_SELECTOR,
    CIRCLE_HEAD_SELECTOR,
    CIRCLE_TAIL_SELECTOR,
    CIRCLE_SMALL_SELECTOR
} from '../../support/constants'

describe('Кнопки "Добавить", "Добавить по индексу", "Удалить по индексу"', function() {
    before(function() {
        cy.visit('list');
    });

    it('Кнопка "Добавить в head" недоступна при пустом поле ввода', function() {
        cy.get('input').clear(); 
        cy.contains("button", "Добавить в head").should('be.disabled');                    
    });

    it('Кнопка "Добавить в tail" недоступна при пустом поле ввода', function() {
        cy.get('input').clear(); 
        cy.contains("button", "Добавить в tail").should('be.disabled');                    
    });

    it('Кнопка "Добавить по индексу" недоступна при пустом поле ввода', function() {
        cy.get('input').clear(); 
        cy.contains("button", "Добавить по индексу").should('be.disabled');                    
    });

    it('Кнопка "Удалить по индексу" недоступна при пустом поле ввода', function() {
        cy.get('input').clear(); 
        cy.contains("button", "Удалить по индексу").should('be.disabled');                    
    });

});

describe('Отрисовка дефолтного списка', function() {
    before(function() {
        cy.visit('list');
    });

    it('Список корректно отрисован', function() {        
        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('element1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).as('element2');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).as('element3');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(3).as('element4');

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).as('circle1');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).as('circle2');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(2).as('circle3');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(3).as('circle4');

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get(LIST_ITEM_SELECTOR).eq(3).as('item4');

        cy.get(CIRCLE_INDEX_SELECTOR).eq(0).should('have.text', '0');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(1).should('have.text', '1');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(2).should('have.text', '2');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(3).should('have.text', '3');

        cy.get('@element1').should('have.text', '0');
        cy.get('@element2').should('have.text', '34');
        cy.get('@element3').should('have.text', '8');
        cy.get('@element4').should('have.text', '1');

        cy.get('@circle1').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('@circle2').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('@circle3').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('@circle4').should('have.css', 'border', '4px solid rgb(0, 50, 255)');

        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item4').find(CIRCLE_TAIL_SELECTOR).should('exist');
    });
});

describe('Добавление элемента в head', function() {
    before(function() {
        cy.visit('list');
    });

    it('Элемент корректно добавляется в head', function() {
        cy.get('input').first().type('2');
        cy.contains("button", "Добавить в head").click(); 

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get('@item1').find(CIRCLE_SMALL_SELECTOR).should('exist');
        cy.get(CIRCLE_SMALL_SELECTOR).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get(CIRCLE_SMALL_SELECTOR).find(CIRCLE_LETTER_SELECTOR).should('have.text', '2');

        cy.wait(400);

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).should('have.css', 'border', '4px solid rgb(127, 224, 81)')

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('element1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).as('element2');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).as('element3');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(3).as('element4');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(4).as('element5');

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get(LIST_ITEM_SELECTOR).eq(4).as('item5');

        cy.get(CIRCLE_INDEX_SELECTOR).eq(0).should('have.text', '0');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(1).should('have.text', '1');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(2).should('have.text', '2');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(3).should('have.text', '3');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(4).should('have.text', '4');

        cy.get('@element1').should('have.text', '2');
        cy.get('@element2').should('have.text', '0');
        cy.get('@element3').should('have.text', '34');
        cy.get('@element4').should('have.text', '8');
        cy.get('@element5').should('have.text', '1');

        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item5').find(CIRCLE_TAIL_SELECTOR).should('exist');

        cy.wait(400);

        cy.get(CIRCLE_CIRCLE_SELECTOR).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    });
}); 

describe('Добавление элемента в tail', function() {
    before(function() {
        cy.visit('list');
    });

    it('Элемент корректно добавляется в tail', function() {
        cy.get('input').first().type('2');
        cy.contains("button", "Добавить в tail").click(); 

        cy.get(LIST_ITEM_SELECTOR).eq(3).as('item4');
        cy.get('@item4').find(CIRCLE_SMALL_SELECTOR).should('exist');
        cy.get(CIRCLE_SMALL_SELECTOR).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.get(CIRCLE_SMALL_SELECTOR).find(CIRCLE_LETTER_SELECTOR).should('have.text', '2');

        cy.wait(400);

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(4).should('have.css', 'border', '4px solid rgb(127, 224, 81)')

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('element1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).as('element2');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).as('element3');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(3).as('element4');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(4).as('element5');

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get(LIST_ITEM_SELECTOR).eq(4).as('item5');

        cy.get(CIRCLE_INDEX_SELECTOR).eq(0).should('have.text', '0');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(1).should('have.text', '1');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(2).should('have.text', '2');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(3).should('have.text', '3');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(4).should('have.text', '4');

        cy.get('@element1').should('have.text', '0');
        cy.get('@element2').should('have.text', '34');
        cy.get('@element3').should('have.text', '8');
        cy.get('@element4').should('have.text', '1');
        cy.get('@element5').should('have.text', '2');

        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item5').find(CIRCLE_TAIL_SELECTOR).should('exist');

        cy.wait(400);

        cy.get(CIRCLE_CIRCLE_SELECTOR).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    });
}); 

describe('Добавление элемента по индексу', function() {
    before(function() {
        cy.visit('list');
    });

    it('Элемент корректно добавляется по индексу', function() {
        cy.get('input').first().type('44');
        cy.get('input').eq(1).type('1');
        cy.contains("button", "Добавить по индексу").click(); 

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get('@item1').find(CIRCLE_SMALL_SELECTOR).should('exist');
        cy.get(CIRCLE_SMALL_SELECTOR).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.get(CIRCLE_SMALL_SELECTOR).find(CIRCLE_LETTER_SELECTOR).should('have.text', '44');

        cy.wait(400);

        cy.get('@item1').find(CIRCLE_SMALL_SELECTOR).should('not.exist');

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.get(LIST_ITEM_SELECTOR).eq(1).as('item2');
        cy.get('@item2').find(CIRCLE_SMALL_SELECTOR).should('exist');
        cy.get(CIRCLE_SMALL_SELECTOR).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.get(CIRCLE_SMALL_SELECTOR).find(CIRCLE_LETTER_SELECTOR).should('have.text', '44');

        cy.wait(400);

        cy.get(CIRCLE_SMALL_SELECTOR).should('not.exist');

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).should('have.text', '0');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).should('have.text', '44');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).should('have.text', '34');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(3).should('have.text', '8');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(4).should('have.text', '1');

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).should('have.css', 'border', '4px solid rgb(127, 224, 81)');

        cy.get(CIRCLE_INDEX_SELECTOR).eq(0).should('have.text', '0');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(1).should('have.text', '1');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(2).should('have.text', '2');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(3).should('have.text', '3');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(4).should('have.text', '4');


        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get(LIST_ITEM_SELECTOR).eq(4).as('item5');

        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item5').find(CIRCLE_TAIL_SELECTOR).should('exist');

        cy.wait(400);

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    });
});

describe('Удаление элемента из head', function() {
    before(function() {
        cy.visit('list');
    });

    it('Элемент корректно удаляется из head', function() {
        cy.contains("button", "Удалить из head").click(); 

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get('@item1').find(CIRCLE_SMALL_SELECTOR).should('exist');
        cy.get(CIRCLE_SMALL_SELECTOR).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get(CIRCLE_SMALL_SELECTOR).find(CIRCLE_LETTER_SELECTOR).should('have.text', '0');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).should('have.text', '');

        cy.wait(400);

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('element1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).as('element2');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).as('element3');

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get(LIST_ITEM_SELECTOR).eq(2).as('item3');

        cy.get(CIRCLE_INDEX_SELECTOR).eq(0).as('index1');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(1).as('index2');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(2).as('index3');

        cy.get('@element1').should('have.text', '34');
        cy.get('@element2').should('have.text', '8');
        cy.get('@element3').should('have.text', '1');

        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item3').find(CIRCLE_TAIL_SELECTOR).should('exist');

        cy.get('@index1').should('have.text', '0');
        cy.get('@index2').should('have.text', '1');
        cy.get('@index3').should('have.text', '2');
  
    });
}); 

describe('Удаление элемента из tail', function() {
    before(function() {
        cy.visit('list');
    });

    it('Элемент корректно удаляется из tail', function() {
        cy.contains("button", "Удалить из tail").click(); 

        cy.get(LIST_ITEM_SELECTOR).eq(3).as('item4');
        cy.get('@item4').find(CIRCLE_SMALL_SELECTOR).should('exist');
        cy.get(CIRCLE_SMALL_SELECTOR).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get(CIRCLE_SMALL_SELECTOR).find(CIRCLE_LETTER_SELECTOR).should('have.text', '1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(3).should('have.text', '');

        cy.wait(400);

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).as('element1');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).as('element2');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).as('element3');

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get(LIST_ITEM_SELECTOR).eq(2).as('item3');

        cy.get(CIRCLE_INDEX_SELECTOR).eq(0).as('index1');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(1).as('index2');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(2).as('index3');

        cy.get('@element1').should('have.text', '0');
        cy.get('@element2').should('have.text', '34');
        cy.get('@element3').should('have.text', '8');

        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item3').find(CIRCLE_TAIL_SELECTOR).should('exist');

        cy.get('@index1').should('have.text', '0');
        cy.get('@index2').should('have.text', '1');
        cy.get('@index3').should('have.text', '2');
  
    });
}); 

describe('Удаление элемента по индексу', function() {
    before(function() {
        cy.visit('list');
    });

    it('Элемент корректно удаляется по индексу', function() {
        cy.get('input').eq(1).type('1');
        cy.contains("button", "Удалить по индексу").click(); 

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.wait(400);

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)')

        cy.wait(400);

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)')

        cy.get(LIST_ITEM_SELECTOR).eq(1).as('item2');
        cy.get('@item2').find(CIRCLE_SMALL_SELECTOR).should('exist');
        cy.get(CIRCLE_SMALL_SELECTOR).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.get(CIRCLE_SMALL_SELECTOR).find(CIRCLE_LETTER_SELECTOR).should('have.text', '34');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).should('have.text', '');

        cy.wait(400);

        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)')
        cy.get(CIRCLE_CIRCLE_SELECTOR).eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)')

        cy.get(CIRCLE_SMALL_SELECTOR).should('not.exist');

        cy.get(CIRCLE_LETTER_SELECTOR).eq(0).should('have.text', '0');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(1).should('have.text', '8');
        cy.get(CIRCLE_LETTER_SELECTOR).eq(2).should('have.text', '1');

        cy.get(CIRCLE_INDEX_SELECTOR).eq(0).should('have.text', '0');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(1).should('have.text', '1');
        cy.get(CIRCLE_INDEX_SELECTOR).eq(2).should('have.text', '2');

        cy.get(LIST_ITEM_SELECTOR).eq(0).as('item1');
        cy.get(LIST_ITEM_SELECTOR).eq(2).as('item3');

        cy.get('@item1').find(CIRCLE_HEAD_SELECTOR).should('exist');
        cy.get('@item3').find(CIRCLE_TAIL_SELECTOR).should('exist');        
    });
});
