import React, {useState, useEffect} from "react";
import stringStyles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { setTimer } from '../../utils/utils';

type TCharObj = 
  {
    char: string;
    state: ElementStates;
  };

type TCharState = Array<TCharObj>

export const StringComponent: React.FC = () => {

  const [characters, setCharacters] = useState<TCharState>([]);
  const [circles, setCircles] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
    setCharacters(e.currentTarget.value.split('').map((item) => {
      return {
        char: item,
        state: ElementStates.Default
      }
    }));
  }

  //обновление стейта с кругами
  const updateCircles = () => {
    setCircles(characters.map((char, index) => {
      return (
        <li key={index} >
        <Circle 
          letter = {char.char}
          state = {char.state}
        />
      </li>
      )
    }));
  }

  //асинхронная функция, чтобы можно было использовать await для setTimer
  const reverseWord = async () => {
    setIsLoading(true);
    updateCircles();
    const array = characters;
    const length = array.length;
    const wordCenter = length%2 === 0 ? Math.floor(length / 2) - 1: Math.floor(length / 2);
    let temp: TCharObj;    
    for (let i = 0; i <= wordCenter; i++) {
      setTimeout(function() {
        array[i].state = ElementStates.Changing;
        array[length - i - 1].state = ElementStates.Changing;
        setCharacters(array);
        updateCircles();
        setTimeout(function() {
          temp = array[length - i - 1];
          array[length - i - 1] = array[i];
          array[i] = temp;
          array[i].state = ElementStates.Modified;
          array[length - i - 1].state = ElementStates.Modified;
          setCharacters(array);
          updateCircles();
        }, 1000)
      }, 1000);
      await setTimer(1000);
    } 
    setTimeout(function() {
      setIsLoading(false);
    }, 1000)       
  }

  
  
  return (
    <SolutionLayout title="Строка" >
      <form className={stringStyles.wrapper} onSubmit={e => {onFormSubmit(e)}}>
        <Input 
          maxLength={11}
          isLimitText
          extraClass={stringStyles.input} 
          onChange={e => {onInputChange(e)}}
          value={input}
        />
        <Button 
          text='Развернуть' 
          onClick={reverseWord} 
          isLoader={isLoading}
          disabled={input === ''} />
     </form>
     <ul className={stringStyles.list}>
      {circles}
     </ul>
    </SolutionLayout>
  );
};
