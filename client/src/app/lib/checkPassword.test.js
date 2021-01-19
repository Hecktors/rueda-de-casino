import { isTypeReferenceNode } from 'typescript'
import checkPassword from './checkPassword'

describe('Password check function', () => {
  it('should pass if have contains lowercase letters, uppercase letters, numbers, min length of 8', () => 
    expect(checkPassword('abCD1234')).toBeTruthy()
  )

  it('should\'t pass if min length lower than 8', () => 
    expect(checkPassword('abCD123')).toBeFalsy()
  )

  it('should pass if doesn\'t contains lowercase letters', () => 
  expect(checkPassword('ABCD1234')).toBeFalsy()
  )

  it('should pass if doesn\'t contains uppercase letters', () => 
  expect(checkPassword('abcd1234')).toBeFalsy()
  )

  it('should pass if doesn\'t contains numers', () => 
  expect(checkPassword('abcd1234')).toBeFalsy()
  )
})