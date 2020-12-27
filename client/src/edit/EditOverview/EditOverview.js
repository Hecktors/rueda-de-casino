import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AppHeader from '../../app/components/AppHeader'
import {
  AddIconButton,
  BackIconButton,
  EditIconButton,
  UserIconButton,
} from '../../app/components/buttons/IconButtons'

EditOverview.propTypes = {
  history: PropTypes.object.isRequired,
  pensum: PropTypes.array.isRequired,
}

export default function EditOverview({ history, pensum }) {
  return (
    <>
      <AppHeader cols="111">
        <BackIconButton size={'sm'} onClick={() => history.push('/home')} />
        <h1>Moves</h1>
        <UserIconButton
          size={'md'}
          onClick={() => history.push('/user-settings')}
        />
      </AppHeader>

      <UpdateStyled>
        {pensum.map((level) => {
          return (
            <ul key={level.id}>
              <li>{level.levelName.toUpperCase()}</li>
              {level.moves.map((move) => (
                <li key={move._id}>
                  {move.name}
                  <EditIconButton
                    size={'xs'}
                    onClick={() => history.push(`/edit-form/${move._id}`)}
                  />
                </li>
              ))}
            </ul>
          )
        })}
        <AddIconButton
          className="add-button"
          size={'lg'}
          onClick={() => history.push('/edit-form')}
        />
      </UpdateStyled>
    </>
  )
}

const UpdateStyled = styled.main`
  width: 100%;
  padding: 10px;
  padding-bottom: 50px;

  ul {
    width: 80%;
    max-width: 264px;
    margin: auto;
    display: flex;
    margin-bottom: 50px;
    flex-direction: column;
    gap: 7px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    li:first-child {
      color: var(--color-primary);
    }
  }

  .add-button {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
`
