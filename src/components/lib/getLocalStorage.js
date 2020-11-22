import { ThemeConsumer } from 'styled-components'

export default function getLocalStorage(key) {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}
