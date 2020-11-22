import styled from 'styled-components/macro'
import HeaderButton from './HeaderButton'
import PropTypes from 'prop-types'

Header.propTypes = {
  appState: PropTypes.string.isRequired,
  stopSession: PropTypes.func,
  toggleSettings: PropTypes.func,
}

export default function Header({
  appState,
  stopSession,
  toggleSettings,
  deleleSelectedMoves,
}) {
  let title = 'Salsa Time'
  if (appState === 'sessionPlay') title = 'Bailamos!!!'
  if (appState === 'sessionPause') title = 'Pause'
  if (appState === 'settings') title = 'Settings'
  if (appState === 'settings') title = 'Settings'

  const handleClick =
    appState === 'home' || appState === 'settings'
      ? toggleSettings
      : stopSession

  const isHome = appState === 'home'
  const hasButtonRight = appState !== 'sessionPlay'
  const hasButtonLeft = appState === 'settings'

  const buttonLeft = hasButtonLeft ? (
    <HeaderButton isResetButton={true} appState={appState} onClick={() => {}} />
  ) : null

  const buttonRight = hasButtonRight ? (
    <HeaderButton
      onClick={handleClick}
      appState={appState}
      isResetButton={false}
    />
  ) : null

  return (
    <HeaderStyled>
      <h1 className={isHome ? 'title' : ''}>
        {buttonLeft}
        {title}
        {buttonRight}
      </h1>
      {isHome && <h2 className="subtitle">El cantante de la rueda</h2>}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: relative;
  display: grid;
  place-items: center;

  h1 {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 1.8rem;
    font-weight: normal;
  }
  .title {
    font-family: 'Molle', cursive;
    color: var(--color-secondary);
    font-size: 3rem;
  }
  .subtitle {
    font-size: 1.2rem;
    position: absolute;
    bottom: -10px;
    text-transform: uppercase;
    color: var(--color-secondary);
    font-family: 'Molle', cursive;
  }
`
