import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import AppHeader from '../app/AppHeader'
import IconButton from '../app/Buttons/IconButton'
import { EditIcon, BackIcon, AddIcon } from '../app/Icons/Icons'
import Form from './Form/Form'

Update.propTypes = {
  history: PropTypes.object.isRequired,
  levels: PropTypes.array.isRequired,
  updateLevels: PropTypes.func.isRequired,
}

export default function Update({ history, levels, updateLevels }) {
  const [editMove, setEditMove] = useState(null)

  function handleSubmit(updatedLevels) {
    setEditMove(null)
    console.log(updatedLevels)
    updateLevels(updatedLevels)
  }

  return (
    <>
      {editMove && (
        <Form levels={levels} id={editMove} handleSubmit={handleSubmit} />
      )}
      <AppHeader cols="110">
        <IconButton
          color={'tertiary'}
          size={'md'}
          onClick={() => history.push('/')}
        >
          <BackIcon />
        </IconButton>
        <h1>Moves Update</h1>
      </AppHeader>

      <UpdateStyled>
        {levels.map((level) => {
          return (
            <ul key={level.id}>
              <li>{level.name.toUpperCase()}</li>
              {level.moves.map((move) => (
                <li key={move.id}>
                  {move.name}
                  <IconButton
                    color={'secondary'}
                    size={'xs'}
                    onClick={() => setEditMove(move.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </li>
              ))}
            </ul>
          )
        })}
        <IconButton
          className="add-button"
          color={'tertiary'}
          size={'lg'}
          onClick={() => {}}
        >
          <AddIcon />
        </IconButton>
      </UpdateStyled>
    </>
  )
}

const UpdateStyled = styled.main`
  width: 100%;
  position: relative;
  padding: 10px;
  padding-bottom: 50px;
  display: flex;

  ul {
    width: 80%;
    max-width: 264px;
    margin: auto;
    display: flex;
    margin-bottom: 40px;
    flex-direction: column;
    gap: 10px;

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
    position: fixed;
    bottom: 15px;
    right: 15px;
  }
`
