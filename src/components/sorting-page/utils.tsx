import {ElementStates} from '../../types/element-states';

type TColumnObj = 
  {
    number: number;
    state: ElementStates;
  };

export type TColumnsState = Array<TColumnObj>

export type TSortingInProgress = {
  ascending: boolean;
  descending: boolean;
}

export const swap = (arr: TColumnsState, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

//функция генерации случайного массива чисел
export const randomArr = (minLen = 3, maxLen = 17) => {
    const limit = Math.floor(Math.random() * (maxLen + 1 - minLen)) + minLen;
    const randomArr = [];
    for (let i = 0; i < limit; i++) {
      randomArr.push(Math.floor(Math.random()*101));
    }
    return randomArr;
  }