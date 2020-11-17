import styled from 'styled-components/macro'
import HeaderButton from './HeaderButton'

export default function Header({ appState, handleClick }) {
  const color =
    appState === 'default'
      ? 'var(--default-heder-color)'
      : 'var(--running-header-color)'

  const title =
    appState === 'default'
      ? 'Rueda De Salsa'
      : appState === 'playing'
      ? 'Bailamos!!!'
      : 'Pause'

  return (
    <HeaderStyled color={color}>
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
  color: ${(props) => props.color};
`
