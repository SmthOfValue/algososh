import React from "react";
import renderer from 'react-test-renderer';
import { ElementStates } from "../../../types/element-states";

import { Circle } from './circle';

describe('Рендер Circle', () => {
  it('Circle без букв рендерится без ошибок', () => {
    const circleWithoutLetter = renderer
      .create(<Circle />)
      .toJSON();
      expect(circleWithoutLetter).toMatchSnapshot();
  }); 

  it('Circle с буквами рендерится без ошибок', () => {
    const circleWithLetter = renderer
      .create(<Circle letter='буквы' />)
      .toJSON();
      expect(circleWithLetter).toMatchSnapshot();
  }); 

  it('Circle с head рендерится без ошибок', () => {
    const circleWithHead = renderer
      .create(<Circle head = 'head' />)
      .toJSON();
      expect(circleWithHead).toMatchSnapshot();
  });

  it('Circle с React-элементом в head рендерится без ошибок', () => {

    const reactElement = React.createElement('div');

    const circleWithReactElementAsHead = renderer
      .create(<Circle head = {reactElement} />)
      .toJSON();
      expect(circleWithReactElementAsHead).toMatchSnapshot();
  });

  it('Circle с tail рендерится без ошибок', () => {
    const circleWithTail = renderer
      .create(<Circle tail = 'tail' />)
      .toJSON();
      expect(circleWithTail).toMatchSnapshot();
  });

  it('Circle с React-элементом в tail рендерится без ошибок', () => {

    const reactElement = React.createElement('div');

    const circleWithReactElementAsTail = renderer
      .create(<Circle tail = {reactElement} />)
      .toJSON();
      expect(circleWithReactElementAsTail).toMatchSnapshot();
  });

  it('Circle с index рендерится без ошибок', () => {
    const circleWithIndex = renderer
      .create(<Circle index = {0} />)
      .toJSON();
      expect(circleWithIndex).toMatchSnapshot();
  });

  it('Circle с пропом isSmall = true рендерится без ошибок', () => {
    const circleWithIsSmall = renderer
      .create(<Circle isSmall = {true} />)
      .toJSON();
      expect(circleWithIsSmall).toMatchSnapshot();
  });

  it('Circle в состоянии default рендерится без ошибок', () => {
    const circleInDefaultState = renderer
      .create(<Circle state = {ElementStates.Default} />)
      .toJSON();
      expect(circleInDefaultState).toMatchSnapshot();
  });

  it('Circle в состоянии changing рендерится без ошибок', () => {
    const circleInChangingState = renderer
      .create(<Circle state = {ElementStates.Changing} />)
      .toJSON();
      expect(circleInChangingState).toMatchSnapshot();
  });

  it('Circle в состоянии modified рендерится без ошибок', () => {
    const circleInModifiedState = renderer
      .create(<Circle state = {ElementStates.Modified} />)
      .toJSON();
      expect(circleInModifiedState).toMatchSnapshot();
  });
});