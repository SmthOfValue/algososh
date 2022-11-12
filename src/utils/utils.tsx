//функция возвращает промис, который резолвится после задержки
export const setTimer = (ms: number) => new Promise(res => setTimeout(res, ms));



//функция генерации случайного массива чисел в виде строк
export const randomStringArr = (minLen = 3, maxLen = 6) => {
    const limit = Math.floor(Math.random() * (maxLen + 1 - minLen)) + minLen;
    const randomArr = [];
    for (let i = 0; i < limit; i++) {
      randomArr.push(Math.floor(Math.random()*100).toString());
    }
    return randomArr;
  }
