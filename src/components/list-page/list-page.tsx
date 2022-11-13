import React, { useState }from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import listStyles from './list-page.module.css';
import { LinkedList } from "./linked-list";
import { ElementStates } from "../../types/element-states";
import { setTimer, randomStringArr } from '../../utils/utils';
import {ArrowIcon} from '../ui/icons/arrow-icon';


type TElementObj = 
  {
    value: string;
    state: ElementStates;
    head: string | React.ReactElement | null;
    tail: string | React.ReactElement | null;
  };

type TLoadingInProgress = {
    addToHead: boolean;
    addToTail: boolean;
    removeHead: boolean;
    removeTail: boolean;
    addByIndex: boolean;
    removeByIndex: boolean;
    disabled: boolean;
}

export const ListPage: React.FC = () => {

  const [loadingInProgress, setloadingInProgress] = useState<TLoadingInProgress>({
    addToHead: false,
    addToTail: false,
    removeHead: false,
    removeTail: false,
    addByIndex: false,
    removeByIndex: false,
    disabled: false
  });

  const startingList = new LinkedList<string>(['0', '34', '8', '1']);
  const [list, setList] = useState<LinkedList<string>>(startingList);

  const convertToRenderData = (array: Array<string>): Array<TElementObj> => {
    return array.map((element, index) => {
      if (array.length === 1) {
        return {
          value: element,
          state: ElementStates.Default,
          head: "head",
          tail: "tail"          
        }
      } else if (index === 0) {
        return {
          value: element,
          state: ElementStates.Default,
          head: "head",
          tail: null          
        }
      } else if (index === array.length - 1) {
        return {
          value: element,
          state: ElementStates.Default,
          head: null,
          tail: "tail"          
        }
      }
      return {
        value: element,
        state: ElementStates.Default,
        head: null,
        tail: null        
      }
    })
  }

  const [renderData, setRenderData] = useState<Array<TElementObj>>(convertToRenderData(list.toArray()));

  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const onInputIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  }

  //функция добавления маленького круга
  const addSmallCircle = (array: TElementObj[], value: string, index: number, location: "head" | "tail") => {
    if (location === "head") {
      array[index].head = (
        <Circle 
          letter = {value}
          isSmall
          state = {ElementStates.Changing}
        />
      )
    }
    if (location === "tail") {
      array[index].tail = (
        <Circle 
          letter = {value}
          isSmall
          state = {ElementStates.Changing}
        />
      )
    }    
  }

  const handleAddToHeadClick = async () => {
    setloadingInProgress({
      addToHead: true,
      addToTail: false,
      removeHead: false,
      removeTail: false,
      addByIndex: false,
      removeByIndex: false,
      disabled: true
    });

    const input = inputValue;
    setInputValue('');
    const listCopy = list;
    let renderDataCopy = renderData;

    addSmallCircle(renderDataCopy, input, 0, "head");
    setRenderData([...renderDataCopy]);
    listCopy.prepend(input);    
    await setTimer(400);

    setList(listCopy);
    renderDataCopy = convertToRenderData(list.toArray());
    renderDataCopy[0].state = ElementStates.Modified;
    setRenderData([...renderDataCopy]);
    await setTimer(400);

    setRenderData([...convertToRenderData(list.toArray())]);

    setloadingInProgress({
      addToHead: false,
      addToTail: false,
      removeHead: false,
      removeTail: false,
      addByIndex: false,
      removeByIndex: false,
      disabled: false
    });
  }

  const handleAddToTailClick = async () => {
    setloadingInProgress({
      addToHead: false,
      addToTail: true,
      removeHead: false,
      removeTail: false,
      addByIndex: false,
      removeByIndex: false,
      disabled: true
    });

    const input = inputValue;
    setInputValue('');
    const listCopy = list;
    let renderDataCopy = renderData;

    addSmallCircle(renderDataCopy, input, renderDataCopy.length - 1, "head");
    setRenderData([...renderDataCopy]);
    listCopy.append(input);
    await setTimer(400);

    setList(listCopy);
    renderDataCopy = convertToRenderData(list.toArray());
    renderDataCopy[renderDataCopy.length - 1].state = ElementStates.Modified;
    setRenderData([...renderDataCopy]);
    await setTimer(400);

    setRenderData([...convertToRenderData(list.toArray())]); 

    setloadingInProgress({
      addToHead: false,
      addToTail: false,
      removeHead: false,
      removeTail: false,
      addByIndex: false,
      removeByIndex: false,
      disabled: false
    });
  }

  const handleRemoveHead = async () => {
    const head = list.getHead();
    if (head === null) {
      return;
    } else {
      setloadingInProgress({
        addToHead: false,
        addToTail: false,
        removeHead: true,
        removeTail: false,
        addByIndex: false,
        removeByIndex: false,
        disabled: true
      });

      const listCopy = list;
      let renderDataCopy = renderData;

      addSmallCircle(renderDataCopy, renderDataCopy[0].value, 0, "tail");
      renderDataCopy[0].value = '';
      setRenderData([...renderDataCopy]);
      await setTimer(500);
      listCopy.deleteHead();
      setList(listCopy);
      renderDataCopy = convertToRenderData(list.toArray());
      setRenderData([...renderDataCopy]);

      setloadingInProgress({
        addToHead: false,
        addToTail: false,
        removeHead: false,
        removeTail: false,
        addByIndex: false,
        removeByIndex: false,
        disabled: false
      });
    }
  }

  const handleRemoveTail = async () => {
    setloadingInProgress({
      addToHead: false,
      addToTail: false,
      removeHead: false,
      removeTail: true,
      addByIndex: false,
      removeByIndex: false,
      disabled: true
    });

    const listCopy = list;
    let renderDataCopy = renderData;
    const length = renderDataCopy.length;

    addSmallCircle(renderDataCopy, renderDataCopy[length-1].value, length-1, "tail");
    renderDataCopy[length-1].value = '';
    setRenderData([...renderDataCopy]);
    await setTimer(500);
    listCopy.deleteTail();
    setList(listCopy);
    renderDataCopy = convertToRenderData(list.toArray());
    setRenderData([...renderDataCopy]);
    
    setloadingInProgress({
      addToHead: false,
      addToTail: false,
      removeHead: false,
      removeTail: false,
      addByIndex: false,
      removeByIndex: false,
      disabled: false
    });
  }

  const handleAddByIndex = async () => {
    if (parseInt(inputIndex) < 0 || parseInt(inputIndex) > list.getSize() - 1) {
      console.log('Введите корректный индекс');
      setInputIndex('');
      return;
    }
    setloadingInProgress({
      addToHead: false,
      addToTail: false,
      removeHead: false,
      removeTail: false,
      addByIndex: true,
      removeByIndex: false,
      disabled: true
    });

    const index = parseInt(inputIndex);
    const value = inputValue;
    const listCopy = list;
    let renderDataCopy = renderData;
    setInputValue('');
    setInputIndex('');

    if (index === 0) {
      addSmallCircle(renderDataCopy, value, 0, "head");
      setRenderData([...renderDataCopy]);
      listCopy.prepend(value);    
      await setTimer(500);

      setList(listCopy);
      renderDataCopy = convertToRenderData(list.toArray());
      renderDataCopy[0].state = ElementStates.Modified;
      setRenderData([...renderDataCopy]);
      await setTimer(500);

      setRenderData([...convertToRenderData(list.toArray())]);
    } else {
      let curr = listCopy.getHead();
      let currIndex = 0;
      while (currIndex < index) {

        if (currIndex - 1 >= 0) {
          renderDataCopy[currIndex - 1].head = null;
          renderDataCopy[currIndex - 1].state = ElementStates.Changing;
        }

        addSmallCircle(renderDataCopy, value, currIndex, "head");
        setRenderData([...renderDataCopy]);
        await setTimer(500);

        currIndex++;

        if (curr?.next && currIndex !== index) {
          curr = curr?.next;
        }
      }
      if (curr) {

        if (currIndex - 1 >= 0) {
          renderDataCopy[currIndex - 1].head = null;
          renderDataCopy[currIndex - 1].state = ElementStates.Changing;
        }

        addSmallCircle(renderDataCopy, value, currIndex, "head");
        setRenderData([...renderDataCopy]);
        await setTimer(500);

        listCopy.addByIndex(value, index);
        setList(listCopy);
        renderDataCopy = convertToRenderData(list.toArray());
        setRenderData([...renderDataCopy]);
        renderDataCopy[currIndex].state = ElementStates.Modified;
        setRenderData([...renderDataCopy]);
        await setTimer(500);

        setRenderData([...convertToRenderData(list.toArray())]);
      }
    }

    setloadingInProgress({
      addToHead: false,
      addToTail: false,
      removeHead: false,
      removeTail: false,
      addByIndex: false,
      removeByIndex: false,
      disabled: false
    });
  }

  const handleRemoveByIndex = async () => {
    if (parseInt(inputIndex) < 0 || parseInt(inputIndex) > list.getSize() - 1) {
      console.log('Введите корректный индекс');
      setInputIndex('');
      return;
    }

    setloadingInProgress({
      addToHead: false,
      addToTail: false,
      removeHead: false,
      removeTail: false,
      addByIndex: false,
      removeByIndex: true,
      disabled: true
    });

    const index = parseInt(inputIndex);
    const listCopy = list;
    let renderDataCopy = renderData;
    setInputIndex('');
    const head = listCopy.getHead();

    if (index >= 0 && index < listCopy.getSize() && head) {
      let curr = head;
      let currIndex = 0;

      if (index === 0) {
        renderDataCopy[0].state = ElementStates.Changing;
        setRenderData([...renderDataCopy]);
        await setTimer(500);
        renderDataCopy[0].state = ElementStates.Default;
        addSmallCircle(renderDataCopy, renderDataCopy[0].value, 0, "tail");
        renderDataCopy[0].value = '';
        setRenderData([...renderDataCopy]);
        await setTimer(500);
        listCopy.deleteHead();
        setList(listCopy);
        renderDataCopy = convertToRenderData(list.toArray());
        setRenderData([...renderDataCopy]);
      } else {
        while (currIndex < index) {
          renderDataCopy[currIndex].state = ElementStates.Changing;
          setRenderData([...renderDataCopy]);
          await setTimer(500);
          currIndex++
          if (curr.next) {
            curr = curr?.next;
          }
        }
        renderDataCopy[currIndex].state = ElementStates.Changing;
        setRenderData([...renderDataCopy]);
        await setTimer(500);
        renderDataCopy[currIndex].state = ElementStates.Default;
        addSmallCircle(renderDataCopy, renderDataCopy[currIndex].value, currIndex, "tail");
        renderDataCopy[currIndex].value = '';
        setRenderData([...renderDataCopy]);
        await setTimer(500);
        listCopy.deleteByIndex(index);
        setList(listCopy);
        renderDataCopy = convertToRenderData(list.toArray());
        setRenderData([...renderDataCopy]);
      }
    }

    setloadingInProgress({
      addToHead: false,
      addToTail: false,
      removeHead: false,
      removeTail: false,
      addByIndex: false,
      removeByIndex: false,
      disabled: false
    });
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={listStyles.wrapper}>
        <div className={listStyles.row}>
          <Input 
            maxLength = {4}
            isLimitText
            placeholder = "Введите значение"
            extraClass = {listStyles.input}
            onChange = {e => onInputValueChange(e as React.ChangeEvent<HTMLInputElement>)}
            value = {inputValue}
          />
          <Button 
            text='Добавить в head'
            extraClass = {listStyles.button}
            onClick = {handleAddToHeadClick}
            disabled = {inputValue === '' || loadingInProgress.disabled}
            isLoader = {loadingInProgress.addToHead}
          />
          <Button 
            text='Добавить в tail'
            extraClass = {listStyles.button}
            onClick = {handleAddToTailClick}
            disabled = {inputValue === '' || loadingInProgress.disabled}
            isLoader = {loadingInProgress.addToTail}
          />
          <Button 
            text='Удалить из head'
            extraClass = {listStyles.button}
            onClick = {handleRemoveHead}
            disabled = {list.toArray().length === 0 || loadingInProgress.disabled}
            isLoader = {loadingInProgress.removeHead}            
          />
          <Button 
            text='Удалить из tail'
            extraClass = {listStyles.button}
            onClick = {handleRemoveTail}
            disabled = {list.toArray().length === 0 || loadingInProgress.disabled}
            isLoader = {loadingInProgress.removeTail}            
          />
        </div>
        <div className={listStyles.row}>
          <Input
            min={0} 
            max = {5}
            step = {1}
            type = 'number'
            placeholder = "Введите индекс"
            extraClass = {listStyles.input}
            onChange = {e => onInputIndexChange(e as React.ChangeEvent<HTMLInputElement>)}
            value = {inputIndex}
          />
          <Button 
            text='Добавить по индексу'
            extraClass = {listStyles.buttonIndex}
            onClick = {handleAddByIndex}
            disabled = {inputValue === '' || inputIndex === '' || loadingInProgress.disabled}
            isLoader = {loadingInProgress.addByIndex}
          />
          <Button 
            text='Удалить по индексу'
            extraClass = {listStyles.buttonIndex}
            onClick = {handleRemoveByIndex}            
            disabled = {inputIndex === '' || loadingInProgress.disabled}  
            isLoader = {loadingInProgress.removeByIndex}        
          />
        </div>
     </form>
     <ul className = {listStyles.list}>
      {renderData.map((element, index) => {
        return (
        <li key={index} className = {listStyles.item}>
          <Circle 
            letter = {element.value}
            head = {element.head}
            tail = {element.tail}
            index = {index}
            extraClass = {listStyles.circle}
            state = {element.state}
          />
          {index < renderData.length - 1 && <ArrowIcon />}
        </li>)
      })}
     </ul>
    </SolutionLayout>
  );
};
