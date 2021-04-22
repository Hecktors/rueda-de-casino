import { useState, useContext } from 'react'
import { Context } from '../../context/Context'

export default function usePasswordReset() {
  const { getResetLink } = useContext(Context)
  const [userInput, setUserInput] = useState({
    email: '',
  })
  const [emailIsSent, setEmailIsSent] = useState(false)
  const isRequiredFilled = userInput.email

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setEmailIsSent(await getResetLink(userInput))
  }
  return {
    userInput,
    isRequiredFilled,
    emailIsSent,
    handleChange,
    handleSubmit,
  }
}
