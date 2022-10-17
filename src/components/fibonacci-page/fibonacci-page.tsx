import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import fibonacciStyles from './fibonacci-page.module.css';
import { DelayedComponent } from "../delayed-component/delayed-component";

export const FibonacciPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  const [numbers, setNumbers] = useState<Array<number>>([]);
  
  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNumbers([]);
    setNumber(Number(e.currentTarget.value));
  }

  const calculateFibonacciNumbers = () => { 
    const delay = 500*(number+1);
    setIsLoading(true);
    const array: number[] = [];
    const n = number; 
    array.push(1);
    array.push(1);
    for (let i = 2; i < n + 1; i++) {
      array.push(array[i - 2] + array[i - 1])       
    }
    setNumbers(array);
    setTimeout(function() {
      setIsLoading(false);
    }, delay) 
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={fibonacciStyles.wrapper}>
        <Input 
          max="19"
          min="1"
          step="1"
          type = 'number'
          isLimitText
          placeholder = "Введите число"
          extraClass={fibonacciStyles.input} 
          onChange={e => onInputChange(e)}
          value={number}
        />
        <Button 
          text='Рассчитать' 
          isLoader={isLoading} onClick={calculateFibonacciNumbers}
          disabled = {number === 0 || number > 19}/>
     </form>
     <ul className={fibonacciStyles.list}>
      {numbers.map((num, index) => {
        return (
          <DelayedComponent key={index} delay={500*(index+1)}>
            <li className={fibonacciStyles.item}>
              <Circle 
                letter = {num.toString()}
                index = {index}
              />
            </li>
          </DelayedComponent>
        )
      })}
     </ul>
    </SolutionLayout>
  );
};
