import checkEmail from './checkEmail'

describe('Email check function', () => {
    it('should be a valid email address', () =>  {
        expect(checkEmail('test@gmail.com')).toBeTruthy()
    })

    it('should be falsy if doesn\'t contain local part', () =>  {
        expect(checkEmail('@gmail.com')).toBeFalsy()
    })

    it('should be falsy if doesn\'t contain at sign', () =>  {
        expect(checkEmail('testgmail.com')).toBeFalsy()
    })

    it('should be falsy if doesn\'t contain period between hostname and top-level.domain ', () =>  {
        expect(checkEmail('test@gmailcom')).toBeFalsy()
    })

    it('should be falsy if doesn\'t contain valid top-level.domain', () =>  {
        expect(checkEmail('test@gmail.c')).toBeFalsy()
    })
})