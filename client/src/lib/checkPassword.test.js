import checkPassword from './checkPassword'

describe('Password check function', () => {
  it('contains lowercase letters, uppercase letters, numbers, min length of 8', () => 
    expect(checkPassword('abCD1234')).toBeTruthy()
  )

  it('has min length lower than 8', () => 
    expect(checkPassword('abCD123')).toBeFalsy()
  )

  it('contains lowercase letters', () => 
  expect(checkPassword('ABCD1234')).toBeFalsy()
  )

  it('contains uppercase letters', () => 
  expect(checkPassword('abcd1234')).toBeFalsy()
  )

  it('contains numers', () => 
  expect(checkPassword('abcd1234')).toBeFalsy()
  )
})