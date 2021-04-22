import { useState, useContext } from 'react'
import { Context } from '../../context/Context'

export default function usePasswordRenew(resetToken) {
  const { saveNewPassword } = useContext(Context)

  const [userInput, setUserInput] = useState({
    password: '',
    passwordCheck: '',
  })

  const isRequiredFilled = userInput.password && userInput.passwordCheck

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    saveNewPassword(resetToken, userInput)
  }

  return { userInput, isRequiredFilled, handleChange, handleSubmit }
}
