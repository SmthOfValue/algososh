
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './button';

describe('Рендер Button', () => {
  it('Кнопка с текстом рендерится без ошибок', () => {
    const buttonWithText = renderer
      .create(<Button text="Проверочный текст" />)
      .toJSON();
      expect(buttonWithText).toMatchSnapshot();
  }); 

  it('Кнопка без текста рендерится без ошибок', () => {
    const buttonWithoutText = renderer
      .create(<Button />)
      .toJSON();
      expect(buttonWithoutText).toMatchSnapshot();
  }); 

  it('Кнопка в состоянии disabled рендерится без ошибок', () => {
    const buttonDisabled = renderer
      .create(<Button disabled />)
      .toJSON();
      expect(buttonDisabled).toMatchSnapshot();
  });

  it('Кнопка в состоянии loading рендерится без ошибок', () => {
    const buttonLoading = renderer
      .create(<Button isLoader={true} />)
      .toJSON();
      expect(buttonLoading).toMatchSnapshot();
  }); 
});

describe('Обработчик события нажатия кнопки', () => {
  it('Нажатие на кнопку вызывает корректный колбэк', () => {
    const callback = jest.fn();
    

    render(<Button text = 'Текст кнопки' onClick = {(callback)}/>)

    const button = screen.getByText("Текст кнопки");  

    fireEvent.click(button);        
    expect(callback).toHaveBeenCalled();
  }); 
});

