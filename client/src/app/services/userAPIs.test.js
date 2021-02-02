import {deleteUser, loginUser, registerUser, validateToken} from './userAPIs'

describe.skip('Register user', () => {
  const userMock = {
    displayName: 'testName',
    email: 'test@email.com',
    password: 'abCD1234',
    passwordCheck: 'abCD1234',
  }
  
  it('response with status 200', () => {
      expect.assertions(1)
      return registerUser(userMock)
      .then(response => expect(response.status).toBe(200))
    })
    
    it('response with status 400', () => {
    expect.assertions(1)
    return registerUser(userMock)
    .then(response => expect(response.status).toBe(400))
  })
  
  it('gets token and user data', () => {
    expect.assertions(3)
    return loginUser({email: userMock.email, password: userMock.password})
    .then ( response => {
      const token = response.data.token
      expect(token).toBeTruthy()
      expect(response.data.user.id).toBeTruthy()
      expect(response.data.user.displayName).toBe('testName')
    })
  })
  
  it('is token valid', () => {
    expect.assertions(1)
    return loginUser({email: userMock.email, password: userMock.password})
    .then(response => validateToken(response.data.token))
      .then(response2 => expect(response2).toBeTruthy())
  })
  
  it('gets status code of 200 and mesage', () => {
    expect.assertions(2)
    return loginUser({email: userMock.email, password: userMock.password})
    .then(response => deleteUser(response.data.token))
      .then(response2 => {
        expect(response2.status).toBe(200)
        expect(response2.data.msg).toBeTruthy()
      })
  })
})