import PropTypes from 'prop-types'
import { ReactComponent as SettingsIcon } from '../assets/img/settings.svg'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import Layout from '../components/UI/Layout'
import Header from '../components/Header'
import MoveList from '../components/MoveList'
import Button from '../components/Button'
import Message from '../components/Message'

Home.propTypes = {
  selectedMoves: PropTypes.array.isRequired,
  isFirstAppStart: PropTypes.bool.isRequired,
}

export default function Home({
  history,
  selectedMoves,
  isFirstAppStart,
  setIsFirstAppStart,
}) {
  const hasNotEnoughMoves = selectedMoves.length < 2

  function handleOpenSettings() {
    history.push('/settings')
    setIsFirstAppStart(false)
  }

  return (
    <Layout>
      <Header>
        <div />
        <h1 className="logo">Salsa time!</h1>
        <Button data-testid="btn-settings" onClick={handleOpenSettings} isSmall>
          <SettingsIcon />
        </Button>
      </Header>
      <main>
        {hasNotEnoughMoves ? (
          <Message isFirstAppStart={isFirstAppStart} />
        ) : (
          <MoveList moves={selectedMoves} />
        )}
      </main>
      <footer>
        <Button
          onClick={() => history.push('/session')}
          isDisabled={hasNotEnoughMoves}
        >
          <PlayIcon />
        </Button>
      </footer>
    </Layout>
  )
}
