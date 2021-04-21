import { useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import { loginUser } from '../../services/userAPIs'

export default function () {
  const history = useHistory()
  const { setUserData, setError } = useContext(Context)
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })

  let isValid = userInput.email && userInput.password

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!userInput.email || !userInput.password) {
      setError('All required field have to been filled.')
      return
    }

    const loginResponse = await loginUser({
      email: userInput.email,
      password: userInput.password,
    })

    if (loginResponse.status !== 200) {
      setError(loginResponse.data.msg)
    } else {
      setError('')
      setUserData(loginResponse.data)
      history.push('/')
    }
  }

  return { userInput, isValid, handleChange, handleSubmit }
}
