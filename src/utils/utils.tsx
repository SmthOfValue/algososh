//функция возвращает промис, который резолвится после задержки
export const setTimer = (ms: number) => new Promise(res => setTimeout(res, ms));