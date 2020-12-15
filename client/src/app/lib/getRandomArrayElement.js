export default function getRandomArrayElement(arr) {
  const movesNum = arr.length
  const randomNum = Math.floor(Math.random() * movesNum)
  return arr[randomNum]
}
