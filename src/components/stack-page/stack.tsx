interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getSize: () => number;
    clear: () => void;
    getElements: () => T[];
    peek: () => T;
  }

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        if (this.peek()) {
            this.container.pop();
        }
    }

    clear = (): void => {
        this.container = [];
    }

    getSize = () => this.container.length;

    getElements = () => {
        return this.container;
    }

    peek = (): T  => {
        return this.container[this.container.length - 1]
    }
}