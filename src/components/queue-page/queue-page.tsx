import React, { useEffect, useState }from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import queueStyles from './queue-page.module.css';
import { Queue } from "./queue";
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

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState('');
  const startingQueue = new Queue<TElementObj>(7);
  const [queue, setQueue] = useState<Queue<TElementObj>>(startingQueue);
  const [circles, setCircles] = useState<(TElementObj | null)[]>(queue.getElements());

  const [loadingInProgress, setloadingInProgress] = useState<TLoadingInProgress>({
    add: false,
    remove: false
  });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.currentTarget.value);
  }

  const handleAddClick = async () => {
    setloadingInProgress({
      add: true,
      remove: false
    });
    const inputValue = input;
    const queueCopy = queue;
    queueCopy.enqueue({value: inputValue, state: ElementStates.Changing});
    setInput('');
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
    await setTimer(300);
    const lastElement = queueCopy.getElements()[queueCopy.getTail()];
    if (lastElement !== null) {
      lastElement.state = ElementStates.Default;
    }
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);   
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
    const queueCopy = queue;
    const firstElement = queueCopy.peek();
    if (firstElement !== null) {
      firstElement.state = ElementStates.Changing;
    }    
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
    await setTimer(300);
    queueCopy.dequeue();
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
    setloadingInProgress({
      add: false,
      remove: false
    });
  }

  const handleClearClick = () => {
    const queueCopy = queue;
    queueCopy.clear();
    setQueue(queueCopy);
    setCircles([...queueCopy.getElements()]);
  }

  const createEmptyCircles = () => {
    const arr: Array<JSX.Element> = [];
    for (let i = 0; i < 7; i++) {
      arr.push(<li className={queueStyles.item} key={i}>
        <Circle 
          letter = ''
          index = {i}
        />
      </li>);
    }
    return arr;
  }

  const emptyCircles = createEmptyCircles();

  return (
    <SolutionLayout title="Очередь">
      <form className={queueStyles.wrapper} onSubmit={e => {onFormSubmit(e)}}>
        <Input 
          maxLength = {4}
          isLimitText
          placeholder = "Введите текст"
          extraClass = {queueStyles.input}
          onChange = {e => onInputChange(e)}
          value = {input}
        />
        <Button 
          text='Добавить'
          extraClass={queueStyles.button}
          onClick={handleAddClick}
          disabled = {input === ''}
          isLoader = {loadingInProgress.add}
        />
        <Button 
          text='Удалить'
          extraClass={queueStyles.button}
          onClick = {handleDeleteClick}
          disabled = {queue.isEmpty()}
          isLoader = {loadingInProgress.remove}
        />
        <Button 
          text='Очистить'
          extraClass={queueStyles.button}
          onClick={handleClearClick}
          disabled = {queue.isEmpty()}
        />
     </form>
     <ul className={queueStyles.list}>
      {queue.isEmpty() &&
        emptyCircles
      }
      {!queue.isEmpty() &&
        circles.map((element, index) => {
          return (
            <li className={queueStyles.item} key={index}>
              <Circle 
                letter = {element ? element.value : ''}
                index = {index}
                head = {queue.getHead() === index ? 'top' : null}
                tail = {queue.getTail() === index  ? 'tail' : null}
                state = {element ? element.state : ElementStates.Default}
              />
            </li>
          )
        })
      }
     </ul>
    </SolutionLayout>
  );
};
