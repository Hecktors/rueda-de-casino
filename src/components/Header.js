import styled from 'styled-components'

function Header({name}) {
    return (
        <HeaderStyled>
            {name}
        </HeaderStyled>
    )
}

const HeaderStyled = styled.header`
    display: grid;
    place-items: center;
    color: midnightblue;
`
/** @component */
export default Header
