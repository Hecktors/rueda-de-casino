export default function getMoves() {
  return fetch('../moves.json').then((data) => data.json())
}
