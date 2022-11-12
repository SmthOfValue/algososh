export const getReverseSteps = (word: string) => {
    const array = word.split(''); 
    const steps: string[][] = [];
    steps.push([...array]);
    const length = array.length;
    if (array.length === 1) {
      return steps;
    }
    const wordCenter = length%2 === 0 ? Math.floor(length / 2) - 1: Math.floor(length / 2);
    let temp: string;
    for (let i = 0;i <= wordCenter; i++) {
      temp = array[length - i - 1];
      array[length - i - 1] = array[i];
      array[i] = temp;
      steps.push([...array]);
    }
    return steps;
  }