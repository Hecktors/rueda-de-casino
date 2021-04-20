export default function getRandomArrayElement(arr) {
  if(!arr || !arr.length) {
    return null
  }
  const movesNum = arr.length
  const randomNum = Math.floor(Math.random() * movesNum)
  return arr[randomNum]
}
