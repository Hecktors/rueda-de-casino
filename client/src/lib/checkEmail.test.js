import checkEmail from './checkEmail'

describe('Email check function', () => {
    it('is a valid email address', () =>  {
        expect(checkEmail('test@gmail.com')).toBeTruthy()
    })

    it('doesn\'t contain local part', () =>  {
        expect(checkEmail('@gmail.com')).toBeFalsy()
    })

    it('doesn\'t contain at sign', () =>  {
        expect(checkEmail('testgmail.com')).toBeFalsy()
    })

    it('doesn\'t contain period between hostname and top-level.domain ', () =>  {
        expect(checkEmail('test@gmailcom')).toBeFalsy()
    })

    it('doesn\'t contain valid top-level.domain', () =>  {
        expect(checkEmail('test@gmail.c')).toBeFalsy()
    })
})