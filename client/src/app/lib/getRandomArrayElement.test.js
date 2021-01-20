import getRandomArrayElement from './getRandomArrayElement'

const arrMock = ['a','b']

describe('Random item of array function', () => {
    it('returns a string', () => {
      expect(getRandomArrayElement(arrMock)).toEqual(expect.any(String))
    })

    it('has a deviation < 1% at 1.000.000 attemps', () => {
      const resultCounter = {a: 0, b:0}
      Array(1000000).fill().forEach(() => {
        const randomItem = getRandomArrayElement(arrMock)
        resultCounter[randomItem] = resultCounter[randomItem] + 1
      })
      const deviation = 100 - 100 * resultCounter.a / resultCounter.b
      expect(deviation).toBeLessThan(1)
    })

    it('returns null if array is empty', () => {
      expect(getRandomArrayElement([])).toBe(null)
    })

    it('returns null if no argument is passed', () => {
      expect(getRandomArrayElement()).toBe(null)
    })
})