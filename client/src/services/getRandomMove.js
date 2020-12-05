export default function getRandomMove(selectedMoves) {
  const movesNum = selectedMoves.length
  const randomNum = Math.floor(Math.random() * movesNum)
  return selectedMoves[randomNum]
}
