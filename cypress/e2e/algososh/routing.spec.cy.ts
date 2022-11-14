
describe('Роутинг', function() {
    before(function() {
      cy.visit('');
    });

    this.afterEach(function() {
        cy.go('back');
    })

    it('Должна открываться страница с демонстрацией разворота строки при нажатии на элемент "Строка"', function() {
        cy.get('div[class*="main-page_string"]').as('stringRoute');
        cy.get('@stringRoute').click();
        cy.contains('Строка');
    });

    it('Должна открываться страница с демонстрацией последовательности Фибоначчи при нажатии на элемент "Последовательность Фибоначчи"', function() {
        cy.get('div[class*="main-page_fibonacci"]').as('fibonacciRoute');
        cy.get('@fibonacciRoute').click();
        cy.contains('Последовательность Фибоначчи');
    });

    it('Должна открываться страница с демонстрацией сортировки массива при нажатии на элемент "Сортировка массива"', function() {
        cy.get('div[class*="main-page_arr"]').as('sortingRoute');
        cy.get('@sortingRoute').click();
        cy.contains('Сортировка массива');
    });

    it('Должна открываться страница с демонстрацией работы стека при нажатии на элемент "Стек"', function() {
        cy.get('div[class*="main-page_stack"]').as('stackRoute');
        cy.get('@stackRoute').click();
        cy.contains('Стек');
    });

    it('Должна открываться страница с демонстрацией работы очереди при нажатии на элемент "Очередь"', function() {
        cy.get('div[class*="main-page_queue"]').as('queueRoute');
        cy.get('@queueRoute').click();
        cy.contains('Очередь');
    });

    it('Должна открываться страница с демонстрацией работы связного списка при нажатии на элемент "Связный список"', function() {
        cy.get('div[class*="main-page_list"]').as('listRoute');
        cy.get('@listRoute').click();
        cy.contains('Связный список');
    });

  }); 
