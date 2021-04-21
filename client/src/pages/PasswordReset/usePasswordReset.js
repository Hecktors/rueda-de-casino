import { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import checkEmail from '../../lib/checkEmail'
import { fetchPasswordReset } from '../../services/userAPIs'

export default function usePasswordReset() {
  const { error, setError } = useContext(Context)
  const [userInput, setUserInput] = useState({
    email: '',
  })
  const [emailIsSent, setEmailIsSent] = useState(false)
  const isRequiredFilled = userInput.email

  const isEmailValid = checkEmail(userInput.email)

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!userInput.email) {
      setError('All required field have to been filled.')
      return
    }

    if (!isEmailValid) {
      setError('The entered email is not valid')
      return
    }

    const response = await fetchPasswordReset(userInput.email)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      error && setError('')
      setEmailIsSent(true)
    }
  }
  return {
    userInput,
    isRequiredFilled,
    emailIsSent,
    handleChange,
    handleSubmit,
  }
}
