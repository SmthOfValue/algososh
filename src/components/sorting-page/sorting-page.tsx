import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import sortingStyles from './sorting-page.module.css';
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import {ElementStates} from '../../types/element-states';
import {setTimer} from '../../utils/utils';

type TColumnObj = 
  {
    number: number;
    state: ElementStates;
  };

type TColumnsState = Array<TColumnObj>

type TSortingInProgress = {
  ascending: boolean;
  descending: boolean;
}

export const SortingPage: React.FC = () => {

  const SORT_SELECTION = 'SORT_SELECTION';
  const SORT_BUBBLE = 'SORT_BUBBLE';

  const randomArr = (minLen = 3, maxLen = 17) => {
    const limit = Math.floor(Math.random() * (maxLen + 1 - minLen)) + minLen;
    const randomArr = [];
    for (let i = 0; i < limit; i++) {
      randomArr.push(Math.floor(Math.random()*101));
    }
    return randomArr;
  }
  
  const [sortingType, setSortingType] = useState(SORT_SELECTION);
  const [columns, setColumns] = useState<TColumnsState>([]);
  const [sortingInProgress, setSortingInProgress] = useState<TSortingInProgress>({
    ascending: false,
    descending: false}
  );

  const swap = (arr: TColumnsState, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const handleNewArrayCreation = () => {
    const array = randomArr();
    const columnsArray = array.map((number) => {
      return {
        number: number,
        state: ElementStates.Default
      }    
    })
    setColumns(columnsArray);
  }

  useEffect(() => {
    handleNewArrayCreation()
  }, []);

  const handleSortTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortingType(e.target.value);
  }

  const sortSelection = async (ascending: boolean) => {
    setSortingInProgress({
      ascending: ascending,
      descending: !ascending
    });
    const array = [...columns];
    const { length } = array;

    for (let i = 0; i < length; i++) {
      let sortingIndex = i;
      array[sortingIndex].state = ElementStates.Changing;
      setColumns([...array]);
      for (let j = i+1; j < length ; j++) {
        array[j].state = ElementStates.Changing;
        setColumns([...array]);
        await setTimer(500);
        if (ascending) {
          if (array[j].number < array[sortingIndex].number) {
            sortingIndex=j;
          }
        } else {
          if (array[j].number > array[sortingIndex].number) {
            sortingIndex=j;
          }
        }
        array[j].state = ElementStates.Default;
        setColumns([...array]); 
        await setTimer(500);       
      }
      swap(array, i, sortingIndex);
      array[sortingIndex].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setColumns([...array]);
      await setTimer(500);
    }
    setSortingInProgress({
      ascending: false,
      descending: false
    }); 
  }

  const sortBubble = async (ascending: boolean) => {
    setSortingInProgress({
      ascending: ascending,
      descending: !ascending
    });
    const array = [...columns];
    const { length } = array;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {   
        array[j].state = ElementStates.Changing;     
        array[j+1].state = ElementStates.Changing;
        setColumns([...array]);
        await setTimer(500);
        if (ascending) {
          if (array[j].number > array[j + 1].number) {
            swap(array, j, j + 1);
            setColumns([...array]);
            await setTimer(500);  
          }
        } else {
          if (array[j].number < array[j + 1].number) {
            swap(array, j, j + 1);
            setColumns([...array]);
            await setTimer(500);  
          }
        }        
        array[j].state = ElementStates.Default;
        array[j+1].state = ElementStates.Default;
        setColumns([...array]);
        
      }  
      array[length-i-1].state = ElementStates.Modified;    
      setColumns([...array]);
      await setTimer(500);
  }

    setSortingInProgress({
      ascending: false,
      descending: false
    }); 
  }

  const handleSort = (ascending: boolean) => {
    if (sortingType === SORT_SELECTION) {
      sortSelection(ascending);
    }
    if (sortingType === SORT_BUBBLE) {
      sortBubble(ascending);
    }
  }

  
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={sortingStyles.wrapper}>
        <RadioInput 
          label='Выбор'
          extraClass={sortingStyles.radio}
          value = {SORT_SELECTION}
          name = 'sort-type'
          checked = {sortingType === SORT_SELECTION}
          onChange = {e => handleSortTypeChange(e as React.ChangeEvent<HTMLInputElement>)}
          disabled = {sortingInProgress.ascending || sortingInProgress.descending}
        />
        <RadioInput 
          label='Пузырек'
          extraClass={sortingStyles.radio}
          value = {SORT_BUBBLE}
          name = 'sort-type'
          checked = {sortingType === SORT_BUBBLE}
          onChange = {e => handleSortTypeChange(e as React.ChangeEvent<HTMLInputElement>)}
          disabled = {sortingInProgress.ascending || sortingInProgress.descending}
        />
        <Button 
          text='По возрастанию'
          extraClass={sortingStyles.button} 
          sorting={Direction.Ascending}
          onClick = {() => handleSort(true)}
          isLoader = {sortingInProgress.ascending}
          disabled = {sortingInProgress.ascending || sortingInProgress.descending}
        />
        <Button 
          text='По убыванию'
          extraClass={sortingStyles.button} 
          sorting={Direction.Descending}
          onClick = {() => handleSort(false)}
          isLoader = {sortingInProgress.descending}
          disabled = {sortingInProgress.ascending || sortingInProgress.descending}
        />
        <Button 
          text='Новый массив' 
          extraClass={sortingStyles.button}
          onClick={handleNewArrayCreation}
          disabled = {sortingInProgress.ascending || sortingInProgress.descending}
        />
      </form>
      <ul className={sortingStyles.list}>
        {columns.map((column, index) => {
          return (
            <li key={index} className={sortingStyles.item}>
              <Column 
                index = {column.number}
                state = {column.state}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
