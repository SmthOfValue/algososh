import React, {useState, useEffect} from "react";
import stringStyles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { setTimer } from '../../utils/utils';
import { getReverseSteps } from './reverseString';

type TCharObj = 
  {
    char: string;
    state: ElementStates;
  };

type TCharState = Array<TCharObj>

export const StringComponent: React.FC = () => {

  const [characters, setCharacters] = useState<TCharState>([{
    char: '',
    state: ElementStates.Default
  }]);
  const [circles, setCircles] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [word, setWord] = useState<string>('');  

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    setCharacters(e.target.value.split('').map((item) => {
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

  const renderReverseSteps = async () => {
    setIsLoading(true);
    updateCircles();
    await setTimer(1000);
    const charactersCopy = characters;
    const steps = getReverseSteps(word);
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];         
      //подсвечиваю фиолетовым
      if (charactersCopy[i].state !== ElementStates.Modified 
          && charactersCopy[charactersCopy.length - i - 1].state !== ElementStates.Modified) {
         charactersCopy[i] = {
           char: step[i],
           state: ElementStates.Changing
         }
        charactersCopy[charactersCopy.length - i - 1] = {
          char: step[charactersCopy.length - i - 1],
          state: ElementStates.Changing
        }
        setCharacters([...charactersCopy]);
        updateCircles();
        await setTimer(1000);
      }
      //подсвечиваю зеленым
      if (i + 1 < steps.length) {
        charactersCopy[i] = {
          char: steps[i+1][i],
          state: ElementStates.Modified
        }
        charactersCopy[charactersCopy.length - i - 1] = {
          char: steps[i+1][charactersCopy.length - i - 1],
          state: ElementStates.Modified
        }
        setCharacters([...charactersCopy]);
        updateCircles();
        await setTimer(1000);
      }   
      if (steps.length === 1) {
        charactersCopy[i] = {
          char: step[i],
          state: ElementStates.Modified
        }
        setCharacters([...charactersCopy]);
        updateCircles();
        await setTimer(1000);
      }      
    }
    setIsLoading(false);
  }

  // //асинхронная функция, чтобы можно было использовать await для setTimer
  // const reverseWord = async () => {
  //   setIsLoading(true);
  //   updateCircles();
  //   const array = characters;
  //   const length = array.length;
  //   const wordCenter = length%2 === 0 ? Math.floor(length / 2) - 1: Math.floor(length / 2);
  //   let temp: TCharObj;    
  //   for (let i = 0; i <= wordCenter; i++) {
  //     setTimeout(function() {
  //       array[i].state = ElementStates.Changing;
  //       array[length - i - 1].state = ElementStates.Changing;
  //       setCharacters(array);
  //       updateCircles();
  //       setTimeout(function() {
  //         temp = array[length - i - 1];
  //         array[length - i - 1] = array[i];
  //         array[i] = temp;
  //         array[i].state = ElementStates.Modified;
  //         array[length - i - 1].state = ElementStates.Modified;
  //         setCharacters(array);
  //         updateCircles();
  //       }, 1000)
  //     }, 1000);
  //     await setTimer(1000);
  //   } 
  //   setTimeout(function() {
  //     setIsLoading(false);
  //   }, 1000)       
  // }

  
  
  return (
    <SolutionLayout title="Строка" >
      <form className={stringStyles.wrapper}>
        <Input 
          maxLength={11}
          isLimitText
          extraClass={stringStyles.input} 
          onChange={e => onInputChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
        <Button text='Развернуть' onClick={renderReverseSteps} isLoader={isLoading} />
     </form>
     <ul className={stringStyles.list}>
      {circles}
     </ul>
    </SolutionLayout>
  );
};
