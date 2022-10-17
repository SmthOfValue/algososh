export class LinkedListNode<T> {
    value: T
    next: LinkedListNode<T> | null
    constructor(value: T, next?: LinkedListNode<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray: () => T[];
  getSize: () => number;
  getHead: () => LinkedListNode<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor(array?: T[]) {
    if (array) {
      const length = array.length;
      let curr = new LinkedListNode<T>(array[length-1]);
      let temp;
      
      for (let i = length-2; i >= 0; i--) {
            temp = new LinkedListNode(array[i], curr);
            curr = temp;
      }
    this.head = curr;
    this.size = length;
    } else {
      this.head = null;
      this.size = 0;
    }
  }

  append = (item: T) => {
    const node = new LinkedListNode(item);
    let curr;

    if (this.head === null) {
      this.head = node;
    } else {
      curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  prepend = (item: T) => {
    const node = new LinkedListNode(item);
    if (this.head !== null) {
      node.next = this.head;
    }
    this.head = node;
    this.size++;
  }

  addByIndex = (item: T, index: number) => {
    if (index < 0 || index > this.size) {
      console.log('Введите корректный индекс');
      return;
    } else {
      const node = new LinkedListNode(item);
      if (index === 0) {
        if (this.head !== null) {
          node.next = this.head;
        }
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex < index) {
          currIndex++;
          if (curr?.next && currIndex !== index) {
            curr = curr?.next;
          }
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }        
      }
      this.size++;
    }
  }

  deleteByIndex = (index: number) => {
    if (index >= 0 && index < this.size && this.head) {
      let curr = this.head;
      let prev = curr;
      let currIndex = 0;

      if (index === 0) {
          this.head = curr.next;
      } else {
          while (currIndex < index) {
              currIndex++
            if (curr.next) {
              prev = curr;
              curr = curr.next;
            }
          }
          prev.next = curr.next;
      }
      this.size--;      
    } else {
      return ;
    }
  }

  deleteHead = () => {
    if (this.head !== null) {
      this.head = this.head?.next;
      this.size--;
    } else {
      return;
    }
  }

  deleteTail = () => {
    let curr = this.head;
    let prev = curr;
    if (this.size === 1) {
      this.head = null;
      this.size--;
      return;
    }
    while (curr?.next) {
      prev = curr;
      curr = curr.next;
    }
    if (prev !== null) {
      prev.next = null;
      this.size--;
    }  
  }

  toArray = (): Array<T> => {
    let curr = this.head;
    let array: Array<T> = [];
    while (curr) {
      array.push(curr.value);
      curr = curr.next;
    }
    return array;
  }

  getSize = (): number => {
    return this.size;
  }

  getHead = (): LinkedListNode<T> | null => {
    return this.head;
  }
  
}