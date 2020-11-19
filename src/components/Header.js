import styled from 'styled-components/macro'
import HeaderButton from './HeaderButton'

export default function Header({ appState, handleClick }) {
  const title =
    appState === 'default'
      ? 'Rueda De Casino'
      : appState === 'playing'
      ? 'Bailamos!!!'
      : 'Pause'

  return (
    <HeaderStyled>
      <h1>{title}</h1>
      {appState === 'paused' && <HeaderButton handleClick={handleClick} />}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: relative;
  display: grid;
  place-items: center;

  h1 {
    font-weight: lighter;
    font-size: 2rem;
  }
`
