import { useState, useContext } from 'react'
import { Context } from '../../context/Context'

export default function useLogin() {
  const { loginUser } = useContext(Context)
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })

  let isRequiredFilled = userInput.email && userInput.password

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    loginUser(userInput)
  }

  return { userInput, isRequiredFilled, handleChange, handleSubmit }
}
