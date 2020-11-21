import styled from 'styled-components/macro'
import HeaderButton from './HeaderButton'
import PropTypes from 'prop-types'

Header.propTypes = {
  appState: PropTypes.string.isRequired,
  stopSession: PropTypes.func,
  toggleSettings: PropTypes.func,
  deleleSelectedMoves: PropTypes.func,
}

export default function Header({
  appState,
  stopSession,
  toggleSettings,
  deleleSelectedMoves,
}) {
  let title = 'Rueda De Casino'
  if (appState === 'sessionPlay') title = 'Bailamos!!!'
  if (appState === 'sessionPause') title = 'Pause'
  if (appState === 'settings') title = 'Settings'
  if (appState === 'settings') title = 'Settings'

  const handleClick =
    appState === 'home' || appState === 'settings'
      ? toggleSettings
      : stopSession

  const hasButton = appState !== 'sessionPlay'
  const isSettings = appState === 'settings'

  return (
    <HeaderStyled>
      {isSettings && (
        <HeaderButton
          onClick={deleleSelectedMoves}
          isResetButton={true}
          appState={appState}
        />
      )}
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
