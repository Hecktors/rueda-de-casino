import { useState, useContext } from 'react'
import { Context } from '../../context/Context'

export default function useRegister() {
  const { registerUser } = useContext(Context)

  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  })

  const isRequiredFilled =
    userInput.email && userInput.password && userInput.passwordCheck

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await registerUser(userInput)
  }

  return { userInput, isRequiredFilled, handleChange, handleSubmit }
}
