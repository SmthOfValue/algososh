interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peek: () => T | null;
    getElements: () => (T | null)[];
    clear: () => void;
    getSize: () => number;
    getHead: () => number;
    getTail: () => number;
  }

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = Array(size);
    }
  
    enqueue = (item: T) => {
        if (this.length >= this.size) {
            console.log("Maximum length exceeded");
            return;
        }  
        if (!this.isEmpty()) { 
            this.tail = (this.tail + 1)% this.size;
        }
        console.log('head: ', this.head, 'tail: ', this.tail);
        this.container[this.tail % this.size] = item;
        this.length = this.length + 1;   
        
    };
  
    dequeue = () => {
        if (this.isEmpty()) {
            console.log("No elements in the queue");
            return;
        }
        this.container[this.head % this.size] = null;
        this.head = (this.head + 1) % this.size;
        this.length = this.length - 1; 
        if (this.isEmpty()) {
            this.head = 0;
            this.tail = 0;
        }
        console.log('head: ', this.head, 'tail: ', this.tail);
    };
  
    peek = (): T | null => {
        if (this.isEmpty()) {
            console.log("No elements in the queue");
            return null;
        }
        return this.container[this.head % this.size];      
    };
  
    isEmpty = () => this.length === 0;

    getElements = () => {
        return this.container;
    }

    clear = () => {
        this.container = Array(this.size);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    getSize = () => {
        return this.size;
    }

    getHead = () => {
        return this.head;
    }

    getTail = () => {
        return this.tail;
    }
}