import styled from 'styled-components/macro'
import HeaderButton from './HeaderButton'
import PropTypes from 'prop-types'

Header.propTypes = {
  appState: PropTypes.string.isRequired,
  stopSession: PropTypes.func,
  toggleSettings: PropTypes.func,
}

export default function Header({ appState, stopSession, toggleSettings }) {
  let title = 'Rueda De Casino'
  if (appState === 'sessionPlay') title = 'Bailamos!!!'
  if (appState === 'sessionPause') title = 'Pause'
  if (appState === 'settings') title = 'Settings'

  const handleClick =
    appState === 'home' || appState === 'settings'
      ? toggleSettings
      : stopSession

  const hasButton = appState !== 'sessionPlay'

  return (
    <HeaderStyled>
      <h1>{title}</h1>
      {hasButton && <HeaderButton onClick={handleClick} appState={appState} />}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: relative;
  display: grid;
  place-items: center;

  h1 {
    font-weight: lighter;
    font-size: 1.5rem;
  }
`
