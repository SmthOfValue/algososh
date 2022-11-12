import {getReverseSteps} from './reverseString';


describe('Алгоритм разворота строки', () => {
    it('Алгоритм корректно разворачивает строку с четным количеством символов', () => {
        const reverseSteps = [['1', '2', '3', '4'], ['4', '2', '3', '1'], ['4', '3', '2', '1']];

        expect(getReverseSteps('1234')).toEqual(reverseSteps);
    });

    it('Алгоритм корректно разворачивает строку с нечетным количеством символов', () => {
        const reverseSteps = [['1', '2', '3', '4', '5'], ['5', '2', '3', '4', '1'], ['5', '4', '3', '2', '1'], ['5', '4', '3', '2', '1']];

        expect(getReverseSteps('12345')).toEqual(reverseSteps);
    });

    it('Алгоритм корректно разворачивает строку с одним символом', () => {
        const reverseSteps = [['1']];

        expect(getReverseSteps('1')).toEqual(reverseSteps);
    });

    it('Алгоритм корректно разворачивает пустую строку', () => {
        const reverseSteps = [[]];

        expect(getReverseSteps('')).toEqual(reverseSteps);
    });
});