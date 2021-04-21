import { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import { fetchPasswordRenew } from '../../services/userAPIs'

export default function usePasswordRenew(resetToken) {
  const { loginUser } = useContext(Context)

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
    const response = await fetchPasswordRenew(
      resetToken,
      userInput.password,
      userInput.passwordCheck
    )
    if (response.status === 200) {
      loginUser({ email: response.data.email, password: userInput.password })
    }
  }

  return { userInput, isRequiredFilled, handleChange, handleSubmit }
}
