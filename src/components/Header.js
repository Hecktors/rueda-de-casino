import styled from 'styled-components/macro'
import HeaderButton from './HeaderButton'
import PropTypes from 'prop-types'

Header.propTypes = {
  appState: PropTypes.string.isRequired,
  stopSession: PropTypes.func,
  toggleSettings: PropTypes.func,
}

export default function Header({ appState, stopSession, toggleSettings }) {
  let title = 'Salsa Time'
  if (appState === 'sessionPlay') title = 'Bailamos!!!'
  if (appState === 'sessionPause') title = 'Pause'
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
        <span className="header__btn header__btn--left">{buttonLeft}</span>
        {title}
        <span className="header__btn header__btn--right">{buttonRight}</span>
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
    font-size: 2.5rem;
  }
  .subtitle {
    font-size: 1.1rem;
    position: absolute;
    bottom: -10px;
    text-transform: uppercase;
    color: var(--color-secondary);
    font-family: 'Molle', cursive;
  }
  .header__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: inherit;
  }
  .header__btn--left {
    left: 10px;
  }
  .header__btn--right {
    right: 10px;
  }
`
