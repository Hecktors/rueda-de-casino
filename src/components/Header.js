import styled from 'styled-components/macro'
import HeaderButton from './HeaderButton'

export default function Header({ appState, handleClick }) {
  const title =
    appState === 'default'
      ? 'Rueda De Salsa'
      : appState === 'playing'
      ? 'Bailamos!!!'
      : 'Paused'

  return (
    <HeaderStyled>
      {title}
      {appState === 'paused' && <HeaderButton handleClick={handleClick} />}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: relative;
  display: grid;
  place-items: center;
  font-size: 2rem;
`
