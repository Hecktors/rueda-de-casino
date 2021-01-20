import checkRegisterInput from './checkRegisterInput'

const inputMock = {
  email: 'test@gmail.com',
  password: 'abCD1234',
  passwordCheck: 'abCD1234'
}
describe('Register input validation', () => {
  it('should be falsy if email is empty', () => {
    expect(checkRegisterInput({...inputMock, email: ''}).result).toBeFalsy()
  })

  it('is be falsy if password is empty', () => {
    expect(checkRegisterInput({...inputMock, password: ''}).result).toBeFalsy()
  })

  it('is be falsy if passwordCheck is empty', () => {
    expect(checkRegisterInput({...inputMock, passwordCheck: ''}).result).toBeFalsy()
  })

  it('is be falsy if password in not equal passwordCheck', () => {
    expect(checkRegisterInput({...inputMock, passwordCheck: 'abCD1235'}).result).toBeFalsy()
  })
})