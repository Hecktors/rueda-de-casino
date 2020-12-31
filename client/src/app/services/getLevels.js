import { getMoves } from './moveAPIs'

export default async function getLevels(token) {
  const response = await getMoves(token)
  const moves = response.msg

  const levels = [...new Set(moves.map((move) => move.levelName))].map(
    (name) => {
      return { name: name, moves: [] }
    }
  )
  moves.forEach((move) =>
    levels.forEach(
      (level) => level.name === move.levelName && level.moves.push(move)
    )
  )
  return levels
}
