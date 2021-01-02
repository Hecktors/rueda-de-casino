// import { getAudio } from './audioAPIs'

// export default async function getAudioElements(token, levels) {
//   if (!levels) {
//     return
//   }
//   const moves = levels.map((level) => level.moves).flat()

//   return moves.map(async (move) => {
//     return {
//       moveID: move._id,
//       audioElement: new Audio(await getAudio(token, move.audioName)),
//     }
//   })
// }
