import React, { useState }from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import stackStyles from './stack-page.module.css';
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { setTimer } from '../../utils/utils';

type TElementObj = 
  {
    value: string;
    state: ElementStates;
  };

  type TLoadingInProgress = {
    add: boolean;
    remove: boolean;
  }

export const StackPage: React.FC = () => {

  const [input, setInput] = useState('');
  const st = new Stack<TElementObj>();
  const [stack, setStack] = useState<Stack<TElementObj>>(st);
  const [circles, setCircles] = useState<TElementObj[]>([]);
  const [loadingInProgress, setloadingInProgress] = useState<TLoadingInProgress>({
    add: false,
    remove: false
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleAddClick = async () => {
    setloadingInProgress({
      add: true,
      remove: false
    });
    const inputValue = input;
    const stackCopy = stack;
    stackCopy.push({value: inputValue, state: ElementStates.Changing});
    setInput('');
    setStack(stackCopy);
    setCircles([...stackCopy.getElements()]);
    await setTimer(300);
    stackCopy.peek().state = ElementStates.Default;
    setStack(stackCopy);
    setCircles([...stackCopy.getElements()]);   
    setloadingInProgress({
      add: false,
      remove: false
    });
  }

  const handleDeleteClick = async () => {
    setloadingInProgress({
      add: false,
      remove: true
    });
    const stackCopy = stack;
    stackCopy.peek().state = ElementStates.Changing;
    setStack(stackCopy);
    setCircles([...stackCopy.getElements()]);
    await setTimer(300);
    stackCopy.pop();
    setStack(stackCopy);
    setCircles([...stackCopy.getElements()]);
    setloadingInProgress({
      add: false,
      remove: false
    });
  }

  const handleClearClick = () => {
    const stackCopy = stack;
    stackCopy.clear();
    setStack(stackCopy);
    setCircles([]);
  }


  return (
    <SolutionLayout title="Стек">
      <form className={stackStyles.wrapper}>
        <Input 
          maxLength = {4}
          isLimitText
          placeholder = "Введите текст"
          extraClass = {stackStyles.input}
          onChange = {e => onInputChange(e as React.ChangeEvent<HTMLInputElement>)}
          value = {input}
        />
        <Button 
          text='Добавить'
          extraClass={stackStyles.button}
          onClick={handleAddClick}
          disabled = {input === ''}
          isLoader = {loadingInProgress.add}
        />
        <Button 
          text='Удалить'
          extraClass={stackStyles.button}
          onClick = {handleDeleteClick}
          disabled = {stack.getSize() === 0}
          isLoader = {loadingInProgress.remove}
        />
        <Button 
          text='Очистить'
          extraClass={stackStyles.button}
          onClick={handleClearClick}
          disabled = {stack.getSize() === 0}
        />
     </form>
     <ul className={stackStyles.list}>
      {circles.map((element, index) => {
        return (
          <li className={stackStyles.item} key={index}>
            <Circle 
              letter = {element.value}
              index = {index}
              head = {index === stack.getSize() - 1 ? 'top' : null}
              state = {element.state}
            />
          </li>
        )
      })}
     </ul>
    </SolutionLayout>
  );
};
