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
  const [editedMoveID, setEditedMoveID] = useState(null)

  // function handleSubmit(updatedLevels) {
  //   setEditedMoveID(null)
  //   console.log(updatedLevels)
  //   updateLevels(updatedLevels)
  // }

  return (
    <>
      {editedMoveID && (
        <Form
          levels={levels}
          id={editedMoveID}
          updateLevels={updateLevels}
          setEditedMoveID={setEditedMoveID}
        />
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
                <li key={move._id}>
                  {move.name}
                  <IconButton
                    color={'secondary'}
                    size={'xs'}
                    onClick={() => setEditedMoveID(move._id)}
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
