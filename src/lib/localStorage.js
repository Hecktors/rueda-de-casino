export function getLocalStorage(key) {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
