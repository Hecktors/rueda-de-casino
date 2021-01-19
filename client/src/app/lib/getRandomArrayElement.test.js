import getRandomArrayElement from './getRandomArrayElement'

const arrMock = ['a','b','c']

describe('Random item of array function', () => {
    it('should return a string', () => {
      expect(getRandomArrayElement(arrMock)).toEqual(expect.any(String))
    })
})